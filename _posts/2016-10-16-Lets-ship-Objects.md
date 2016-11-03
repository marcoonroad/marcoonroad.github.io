---
layout: post
title: Let's ship Objects
category: Computer Science
tags: [oop, ownership, message-passing, prototype-based, class-based, inheritance, delegation, composition, language-design]
---

This post is just a suggestion for language designers of Object-oriented systems. Nothing really new except my new
approach to see objects. Sorry, Alan Kay, but the main concept of OOP doesn't lie with **Message-Passing**, but mostly
with all the sort of **Relationships** among objects. These relations are already well-known: *Inheritance*,
*Delegation*, *Composition*, *Ownership*, *Cloning*, *Message-Passing* (yes, it also counts) and so on.

### Discussion

Objects assume _relative roles_ in these relations:
<ul>
<li> In Inheritance, there is a parent object and there is a child one. </li>
<li> In Ownership, there is an owner object and there is an owned one. </li>
<li> In Delegation, there is a delegator object and there is a delegatee one. </li>
<li> In Message-Passing, there is the sender object and there is the receiver one. </li>
<li> In Composition, there is the entire object and there is the fragment one. </li>
<li> In Cloning, there is the prototype object and there is the clone one. </li>
</ul>

The most important thing to realize is that we can generalize these roles into visibility scopes (which are commonly
enumerated as `public`, `private` and `protected`). Relationship roles generalized as visibility scopes are more flexible
and extensible than the today's visibility scopes known in the Java/C++ world. Also, 'cause these roles are relative,
they can be overloaded (but not overridden with some kind of super-sends that will break encapsulation) through
subjective/contextual mechanisms.

For example, suppose that we want to restrict state mutation only to owner object, then we just define setters visible
only for the current owner object. In this way, fine-grained control over *what to expose for who* is easily achieved
without the need to invert control with dependency injection just to workaround encapsulation leaking.

Of course, some design restrictions are needed, for instance, any object can't own itself. We can implement the
classical `public`, `protected` and `private` visibilities with these roles, too.
<ul>
<li> Private slots are slots only accessed through self-sends, that is, when the sender object and the receiver one are
the same (or, better, when an object sends a message to itself). Notice also that <b>self</b> may be aliased to other
variables, but that fact musn't break the system reasoning. If the self-alias escapes its self's scope, it is turned
into a common object reference. </li>
<li> The protected visibility may be thought as the parent/delegatee giving access of some slots to its
children/delegators. </li>
<li> Public visibility is the most simple, it just don't impose any contraints for who is sending a message to an
object. </li>
</ul>

~~By the way, I'm still thinking in a proof of concept implemented in a highly reflexible language such as Lua, Self or
Smalltalk. This is due my laziness to implement a language with my own suggestion (I lack the compiling background
enough for that, too). When I achieve something worth to show, I'll update this site with the proper links for the code
(using Gist if the code is not too long).~~

### Implementation

In our proof-of-concept, we've considered only Message-Passing, Static Inheritance and Static Ownership for a matter
of simplicity. So, our relative scopes are:
<ul>
<li> <b>self</b>, when sender = receiver </li>
<li> <b>child</b>, when parent(sender) = receiver </li>
<li> <b>parent</b>, when sender = parent(receiver) </li>
<li> <b>owned</b>, when owner(sender) = receiver </li>
<li> <b>owner</b>, when sender = owner(receiver) </li>
<li> <b>default</b>, the default scope </li>
</ul>

Notice that we haven't the analogue of the `protected` scope (that is, roughly, the symmetric sum of `self` with
`child`[¹](#protected-analogue)<a name="protected-analogue-back"></a>).
We can achieve that with some mehanism to symmetrically compose scopes for access (in the same way of
traits) and synchronize them for mutation (as like mutual observers), but again, our goal is simplicity to explain
the concept. While access occurs on all of the implemented scopes, mutation can only occurs on the `self`, the
`owner` and the `default` scopes for a matter of encapsulation policies.

When some conflict arises (e.g, the sender is the receiver's parent and receiver's owner at the same time), the
precedence is for the Static Inheritance rather than Static Ownership (this is just a design choice, though).
In the inheritance relation, the child object only inherits the `child` scope and the `default` one. The figure
below contains the full scope rules for access (the scope rules for mutation are quite trivial):

![Scope Rules for Access](https://raw.githubusercontent.com/marcoonroad/marcoonroad.github.io/master/_posts/lets-ship-objects-scope-rules.jpg)

As you can see, Static Inheritance may overload some slots/properties of Static Ownership.
This image is a bit complex, this is why
we're only taking a few relative scopes into account. Well, now is the right time to show you guys some piece of
code.

<script src="https://gist.github.com/marcoonroad/a9791d5656482ecd85a78fdad0fe0210.js"></script>

Our code relies mostly in the `debug.getlocal` function. If you have read the entire Lua's manual, you can already
know that the `debug` API (almost unsafe) cannot deal with
[Tail-call Optimization](http://wiki.c2.com/?TailCallOptimization)
properly (this is not the fault
of the minds behind the Lua language, this is intrinsic to TCO per se). So, the programmer must pay attention in
her code against TCOs to avoid unexpected issues/side-effects while using this library. We're still thinking in
some better solution for that...

The examples below show a simple usage of this library:

<script src="https://gist.github.com/marcoonroad/25679174c7f5545a3622f1aead83edc4.js"></script>

### Conclusion

The concept of relative scopes are really interesting and similar to subjective/contextual programming in some sense.
Fine-grained visibility scopes per sender object's relative roles give an almost full control of the kinds of data
to expose for who, but are prone to an increasing complexity in the implementation. We'll also think in further new
relative roles of objects (who knows if we can achieve something else with an investigation about Design Patterns?).

There are still many relative scopes to implement by hand (based on our "specification"), a painful task together with
some careful design choices. Nevertheless,
[Subject-oriented Programming](https://en.wikipedia.org/wiki/Subject-oriented_programming)
can be the light in the end of tunnel, the only left
question is how to integrate that in a well-designed system with strong encapsulation policies. Of course, we must
generalize our concept.

Have you enjoyed this post? Want to write something about that suggestion, too? Please, make a reference for this blog
entry into your article's footnote (of course, if you can). Thanks, anyway.

### Notes

<a name="protected-analogue"></a> ¹ - Although our system publicly leaks the parent's child scope into child object due the system semantics. \[[Take me back](#protected-analogue-back)\]
