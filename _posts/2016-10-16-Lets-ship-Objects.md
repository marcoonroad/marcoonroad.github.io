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

By the way, I'm still thinking in a proof of concept implemented in a highly reflexible language such as Lua, Self or
Smalltalk. This is due my laziness to implement a language with my own suggestion (I lack the compiling background
enough for that, too). When I achieve something worth to show, I'll update this site with the proper links for the code
(using Gist if the code is not too long).

Have you enjoyed this post? Want to write something about that suggestion, too? Please, make a reference for this blog
entry into your article's footnote (of course, if you can). Thanks, anyway.
