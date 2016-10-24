---
layout: post
title: First-Class Delegation Links
category: "Computer Science"
tags: [prototype-based, oop, delegation, lua]
---

Today we will show you guys an interesting concept that we have developed,
with the intent to provide a fine-grained implicit delegation mechanism. This
concept is bullet-proof against the _diamond problem_ (well-known in the
multiple-inheritance mechanism) and the _fragile base-class problem_
(well-known in the inheritance/delegation mechanism). Traits, talents and
mixins also provide the solution for the diamond problem, but are prone to the
fragile base-class problem besides their our issues, e.g, the problem of
_external method renaming_ (which does not also rename the self-sends without
the proper expensive code recompilation). We will call that concept as
**First-class Delegation Links** from now on, and so we argue why our concept
is safe against such problems.

_Concatenation-based prototypical inheritance_ is also safe against these
problems, but a new issue arises here: the issue of
_repetitive explicit sharing_. The programmer must ensure the copy of every
value that she wants to share into her target objects. Our framework is
designed with concatenation-based prototypical inheritance in mind, so we
also address this issue in the system. In our design, we choose to implement a
link as anything else that is _forwarded_ on given selector. With it, the
programmer can replace a bunch of behaviors just by replacing a value from a
certain receiver's slot. In that way, everything remains under control...

In the inheritance model, the child object itself has none control over
_what it inherits_ from the parent object, that is, the child object is the
passive one in the inheritance relation. We feel that it's an horrible
inversion of control, due the fact that the customer (a.k.a, child or receiver)
object has its behavior controlled mostly by the provider (a.k.a, parent or
prototype) object in the code-reuse requested service. The same holds for
delegation, delegator (i.e, child object) and delegatee (i.e, parent object).
We believe that this is the main reason
**why inheritance breaks encapsulation**, mostly because changes performed on
parent object propagate down to all of its children as a _terrible side-effect_
which can easily go out of control. We, then, invert this control back to the
"normal way", turning the child object into an active one which dictates for
itself what it wants to inherit/delegate. We have achieved these purposes
through First-Class Delegation Links...

Now, as you already know, the fragile base-class arises due the passive role of
a child object/class in the inheritance/delegation relation. Everything now may
seem so weird and confuse, right? No problem, you have all the time of the
world to understand that, but let us continue (you can now give a break for
yourself if you want or need, though).

Being first-class means that our links can be passed as arguments or returned
from invocations, besides being stored as values in some object's slots. Once
these links are set, they will trap every reading/indexing and they also will
resend the selector lookup on the linked named property/slot. The image below
can help you to grasp the whole point:

![Example](https://raw.githubusercontent.com/marcoonroad/marcoonroad.github.io/master/_posts/first-class-delegation-links-example.jpg)

Now that you are understanding, you can see that we can also replace these
links with another links (to some other parent stored in the receiver object)
or even with another common values, such as numbers, strings or methods. With
just one layer of indirection, we are able to easily change an object's
behavior set dynamically. We also can increase the level of indirection just
by put a link in the target slot of other link, going even further to achieve
the extension capability, but it seems a case rare to happen.

Now we will show you the proof-of-concept below:

<script src="https://gist.github.com/marcoonroad/e4704111b06e22fb1fb99d7f95845cc5.js"></script>

We are using the well-known _copy on write_ technique for code optimization
of the concatenative approach of object inheritance. As you can see, we also
use the _copy on read_ optimization, which was developed by the Self's
researchers (if my mind is still working). That code is a bit longer, so sorry
for that (maybe we will work later in this code). Notice that we have optimized
the delegation links to avoid useless recomputation by using memoization.

An example of code showing how to use the library follows:

<script src="https://gist.github.com/marcoonroad/ba884a4af0409d2ec04f03123b5681cb.js"></script>

### Conclusion

First-Class Delegation Links are an interesting alternative for sharing, not only
in the concatenative-based inheritance model, but also in the Object-oriented world
as a whole. We want to analyze further consequences of that approach, but by now it
may be sufficient.

### Further reading

These are some links that I suggest you to read if you are still having
interest in Prototype-based OOP or OOP in general:

* [The Gang Of Four Is Wrong And You Dont Understand Delegation](http://www.saturnflyer.com/blog/jim/2012/07/06/the-gang-of-four-is-wrong-and-you-dont-understand-delegation/)
* [Understanding Prototypes, Delegation & Composition](http://www.datchley.name/understanding-prototypes-delegation-composition)
* [Using Prototypical Objects to Implement Shared Behavior in Object Oriented Systems](http://web.media.mit.edu/~lieber/Lieberary/OOP/Delegation/Delegation.html)
* [Delegation Is Everything And Inheritance Does Not Exist](http://www.saturnflyer.com/blog/jim/2013/11/18/delegation-is-everything-and-inheritance-does-not-exist)
* [Understanding JavaScript OOP](http://robotlolita.me/2011/10/09/understanding-javascript-oop.html)
* [Prototype Based Programming Languages](http://bluishcoder.co.nz/2009/07/16/prototype-based-programming-languages.html)
* [Why Composition is Immune to Fragile Base Class Problem](https://medium.com/@_ericelliott/why-composition-is-immune-to-fragile-base-class-problem-8dfc6a5272aa#.p9w3pcvqt)
