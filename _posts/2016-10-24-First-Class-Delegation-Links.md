---
layout: post
title: First-Class Delegation Links
author: marcoonroad
category: "Computer Science"
tags: [ prototype-based,
        oop,
        delegation,
        lua,
        concatenation-based ]
refs: [ concatenation-based-js ]
links: [ you-dont-understand-delegation,
         understanding-prototypes-delegation-and-composition,
         using-prototypical-objects,
         delegation-is-everything,
         understanding-javascript-oop,
         prototype-based-languages,
         why-composition-is-immune,
         the-heart-and-soul-of-prototypal-oo ]
foot-icons: true
comments: true
analytics: true
updated: '2017-02-10'
---

Today we'll show you guys an interesting concept that we have developed,
with the sole intent to provide a _fine-grained implicit delegation mechanism_. This
concept is bullet-proof against the
[diamond problem](https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem)
and the [fragile base-class problem](https://en.wikipedia.org/wiki/Fragile_base_class).
[Traits](https://en.wikipedia.org/wiki/Trait_%28computer_programming%29), talents and
[mixins](https://en.wikipedia.org/wiki/Mixin) also provide the solution for the diamond
problem, but are prone to the fragile base-class
problem[¹](#prone-to-fragile-base-class)
<a name="prone-to-fragile-base-class-back"> </a> besides their own issues, e.g, the problem
of _external method renaming_[²](#external-method-renaming)
<a name="external-method-renaming-back"></a>. We will call that concept as
**First-Class Delegation Links** from now on, and so we
argue why our concept is safe against such problems.

_Concatenation-based prototypical inheritance_ is also safe against these
problems, but a new issue arises here: the issue of
_repetitive explicit sharing_. The programmer must ensure the copy of every
value that she wants to share into his target objects. In the words of Antero
Taivalsaari (extracted from his paper called
_Simplifying JavaScript with Concatenation-Based Prototype Inheritance_):

> Concatenation-based prototype inheritance has
> additional drawbacks that are related to the inability to modify
> large groups of objects at once. Since delegation-based systems
> implement parent-child relationships by physically sharing the
> properties inherited from parents, all the changes that are
> subsequently made to the parent objects will have an immediate
> impact on all the children as well. While in some rare cases this
> behavior can be undesirable, in most cases the ability to change
> the behavior of a large group of objects simply by modifying a
> common parent can be very convenient.

> In a concatenation-based system, in contrast, the addition or
> removal of a method or a variable will have an impact only on
> an individual object. If the programmer wants to add certain
> new properties (e.g., a few new methods) to an entire “class” of
> objects, the programmer will have to use a for loop or some
> other iterative construct to apply the same changes/differences
> to all the objects individually. This can be clumsy and
> inefficient. On the positive side, the benefit of this approach is
> that the same changes can be applied to any group of objects –
> not just those objects who happen to share a common parent.

Our framework is designed with concatenation-based prototypical inheritance in mind, so we
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
delegation, delegate (i.e, child object) and delegated (i.e, parent object).
We believe that this is the main reason
**why inheritance breaks encapsulation**, mostly because changes performed on
parent object propagate down to all of its children as a _terrible side-effect_
which can easily go out of control. We, then, invert this control back to the
"normal way", turning the child object into an active one which dictates for
itself what it wants to inherit/delegate. We have achieved these purposes
through First-Class Delegation Links...

Now, as you already know, the fragile base-class arises due the passive role of
a child object/class in the inheritance/delegation relation. Everything now may
seem so weird and confused, right? No problem, you have all the time of the
world to understand that, but let's continue (you can now give a break for
yourself if you want or need, though).

Being first-class means that our links can be passed as arguments or returned
from invocations, besides being stored as values in some object's slots. Once
these links are set, they will trap every reading/indexing and they also will
resend the selector lookup on the linked named property/slot. The image below
can help you to grasp the whole point:

![Example](/images/First-Class-Delegation-Links/example.jpg)

Now that you are understanding, you can see that we can also replace these
links with other links (to some other parent stored in the receiver object)
or even with common values, such as numbers, strings or methods. With
just one layer of indirection, we are able to easily change an object's
behavior set dynamically. We also can increase the level of indirection just
by put a link in the target slot of another link, going even further to achieve
the extension capability, although it seems an uncommon use for day-to-day programming.
The programmer, so, is free to change either the value in the link's source selector
or the value in the link's target selector to create _Behavioral Modes_ à la Self.

Now we will show you the proof-of-concept below:

\[[Skip the code](#skip-the-code)\] <a name="skip-the-code-back"></a> <br/>
<script src="https://gist.github.com/marcoonroad/e4704111b06e22fb1fb99d7f95845cc5.js"></script>
<noscript>Please enable JavaScript to see the Gist code.</noscript>
<br/> <a name="skip-the-code"></a> \[[Take me back](#skip-the-code-back)\]

We are using the well-known _copy on write_ technique for code optimization
of the concatenative approach of object inheritance. As you can see, we also
use the _copy on read_ optimization, which was developed by the Self's
researchers (if my mind is still working). That code is a bit long, so sorry
for that (maybe we will work later in this code). Notice that we have optimized
the delegation links to avoid useless "re-computation" by using memoization.

An example of code showing how to use the library follows:

<script src="https://gist.github.com/marcoonroad/ba884a4af0409d2ec04f03123b5681cb.js"></script>
<noscript>Please enable JavaScript to see the Gist code.</noscript>

<a name="conclusion"> </a>

### Conclusion

First-Class Delegation Links are an interesting alternative for sharing, not only
in the concatenation-based inheritance model, but also in the Object-oriented world
as a whole. We want to analyze further consequences of that approach, but by now it
may be sufficient.

{% include twitter.html %}

<a name="notes"> </a>

### Notes

<span></span>
<a name="prone-to-fragile-base-class"> </a>
1--Because they're frequently used with inheritance.
\[[Take me back](#prone-to-fragile-base-class-back)\] <br/>
<a name="external-method-renaming"> </a>
2--Which doesn't also rename the self-sends without the proper expensive code recompilation.
\[[Take me back](#external-method-renaming-back)\]
