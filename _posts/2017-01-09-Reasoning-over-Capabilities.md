---
layout: post
title: Reasoning over Capabilities
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
        protection-in-proglangs ]
links: [ objects-as-secure-capabilities,
         what-is-a-capability-anyway,
         where-capabilities-come-from,
         comparing-acls-and-capabilities, 
         the-confused-deputy,
         confused-deputy-resolved ]
draft: true
---

TODO

<a name="reasoning-properties"> </a>
### Reasoning Properties

Being a delimited & composable model turns the programming activity restricted yet expressive. It turns out that we can easily
reason about our developed system, and even trivially enforce runtime policies or static restrictions. We, then, present a simple
reasoning framework that classifies the relative subject's trustworthiness and absolute capability's sensibility. With it, a
running system can emit warnings when a sensible capability is introduced to an untrusted subject, or even abort the running program
when running under a very strict mode.

Our reasoning is all about these three questions:
* How many capabilities, from the set of externally known capabilities, have the subject acquired?
* How many sub-capabilities, from the set of created sub-capabilities, have the capability delegated?
* How many slots/properties, from the set of implemented slots/properties, are the capability exposing under its facet?

We use the first question to reason about trustworthiness while the second, to reason about sensibility. Note that the second
question states "created sub-capabilities", which are held by the respective owner capability (who have the power to revoke how
many delegated capabilities it wishes). The third question is an additional reasoning about the _encapsulation_. The following
answers describe the respective classifications:

---

* How many capabilities, from the set of externally known capabilities, have the subject acquired?
  + Few, so the subject is more trusted
  + Much, so the subject become untrusted and, who knows, malicious
* How many sub-capabilities, from the set of created sub-capabilities, have the capability delegated?
  + Much, so the capability is not sensible anyways
  + Few, so the capability turns into a sensible one by carrying secret data
* How many slots/properties, from the set of implemented slots/properties, are the capability exposing under its facet?
  + Few, so the capability is properly encapsulated
  + Much, so possibly there's an encapsulation loophole

---

If you are fast & smart enough, you may notice that, while the system is booting/creating a capability of sub-capabilities,
this capability might be sensible (because none communication was performed between this capability in such it might delegate
its own sub-capabilities -- just to leave the sensible classification). Nevertheless, to be safely introduced to untrusted
subjects, this capability must be "socially" known rather than a timid capability with few interactions. This, so, can be read
as a _Sensibility Axiom_. Then, to be "socially" known, a capability must expose safely its own internals in trusted communications.

You may also notice that a subject may born trusted and along the lifetime become untrusted. This is reasonable, to acquire the
trustworthiness again, it must release some considerable portion of its previously acquired capabilities. Let's read that as
a _Trustworthiness Axiom_. You may even wonder,
"And if the subject beforehand creates internal clones of the previously acquired capabilities, it's insecure, right?",
but a proper system also tracks the cloning operation; even owning these clones, they will still count as introduced capabilities.

Another interest fact is that a recently created capability exposes all the slots/properties in its own interface. It's fine anyways,
"facet-less" capabilities living in the scope of owner subject (which have created this capability) don't count as loopholes. The
system will only classify the encapsulation level on introduced/delegated capabilities. Therefore, this can be known as an
_Encapsulation Axiom_.

We reason such policies mainly over how can Capability Delegation be classified. Taking the concept of "Boundaries" from Ownership Systems,
we adapt that concept as Possession Boundaries. Every Capability implies a Possession Boundary where there are no constraints/mechanisms
such as the well-known ones in the Ownership Model (e.g, Crossing Handlers, Ownership Transference, Filters, etc.). This kind of boundary
will help us to reason over the held capabilities and how they are introduced/delegated (just a side note, this Capability Delegation
classification also isn't official).

![Send-side Delegation]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/send-side-delegation.jpg)

![Reply-side Delegation]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/reply-side-delegation.jpg)

Have classified such thing, we can move forward our analysis... TODO

<a name="implementation"></a>
### Implementation

Almost any dynamic programming language with support to "environment-driven `eval`" (that is, dynamic code evaluation taking an explicit
environment) can provide some kind of Capability System. The dynamic code evaluation procedure can be parametrized on the passed
environment and, thus, Functors à la ML arise freely. The other requirement is to not provide a pervasive API (such as Reflection)
attached/embedded on the object's exposed interface. Reflection must be also turned into Capabilities, and only Mirrors are the toy
around allowing that.

We have implemented a proof-of-concept in the Lua Programming Language. While the provided abstractions are simple enough, the Capability
System performs Runtime Flow Analysis & Monitoring over all the internal communications (mostly because distributed Capability-based communication
was not implemented yet), just to emit warnings on suspicious subjects or to provide Auditing on possibly attacker's visit. The Analysis and Monitoring are
based on the previously explained [Reasoning Properties](#reasoning-properties), and, so, are enforced as approximations of real-case scenes.
If you are interested, the proof-of-concept can be found [here](http://github.com/marcoonroad/lua-capability). Note that this additional layer
of security is <u>orthogonal</u> to the Capability System: on very rare attacking scenarios, this additional layer will be helpful.

Being a Programming Language subset instead of an Operating System, the proof-of-concept must provide a safe interaction with the Operating
System's resources. This interaction, so, is evaluated through an implicit conversion boundary: everything flowing from the OS environment into
the language environment is converted from an ACL view into a Capability view. On the other side, all the resources flowing from the language
environment
into the OS environment are converted from the Capability view into an ACL one. This "pattern" is not new, in fact this is simply a "Sandbox" mechanism
(Sandboxes themselves are mechanisms to control the Authority flowing around into the ambient, but sometimes breaking the Least Privilege Principle
due the often ACL model requirement of global subject identification).

![Lua-Capability Conversion Boundary]({{ site.baseurl }}/images/Introduction-to-Capability-Concepts/lua-capability-conversion-boundary.jpg)

<a name="conclusion"> </a>
### Conclusion

TODO
