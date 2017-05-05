---
layout: post
title: "Observers for Concatenative Sharing and Extension"
category: "Computer Science"
tags: [ oop,
        prototype-based,
        design-patterns,
        observers,
        message-passing,
        concatentative-delegation ]
foot-icons: true
author: marcoonroad
draft: true
sitemap: false
---

I have thought a lot: "How to provide a kind of good and _general_ addition of behaviors if it is intrinsically a relation
where the target objects (these being extended) are all forced to be _passive_.". If you're not aware of my complains about
"passiveness" of objects, just take a look on the __First-Class Delegation Links__ post in this blog. Anyways, replacing
existent passive object features with active ones is a great improvement, mostly when we are always looking forward the Actor
model (and even good OOP principles and designs, such as patterns for mutually suspicious objects). So, we should only provide
active features encoded on the Language API (because it's easy to encode passive features on top of these active ones, but not
vice-versa). Backing to the initial question, I have found a selective & active way of be aware of extensions and sharing, this
way is entirely rooted on the well-known Observer design pattern.

TODO 

<a name="discussion"> </a>

### Discussion

TODO

<a name="implementation"></a>

### Implementation

TODO

<a name="conclusion"> </a>

### Conclusion

TODO
