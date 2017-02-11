---
layout: post
title: Introduction to Capability Concepts
category: "Computer Science"
tags: [ oop,
        capability-model,
        ocs,
        security,
        message-passing,
        access-matrix,
        acl-model ]
foot-icons: true
author: marcoonroad
refs: [ capability-myths-demolished,
        protection,
        protection-in-proglangs,
        robust-composition ]
links: [ objects-as-secure-capabilities,
         what-is-a-capability-anyway,
         where-capabilities-come-from,
         comparing-acls-and-capabilities, 
         the-confused-deputy,
         confused-deputy-resolved ]
draft: true
sitemap: false
---

The Capability systems and models variations date since middle half 60's. Despite being classical, this model still needs to conquer widespread use today,
due its straightforward reasoning properties and trusted communication patterns (even among mutually suspicious sources). For those who don't know that model,
this post suits well as a complete introduction and essay (in some sense) about Capabilities, related terms/concepts and design issues. So, let's
explore this Capability world together!

<div class="important-note"> <span>

I'm not very well explaining concepts, with this computational & security model is not different.
Also, the Capability Model is too much underground, introductory materials in the web are not rare, they're <i>myths</i>. Please, be
careful, because you may be cursed with the <i>Capability Curse</i> in the same way of the <i>Monad Curse</i>: once you understand that thing,
you are unable to explain it to anyone else. Let's pray for a Capability future where weird comparisons such as elephants, burritos
or even endofunctors don't exist.

</span> </div>

Before we dive in such model, we must know how systems are built around security concerns. The main security concern of many systems
is all about _who_ will/can access _what_ and _how_. An important tool to reason about said concern is known as _Access Matrix_.

<a name="access-matrix"> </a>

### Access Matrix

The Access Matrix is a table where columns are resources (i.e, _what_) and rows are subjects (i.e, _who_ -- in the classical literature they are
called as domains). Every entry in this table
denotes a resource privilege (i.e _how_) associated with given subject. The privileges enforce how a resource is manipulated by the subject. Also,
subjects can't use no more privileges than the described in their associated set of privileges. Below, an illustration of such Access
Matrix with the most basic privileges (`read` and `write`):

![Lampson's Access Matrix]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/access-matrix.jpg)

When we are going to implement such security tool as a mechanism, there is an important question that arises: _where_ we'll implement these
privileges? It seems that there are only two options: either in the resource itself or in the subject part. But, whatever option is taken, it
has a profound impact on the initial model and result system. So, these impacts are derived from interpretations of said Access Matrix -- the
interpretation itself is the solution for the previously asked question. One interpretation is known as **ACL model** while the other
(that we'll focus from now on) is known as **Capability model**. The possible interpretations follow:

![ACL model/interpretation]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/acl-interpretation.jpg)

![Capability model/interpretation]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/capability-interpretation.jpg)

The ACL model is well known and widespread among many Operating Systems and Programming Languages, surely you may already know it (although
possibly never through this name). The Capability model, on the other hand, is a rather unknown model where everything is a Capability
(that is, everything is a resource attached with privileges). While the ACL model works mostly through Authentication, Capabilities work by
Authorization (i.e, sharing/delegation of resources to other subjects).

It's also important to remind: Capability models have a _subjects-as-processes_ interpretation instead of the _subjects-as-users_ interpretation known
in the ACL model. Due this reason, you can easily conclude that ACL models provide coarse-grained access control while Capabilities
themselves are fine-grained access control mechanisms. These subjects interpretations are <u>requirements</u> for both models, once we have leaved these
requirements, we're out of the respective security model.

We'll defer the analysis of many choice impacts along this post, but the trivial impact/implication is that:
* The ACL model is very static, orthogonal-to-the-system and nominal in its nature, while;
* The Capability model is rather dynamic, unified-into-the-system and structural in its own right

![ACL Access Graph]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/acl-access-graph.jpg)

![Capability Access Graph]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/capability-access-graph.jpg)

By "Orthogonal access graph" and "Unified access graph", we mean how naturally seem these pointers. In the Capability Model, the
Access Graph is unified with the Reference Graph, thus, an external security mechanism/feature to control the access isn't necessary.
On the other side, the ACL Model requires beforehand a global identification together with some administrator of these accounts (is the duty of
the administrator to amplify, grant or revoke rights -- these administration rights are known as a `control`/`owner` privilege). Therefore,
dynamic/ephemeral subjects aren't feasible in the ACL Model anyways due the explicit labeled authentication of subject names/identifiers.

Speaking of nominal things, there is a feature in which we want to avoid in all the cost. This (anti-)feature is called _Ambient Authority_.

<a name="ambient-authority"> </a>

### Ambient Authority

A system contains Ambient Authority when some subject just use an (almost) unique & freely available name to access anything. This occurs
frequently in ACL-based security, for instance, when we open a file. It also occurs on global/public APIs taking too much responsibilities &
privileges, e.g, Reflection APIs.
The classical `open` function is also an example of undesirable public API, because it gives you the power to open any file in the
filesystem through the `..` notation (which change the current directory to one above) -- but only if you have the proper rights (and it's
possible for a malicious user to acquire the same rights of someone else through authentication). If you want to know why the `..` notation, the
absolute directory lookup or even the `$HOME` lookup are really bad, just google
[PHP Remote File Inclusion](http://google.com/?q=php+remote+file+inclusion) to take a glimpse of the incoming answer. These notations are just
good examples of Ambient Authority.

Ambient Authority arises due the separation of _designation_ from _authority_. This separation is the rule of thumb in ACL-based systems, where
you can acquire an implicit authority over a reference without the known permission to use it.
It's important to remember that authority doesn't mean permission: authority is a "generalization" of permission in some way.
Where permission stands for the **direct** means to acquire rights over a resource, authority also includes the
**potential effects** for "abuse" of **indirect** means to acquire that same rights. That is, permission deals directly with the _identity_ of the
sender/owner subject, where authority will also pay attention on the indirect means to bypass security through message-passing. In the message-passing
layer, if you don't trust someone else, you will often deliver revocable references/proxies to this guy.

Although "Capability-based" implies "Non-Ambient Authority", it's worth to note that "Non-Ambient Authority" doesn't imply "Capability-based".
Ambient Authority must be eliminated from the system 'cause it is prone to two major problems:
* The [_Confused Deputy Problem_](#confused-deputy) (the PHP Remote File Inclusion is also an instance of this problem)
* The break of the _Principle of Least Privilege_

<a name="least-privilege-principle"> </a>

### Principle of Least Privilege

This principle states that subjects must only use the minimum, needed and _legitimate_ resources to complete an ongoing task. This principle also
reduces the probability of misuse of resources. To achieve that principle, we must ban Ambient Authority (which provides implicitly passed
resources) in favor of explicit communication/message-passing. When this principle is not achieved (i.e, broken), it's a matter of faith to rely
on a bunch of passed privileges being enough and properly used by the subject.

<a name="confused-deputy-problem"> </a>

### Confused Deputy Problem

Also known as _Luring Attack_, the _Confused Deputy Problem_ stands for the fooling of a deputy (here, a subject carrying some possibly sensible
capabilities) by an attacker. In simpler words, the attacker guides the deputy into the misuse of its own capabilities. "Misuse" here means the
use in such way that violates the expected purpose / original intent, and, therefore, allowing something which shouldn't. This problem is
due the trust relation being abused: the Capability model can't eliminate this problem, but instead reduces given occurrences while the
ACL model is very prone to this problem.

<a name="synergy"> </a>

### Synergy

Synergy is an implicit pattern that often occurs in Object-Capability Systems. This pattern is very important on such systems, because it states
that the composition of 2 introduced capabilities results into a new one. There are many forms appearing in Capability-based systems in which this
pattern manifests itself, such as:
* [Rights amplification](#rights-amplification)
* [Sibling communication](#sibiling-communication)
* [Sealing/branding pairs](#sealing-pairs)
* Identity/equality comparison
* And even in the introduction of capabilities (a.k.a, delegation of capabilities)

Informally (I mean, not a standard / official / literature-based classification), I will give 3 kinds of synergy classified as below:
* _Mutual Synergy_, some capability introduces itself to another capability and also is introduced for this other one
* _Paired Synergy_, the introduction of 2 capabilities results into a new held capability for the subject
* _Mutually-Paired Synergy_, the subject introduces both capabilities to themselves and acquire the result capability

The image below may help you to understand that:

![Kinds of Synergy]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/kinds-of-synergy.jpg)

<div class="important-note"> <span>
Although synergy is classified as a composition of capabilities, not always capabilities are generated as a result of these dynamic interactions.
When such capability is not a result of that composition, there's a loophole in the synergy which can be used to bypass the Capability model.
Frequently, interactions increase the general authority among parties, if this resulting authority is not represented as a resulting capability,
it turns out itself into an anonymous side-effect represented by an invisible capability. <p/>

However, these notes doesn't hold for the delegation of capabilities 'cause this is the core idea of the Capability model -- you want such kind
of side-effect to control explicitly which resources can be accessed and which can't. <u>In the end, you'are acting like an Access Matrix for
all of your known fellows and comrades.</u>
</span> </div>

An good example of synergy can be a file handler: when we have both readable and writable views of a handler, it's possible to
acquire a third view of that handler (one performing `append`). A simple ("Sure?") & expressive ("Enough!") code in an unexpected & unsafe language
follows (the code below is assumed to be slow, but a buffered implementation will speed up the often usage):

```java
package marcoonroad.capability.synergy.filehandler;

interface ReadableStream {
        public String read ( );
}
```

```java
package marcoonroad.capability.synergy.filehandler;

public interface WritableStream {
        public void write (String content);
}
```

```java
package marcoonroad.capability.synergy.filehandler;

public interface AppendableStream {
        public void append (String content);
}
```

```java
package marcoonroad.capability.synergy.example.filehandler;

public final class SinergyStream
implements ReadableStream, WritableStream, AppendableStream {
        private final ReadableStream readable;
        private final WritableStream writable;

        public SinergyStream (ReadableStream readable,
                              WritableStream writable) {
                this.readable = readable;
                this.writable = writable;
        }

        // IDE won't complain
        @Override
        public String read ( ) {
                return readable.read ( );
        }

        // IDE won't complain
        @Override
        public void write (String content) {
                writable.write (content);
        }

        // IDE won't complain
        @Override
        public void append (String content) {
                String previous = this.read ( );

                this.write (previous + content);
        }
}
```

<p/>

<div class="important-note"> <span>

Unfortunately, I must state the obvious to not be processed by the <del>evil</del> corporations. So Java is a trademark
and also a proprietary software of the Oracle corporation. Don't use this programming language unless you <i>really</i> must use that to survive
(except if you love corporatist/private-side taxes, processes, bureaucracy and rents - it's voluntary, anyways).
Thanks and sorry about that.

</span> </div>


Notice that `ReadableStream` and `WritableStream` capabilities _imply also_ `AppendableStream`, but not the other way around.
It means that synergy is not a symmetrical/reversible arrow (except -- in some sense -- if facets are living around), although
commutative on co-domain & domain, and also transitive. In formal notation, synergy is a mapping from the Cartesian product of
2 capabilities into a triple preserving the initial capabilities plus a third one, e.g:


```ocaml
(* structural interface refinement/restriction *)
module type ICapability = sig
        type capability (* capability is abstract *)
end

module type ISynergy (Capability : ICapability) = sig
        type capability = Capability.capability

        (* internal structural type aliases *)
        type 'value pair   = 'value * 'value
        type 'value triple = 'value * 'value * 'value

        val synergy : capability pair -> capability triple
end
```

Synergy here is described working on 2 capabilities, but it's straightforward to generalize that into more provided capabilities,
mostly because synergy is a _composable property_. Other examples of synergy are the file `copy` and `remove` operations: together
they yield the file `move` operation. We have already seen how to compose small building blocks, now let's see how to make these
small building blocks with _facets_.

<a name="facets"> </a>

### Facets

Facets are a kind of first-class (Re-)Decorators, which provide a subset of decorated capability's interface (may it be an Adaptor which
reduces the exposed interface to the minimum and needed?). This mechanism
fulfills some part of the [Least Privilege Principle](#principle-of-least-privilege) (the non [Ambient Authority](#ambient-authority)
fulfills the rest), and, thus, reduces the occurrences of the [Confused Deputy Problem](#confused-deputy-problem). Facets can
also act like Proxies and, almost any Object Oriented Programming Language support this kind of pattern, either explicitly or implicitly,
through object wrappers.

![Capability Facets]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/capability-facets.jpg)

In the image above, facets are like "restricted views" of some capability. Facets can also "wrap" other facets, it's is due the fact
that facets (i.e, decorators/proxies) and capabilities (i.e, objects) are seamlessly indistinguishable. For this reason, identity
comparison is considered bad due, for example, two distinct facets sharing the same decorated object, so:

* in one hand, they're different because the interface differs,
* on the other hand, they point to the same internals...

How can us compare these facets properly? Statically typed languages only allow comparison on values of the same type/interface, but
it doesn't work when we have _dynamic interfaces_ (what facets are actually). The solution simply is to ban "external" identity (that
is, capability comparison/discrimination on the programmer-side) while we still retain "internal" identity for the GC, Auditing,
Capability Revocation, etc. Comparison on primitives such numbers and strings are needed in some way, so the ban here doesn't count.

<a name="rights-amplification"> </a>

### Rights Amplification

![Rights Amplification]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/rights-amplification.jpg)

Rights amplification occurs when we provide additional authority over some system resource through a new capability. The image above captures
pretty well that idea.

<a name="sibling-communication"> </a>

### Sibling Communication

This name may sound like a kind of message-passing protocol, but it's just an alias for closures in the Object Capability Model. By closures,
I mean the most accurate thing to the used definition: 2 parties sharing the same behavior set. If this behavior (set of methods, on most cases)
results from the evaluation of another behavior set (that is, they are closures), it means that they share the internal state of this super-behavior.
Thus, the "siblings" are aware of performed changes on one of these "secretly shared" states. This, therefore, is a form of secure communication (if
no loopholes are freely accessible, such as the reflection for debuggers inspecting the call stack), and also a kind of "lexical" Synergy. Siblings are
often used to build other forms of Synergy, though.

<a name="sealing-pairs"> </a>

### Sealing Pairs

Also known as _seals_ (and introduced in the classical paper _Protection in Programming Languages_), sealing pairs are a pair of functions
[ `seal`, `unseal` ] which act like as the encryption & decryption algorithms of some given message, respectively. In the programming
language context, there's no such encryption mechanism, an encrypted message is just an unique object with an _empty interface_. 'Cause this
unique object provides an unique identity, we can use internal hash comparison, together with Sibling Communication (i.e, closures) to
implement sealing pairs, and, therefore, achieve [Rights Amplification](#rights-amplification) with that.

Note that, however, identity is not a requirement to build sealing pairs: the programming language Noether itself uses unique alpha-renames on the
'Static Names' mechanism to provide safe compile-time encapsulation of resources.

![Sealing Pairs]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/sealing-pairs.jpg)

```js
function sealing (label) {
        let map    = new WeakMap ( );
        let result = { };

        result.seal = function (object) {
                let sealed = { };

                sealed.toString = function ( ) {
                        return "<sealed by " + label.toString ( ) + ">";
                };

                map[ sealed ] = object;

                Object.freeze (sealed);

                return sealed;
        }

        result.unseal = function (sealed) {
                var object = map[ sealed ];

                if (object === undefined || object === null) {
                        throw "Invalid sealed reference!";
                }
                else {
                        return object;
                }
        }

        return result;
}
```

I must also give you some advice, though. <u>Don't abuse of the Rights Amplification concept unless you want to be prone to Luring Attacks</u> (do
you remind the said loopholes in synergy?), right?

<a name="notes-on-implementations"> </a>

### Notes on implementations

Implementations of the Object Capability Model in the PLT (Programming Language Theory) field frequently are either pure new programming languages or
subsets of already existent ones. The subset design provides a "tamed" API together with a "Powerbox". The tamed API stands for the "Capability-safe"
set of functions, classes, etc. that can be exposed globally without further problems (that is, they describes resources of the programming language itself
rather than Operating System resources, for example: vectors, lists, sets, bags and maps data types). Resources who must be encoded as Capabilities are
passed explicitly through message-passing (e.g, an object dealing with the sensible business logic, such as passwords, telephones, emails, and so on). On
the other side, the Powerbox means a description of prone-to-be-accessed Operating System's resources, this description list itself acts like a white-list
approach for sandboxing.

In the Capability model, rather than providing a complete set of security mechanisms, we provide minimal abstractions to build high-level security abstractions
(that is, enforcing policies on top of these "primitive" ones). This idea works in the same way of layered abstraction of modules. The great profit and
benefits of that security approach is the possibility of decouple and compose abstractions in diverse ways as they were LEGO's building blocks.

In his PhD thesis _Robust Composition_, Mark S. Miller discuss about loader isolation (i.e, environment-based `eval`). It turns out that every language
providing these kind of loader functions, can also provide a modular Capability integration of code (only if _magic names_ aren't resolved implicitly
such as namespace/package-level identifiers). Some languages fit these requirements, for example the Scheme and Lua programming languages. Otherwise, the
'Meta-Circular Interpreter' "pattern" known in the Lisp's world can be used to "reveal" the internals of a Programming Language and, thus, tweak a
runtime resolution of unbound names (although this pattern is very hard -- if not impossible -- on languages without "unified" syntax in the same sense
of Lisp/Forth syntax -- a.k.a, a syntax without keywords). Compile-time type systems and bytecode monitoring can also be used to enforce minimal and safe
Capability policies, anyways, but the control over such accesses is in the hands of the implementation rather than user's hands.

<a name="final-remarks"> </a>

### Final remarks

The Capability Model is a great model that deserves some attention. It can be an useful feature in Operating Systems and Programming Languages.
System Designers should be aware of that, in the end, the gains overcome the costs of this security model. I hope, at least, that you have
enjoyed this post (despite my worse English vocabulary), and, if possible, thought with care about the whole thing. Who knows, you may also
wish to implement a Capability System, either as a Programming Language subset framework or, even a new Programming Language with the needed
support from scratch?
