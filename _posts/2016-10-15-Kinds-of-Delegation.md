---
layout: post
title: Kinds of Delegation
category: Computer Science
tags: [prototype-based, oop, delegation]
---

  In my first post, I want do discuss how interestingly delegation can be thought in terms of object structure. My major
reference here is the paper _Delegation as a Sharing Relation: Characterization and Interpretation_ (made by
_Daniel Bardou_). But, first and foremost, let's discuss what is intrinsic to all object structures.

  We can sketch an object in terms of a table: let's call the first column as the **selector** and the second one as
the **value**. Also, we'll call every row, from now on, as simply **property**, which is a pair/entry of an
_unique_ selector pointing to any value.

![Object structure](https://raw.githubusercontent.com/marcoonroad/marcoonroad.github.io/master/_posts/kinds-of-delegation-object-structure.jpg)

  Selectors in any table (i.e, object) can't change, otherwise the uniqueness of object's selection (accessing the
state or sending some message) is broken. In SQL terms, this column will be the _primary key_. 'Cause state mutations
occur frequently, our value row is also writable. Pay attention that, despite selectors being read-only, they can be
removed if the whole entry (that is, the property) is also removed. This property erasing mechanism may be performed
while setting a special value, such as `null`, `nil`, `undefined` or whatever, but in our discussion it will be
`erase` (I'm reserving `nil` to trigger lookup in parent objects).

  Bardou shows different kinds of sharing among inheritance and delegation, and also compares them in his paper. For
me, I will take two kinds of delegation sharing, called as **property sharing** and **value sharing**. Firstly, I
will show how value sharing can be represented below:

![Value sharing delegation](https://raw.githubusercontent.com/marcoonroad/marcoonroad.github.io/master/_posts/kinds-of-delegation-value-delegation.jpg)

  As you can see, the value of the child's `move` selector is linked to the value of the parent's `move`-related
value. Thus any change performed on the parent's `move`-related value will be reflected and synchronized with the
child's `move`-related value. If the child object performs non-nil changes in its own `move`-related value field, the
link between this child and its parent on that selector is gone. By now, this topic suffices. Let's head toward
property sharing delegation.

![Property sharing delegation](https://raw.githubusercontent.com/marcoonroad/marcoonroad.github.io/master/_posts/kinds-of-delegation-property-delegation.jpg)

  From the example above, we can easily deduce that the child's selection itself will be delegated to its parent
rather than delegating the lookup of some non-nil value. It has interesting implications, the main one is that not
only the state access can be delegated, _but also the state mutation_ (because this is performed after finding a
proper property). This, in the literature, is known as _split objects representation_. We also can easily implement
subjective/contextual programming with that. Nevertheless, without the proper care, it can lead to inconsistent
softwares, mostly 'cause it gives the power to the child object break encapsulation of its parent, and when there
is a bunch of child objects, things can be out of control, worst even in non-concurrent environments.

  So, which is the best sharing delegation mechanism? The answer is both. While the former (i.e, value sharing) protects
the object's identity, it also encapsulates too much to the point where an object may end with too much
responsabilities/concerns. For the latter, it is very useful to provide well-factored code, proper separation of
concerns, maintainable and modular code, etc, but state mutations can break your system reasoning through entangled
web of dependencies. For the rule of thumb, use property sharing when the state changes don't occur often, and value
sharing when your object is not taking too much methods in its behavior.

  Oh God, I am tired... stay tuned on for further posts here. Thanks.
