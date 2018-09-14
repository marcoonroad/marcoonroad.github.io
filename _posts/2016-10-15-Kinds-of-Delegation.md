---
layout: post
title: Kinds of Delegation
category: "Computer Science"
tags: [ prototype-based,
        oop, delegation,
        lua ]
refs: [ delegation-as-sharing,
        programs-without-classes ]
author: marcoonroad
foot-icons: true
comments: true
analytics: true
updated: "2017-05-05"
---

  In my first post, I want to discuss how interestingly delegation can be thought in terms of object structure. My major
reference here is the paper _Delegation as a Sharing Relation: Characterization and Interpretation_ (made by
_Daniel Bardou_). But, first and foremost, let's discuss what is intrinsic to all object structures.

<a name="specification"> </a>

### Specification

  We can sketch an object in terms of a table: let's call the first column as the **selector** and the second one as
the **value**. Also, we'll call every row, from now on, as simply **property**, which is a pair/entry of an
_unique_ selector pointing to any value.

![Object structure]({{ site.baseurl }}/images/Kinds-of-Delegation/object-structure.jpg)

  Selectors in any table (i.e, object) can't change, otherwise the uniqueness of object's selection (accessing the
state or sending some message) is broken. In SQL terms, this column will be the _primary key_. 'Cause state mutations
occur frequently, our value column is also writable. Pay attention that, despite selectors being read-only, they can be
removed if the whole entry (that is, the property) is also removed. This property erasing mechanism may be performed
while setting a special value, such as `null`, `nil`, `undefined` or whatever, but in our discussion it will be
`erase` (I'm reserving `nil` to trigger lookup in parent objects).

  Bardou shows different kinds of sharing among inheritance and delegation, and also compares them in his paper. For
me, I will take two kinds of delegation sharing, called as **property sharing** and **value sharing**. Firstly, I
will show how value sharing can be represented below:

![Value sharing delegation]({{ site.baseurl }}/images/Kinds-of-Delegation/value-delegation.jpg)

  As you can see, the value of the child's `move` selector is linked to the value of the parent's `move`-related
value. Thus any change performed on the parent's `move`-related value will be reflected and synchronized with the
child's `move`-related value. If the child object performs non-nil changes in its own `move`-related value field, the
link between this child and its parent on that selector is gone. By now, this topic suffices. Let's head toward
property sharing delegation.

![Property sharing delegation]({{ site.baseurl }}/images/Kinds-of-Delegation/property-delegation.jpg)

  From the example above, we can easily deduce that the child's selection itself will be delegated to its parent
rather than delegating the lookup of some non-nil value. It has interesting implications, the main one is that not
only the state access can be delegated, _but also the state mutation_ (because this is performed after finding a
proper property). This, in the literature, is known as _split objects representation_. We also can easily implement
subjective/contextual programming with that. Nevertheless, without the proper care, it can lead to inconsistent
softwares, mostly 'cause it gives the power to the child object break encapsulation of its parent, and when there
is a bunch of child objects, things can be out of control, worst even in non-concurrent environments.

  So, which is the best sharing delegation mechanism? The answer is both. While the former (i.e, value sharing) protects
the object's identity, it also encapsulates too much to the point where an object may end with too much
responsibilities/concerns. For the latter, it is very useful to provide well-factored code, proper separation of
concerns, maintainable and modular code, etc, but state mutations can break your system reasoning through entangled
web of dependencies. For the rule of thumb, use property sharing when the state changes don't occur often, and value
sharing when your object is not taking too much methods in its behavior.

<a name="implementation"> </a>

### Implementantion

  To implement a proof of concept, I have chosen the Lua language. The code is shown below (don't worry, I'll explain
step by step every piece of code):

<script src="https://gist.github.com/marcoonroad/ac3d7f6c7bf4141e2bbaf26e3c54d8b7.js"> </script>
<noscript>Please enable JavaScript to see the Gist code.</noscript>

  In his paper, Bardou cites an interesting issue:

> Property sharing raises also the problem of object identity. If child objects have to be considered as
> extensions of their parents, one can not put any frontier between objects: every object can create an
> extension of another one in order to gain full access to its properties. This problem is well discussed
> in [13].

  To address that, I'm using the `protected` property to put some frontier between objects: an object only can
be split into another representation if this property is set to `false`. By default, this property is set to
`true` and is inherited by all descendants of `prototype`. Nevertheless, objects themselves may overwrite this
in their own properties. 'Cause this property can be modified during runtime, triggered delegation of mutation
on parent's properties may fail. I have put this constraint to give us a soundness feeling of the system.

  There are 3 types of metatables, one for every kind of operation performed among objects, which are _cloning_,
_split extension_ and _read-only aliasing_ (this latter for the sake of good practices). Cloning here stands for
value sharing while extension stands for the property sharing. The lookup algorithm goes into the `parent` slot,
which is not late-bound to disable unwanted recursion. The `parent` slot is also writable, which gives us Self's
_behavioral modes_ for free (although our design decision is almost limited as like single-inheritance).

  The `erase` property is a kind of _final_ implementation in the same way of Java's `final` keyword: it can't be
overridden and is also inherited by all children objects. The value of the `erase` property halts the lookup if
it is not being run with the `erase` selector (we still need to access this magic value through `erase`, after
all). When the lookup stops by halting or by failure, it "re-dispatchs" the selection to the `missing` error handling
method, which is expected to deal with non-existent properties.

  Finally, we export an immutable alias of the `prototype` to prevent external modifications into this object. If you
are paying attention enough, you may have noticed that it disallows us to call `extend` directly into `prototype`
('cause we can't modify the already set `protected` property), this is due the fact that the prototype plays the role of an
_abstract object_ to provide a small set of behaviors while also being a factory of objects through the `clone`
operation. Observe also that, despite being immutable, the external reference of prototype can, without problems,
create mutable instances. It's also valid for every kind of immutable
view of an object...

  A silly example of how using the implementation module follows:

<script src="https://gist.github.com/marcoonroad/621c1f796eac120a00b3d5248dc47478.js"></script>
<noscript>Please enable JavaScript to see the Gist code.</noscript>

  Oh God, I am tired... stay tuned on for further posts here. Thanks.

{% include twitter.html %}
