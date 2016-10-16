---
layout: post
title: Let's ship Objects
category: Computer Science
tags: [oop, ownership, message-passing, prototype-based, class-based, inheritance, delegation, composition, language-design]
---

This post is just a suggestion for language designers of Object-oriented systems. Nothing really new except my new approach to see objects, though. Sorry, Alan Kay, but the main concept of OOP doesn't lie with **Message-Passing**, but mostly with all the sort of **Relationships** among objects. These relations are already well-known: *Inheritance*, *Delegation*, *Composition*, *Ownership*, *Cloning*, *Message-Passing* (yes, it also counts) and so on.

Objects assume *relative roles* in these relations:
* In Inheritance, there is a parent object and a child one.
* In Ownership, there is an owner object and an owned one.
* In Delegation, there is a delegator object and a delegatee one.
* In Message-Passing, there is the sender object and the receiver one.
* In Composition, there is the entire object and the fragment one.
* In Cloning, there is the prototype object and the clone one.

The most important thing is that we can generalize these roles into visibility scopes (which are commonly enumerated as `public`, `private` and `protected`). Relationship roles generalized as visibility scopes are more flexible and extensible than the today's visibility scopes known in the Java/C++ world. Also, 'cause these roles are relative, they can be overloaded (but not overridden with some kind of super-sends that will break encapsulation) through subjective/contextual mechanisms.

For example, suppose that we want to restrict state mutation only to owner object, then we just define setters visible only for the current owner object. In this way, fine-grained control over *what to expose for who* is easily achieved without the need to invert control with dependency injection just to workaround encapsulation leaking.

By the way, I'm still thinking in a proof of concept implemented in a highly reflexible language such Lua, Self or Smalltalk. This is due my laziness to implement a language with my own suggestion (I lack the compiling background enough for that, too). When I achieve something worth to show, I'll update this site with the links for the code (using Gist if the code is not too long).

Have you enjoyed this post? Want to write something about that suggestion, too? Please, make a reference for this blog entry into your article's footnote (of course, if you can). Thanks, anyway.
