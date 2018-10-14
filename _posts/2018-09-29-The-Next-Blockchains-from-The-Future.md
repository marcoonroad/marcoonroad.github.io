---
layout: post
title: "The Next Blockchains from The Future"
category: "Computer Science"
tags: [ blockchain,
        crypto-currency,
        object-capabilities,
        smart-contracts,
        on-chain-governance ]
refs: [ delayed-blockchain-protocols,
        tezos-white-paper,
        aeternity-whitepaper,
        enigma-paper,
        ethereum-yellow-paper ]
links: [ network-effects-of-stores-of-value,
         incentivized-relay-networks,
         vote-buying-and-dark-daos,
         there-is-no-need-for-hard-forks,
         blockchains-are-not-startups,
         blockchains-should-not-be-democracies ]
foot-icons: true
author: marcoonroad
draft: true
comments: false
analytics: false
sitemap: false
---

The Crypto-currency world has expanded so much that it is being applied _even_
outside its currency domain. The first "Revolution" / spin-off of the
Crypto-currencies was Ethereum, promised to ease the implementation of new
Crypto-currency assets (a.k.a tokens) by dropping away all the complexity of
P2P protocols, Consensus algorithms, etc from the average programmers (us).
Due the Turing-completeness of the EVM, it also allowed the implementation of
arbitrary business rules, the so-called _Smart Contracts_. In this article, we
analyze and even guess some features for the next blockchains (some already
ongoing, other just invented here - I wonder), for the second wave of the
Crypto-currency spin-off (a.k.a Third-Generation Blockchains).


## 0. Formal Verification

Regarding the
[DAO Attack](https://en.wikipedia.org/wiki/The_DAO_(organization)), this feature
allows us to prove mathematical properties for our Smart Contract code base. A
[guy](https://github.com/MaiaVictor) on Ethereum is building a highly optimized
Functional Smart Contract, Dependently Typed Programming Language (after much
research, clearly, he is always pointing that what he builds is based on other
people's inventions). Other folks on Tezos are planning to use Proof-assistants
(such as Coq) to extract the Smart Contract code. The fact is we're dealing
with the other people's money, and we must be cautious about it. **Really**.

<figure>
  <p/>
  <image src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/double-edge-sword.jpg"/>
  <figcaption>Smart Contracts in Quitessence.</figcaption>
</figure>


## 1. DAGs

Directed Acyclic Graphs are a data structure which lies somehow between a Tree
and a full Graph (with circular loops), so navigation, for example, by scanners
/ explorers services, is feasible. Also called Blockchain-less
crypto-currencies, DAGs enable parallelism on the network by "forks", so long as
such "forks" are merged and enter in the same consensus (i.e, _canonical path_).
Therefore, due the enabled parallelism, DAGs can handle more transactions per
second, and lower fees likewise.

An example of crypto-currency using DAGs is the controversial IOTA. Due the low
number of nodes, it is susceptible / prone to colluding attacks. By now, to avoid
that, IOTA is still centralized. DAGs resemble much the Git than Blockchains
themselves, in fact, the whole different types of consensus algorithms (e.g,
Proof-of-Work, Proof-of-Stake, etc...) may be unnecessary here.
There's still much research to be made on this field, and
[Conflict-free Replicated Data Types](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)
could make a perfect couple / match with DAG-based crypto-currencies.

<figure>
  <p/>
  <image src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/git-commit.png"/>
  <figcaption>
    Your Future Blockchain with pretty commit messages
    (credits for <a href="https://xkcd.com/1296/">XKCD</a>).
  </figcaption>
</figure>


## 2. Secure Multiparty Computations

The general idea of SMC is to play a "game" without any player revealing their
own secrets. A certain percentage of dishonest / colluding players is acceptable.
Multiparty Computations "generalize" Zero-Knowledge Proofs (which Vitalik is
planning to use to improve the Ethereum scalability & performance),
[Homomorphic encryption](https://en.wikipedia.org/wiki/Homomorphic_encryption),
Coin Tossing / Flipping protocols (a.k.a public / deterministic randomness) and
[Functional Encryption](https://en.wikipedia.org/wiki/Functional_encryption)
(this last one allows us to obfuscate the source code of our smart contracts).
They are implemented (mostly) with the
[Secret Sharing/Splitting](https://en.wikipedia.org/wiki/Secret_sharing) idea.
Some Blockchains (such as Elixxir and Enigma) are already investing efforts and
research on such Multiparty Computations field.


## 3. Feeless Transactions

Transaction fees are quite expensive nowadays. It's all 'cause the Supply X
Demand Law / Curve. The truth is that mining is _scarce_, and the mining pools
around the world just make it worse! With the next blockchains, you can pay a
cup of coffee while reading Albert Camus without any problem. Rewards can be the
only incentive for miners (or bakers, whatever you say). In fact, _block rewards
must be the only incentive for them_. It's just a matter to reduce the
high-entry barrier on the Miners' Party and thus, increase the miners'
decentralization and supply. Some guy have implemented something like that
feeless idea [here](https://github.com/bitclave/Feeless). The both controversial
EOS and IOTA blockchains also implement zero fee / feeless transactions
(although in EOS you pay with inflation).

<figure>
  <p/>
  <image src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/crypto-party.jpg"/>
  <figcaption>
    <a href="https://www.nytimes.com/2018/01/13/style/bitcoin-millionaires.html">
    Everyone Is Getting Hilariously Rich and You’re Not
    </a> (image from NY Times).
  </figcaption>
</figure>

Due the sequential mining nature, transaction fees work as a priority index to
miners order transaction orders to mine. In the end, transaction fees turn the
Blockchain into a priority queue for background processing, resembling somehow
existing Message Queues such as RabbitMQ and ZeroMQ. The only difference is that
the slave, the single point of failure, always changes randomly (roughly saying).

We can also delay such reward to incentive long-lived good / honest / loyal behavior
on them, while applying immediate punishments (it's not different of a job, where
you can be fired in just one day, but your promotion only comes, at least, after
5 months). In this sense, the delayed reward becomes a "Stake" for the miner akin
to bakers on the Proof-of-Stake consensus protocol. The
[Delayed Blockchain Protocols](https://arxiv.org/abs/1804.06836)
paper discuss such sort of delayed rewards idea.

To protect the IP privacy of players, we can also provide incentives for embedded
relay networks such as Tor. Drew Stone (the same author of the _Delayed Blockchain
Protocols_ paper above) call that sort of incentives as _Cooperative
Mining Rewards_, and discuss such interesting idea [here](https://medium.com/@drstone/incentivized-relay-networks-74635c2ed83?fbclid=IwAR1brkskRfvZDrNDkT_vV_An1468OnqzFI3bph4yUYrCNPVhrmVrPBajoO8). Keep in mind that wealth inequality
is a must-discuss topic in Blockchains, we should not go against the richest ones' wealth
(it would be theft & envy anyways), we should go against their _power_. So, we must try
to reduce huge wealth inequalities whenever it could happen, and avoid any mechanisms
which increase the decision-making power based on the wealth amount. Such kind of
power must not be able to compromise the network in any way.


## 4. Pausable / Resumable Smart Contracts

The Gas idea of Ethereum was genial. It isn't Ether, so it doesn't pump & dump
on the market, but just a unit of computation measurement. With that, Ethereum
is *pseudo-Turing-complete*. Some folks [here](https://synthetic-minds.com/) are
leveraging that property to perform formal verification using _program
synthesis_. But we're missing a *huge* point here. If we want the Blockchain to
become the Web 3.0, we should be able to run long-running contracts /
transactions. It's not possible today, we are just a bit happy with small toy
scripts here and there.

<figure>
  <p/>
  <image src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/fisher-price.jpg"/>
  <figcaption>Our Smart Contract programs today (no, it's not a fungible kitty).</figcaption>
</figure>

We are running contracts and reverting everything when it runs out-of-gas. We're
generating entropy without any kind of value on the other side (the contract's
caller). It's quite _non-sense_. A solution would be to use _implicit_ `yield`
_points_, as our contract were a coroutine / one-shot continuation. With that,
the miner can save a snapshot of our contract to be shot / resumed later by
other miner. So, every transaction (a.k.a contract call) becomes a coroutine
with the states _PENDING_, _RUNNING_, _SUSPENDED_ and _DEAD_ (when finished or
aborted).

Besides the implicit `yield` points performed by miners, we can also implement
explicit `yield` points on our smart contract programming languages (even being
implicit, yields are deterministic due the gas usage, and thus, coroutines
instead preemptive threads). With coroutines, we gain an expressive cooperative
concurrency model. We can even turn every synchronous contract call into an
asynchronous transaction call and implement promises on top of that. Keep in
mind that most _Stack-based attacks_ and _re-entrancy bugs_ are due the
synchronous nature of internal / contract calls.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en">
  <p lang="en" dir="ltr">Immediate calls lead to reentrancy hazards
  <a href="https://t.co/ScH2dZbQjz">pic.twitter.com/ScH2dZbQjz</a>
  </p>
  &mdash; Agoric (@agoric)
  <a href="https://twitter.com/agoric/status/1050210835228835840?ref_src=twsrc%5Etfw">
  October 11, 2018
  </a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
</script>

With pausable / resumable contracts, cloud providers such as Google Cloud,
Amazon Web Services, Digital Ocean and Microsoft Azure would become obsolete.
Pausable contracts would enable a new market for service hosting, being secure,
transparent and on-demand (_pay-as-you-go_ akin to Serverless architectures). On
huge peaks / traffic such as the
[one](https://media.consensys.net/the-inside-story-of-the-cryptokitties-congestion-crisis-499b35d119cc)
which CryptoKitties imposed on Ethereum, off-chain state channels open on-demand
could be a good replacement for existing auto-scale and load-balancing
mechanisms, for instance, from Kubernetes.


## 5. Self-Amendment

It's important to note that On-Chain Governance and Self-Amendment aren't the
same thing under different words. Governance is one of the most discussed and
most controversial features of the Blockchains 3.0. It's even related to DAOs.
Self-Amendment, on the other hand, can be seen as the opposed of the initial
idea of Ethereum (_a Marketplace for Tokens_). While Smart Contract Tokens
compete each other horizontally for Network Effects and Price-Demand Valuation
(and due that, exchange protocols such as ERC20 were proposed), Self-Amendment
is a way to patch the blockchain with new features vertically, akin to an
Evolutionary process. On-chain governance only attempts to make it democratic by
building a consensus among the different types of end users' interests (bakers,
investors/coin holders, recurrent buyers, etc).

Many counter-arguments for the On-chain Governance model point out the power who
the blockchain maintainers would gain. In many ways, the advocates of Off-chain
Governance argue that it's not the duty neither the responsibility of the
protocol maintainers to govern the Blockchain evolution by voting systems, and
that the code should not be the law akin to the Rousseau's Social Contract
theory, that is,
_[blockchains should not be democracies](https://hackernoon.com/blockchains-should-not-be-democracies-14379e0e23ad)_.
One of the major arguments is
our current "failed" democratic system, which tends to
[two-parties system](https://en.wikipedia.org/wiki/Two-party_system) by
being single-vote, [winner-takes-all](https://en.wikipedia.org/wiki/Plurality_voting).

<blockquote class="twitter-tweet" data-conversation="none" data-lang="pt">
  <p lang="en" dir="ltr">
  Even countries that never had a bill of rights have identical 2nd amendment
  debates as the US. Brazil has over 30 parties, has different campaign finance
  rules, no FPTP, no district voting, yet it ends up having a near identical Rep
  vs Dems elections.
  </p>
  &mdash; alex van de sande (@avsa)
  <a href="https://twitter.com/avsa/status/1049285182531035137?ref_src=twsrc%5Etfw">
  October 8, 2018
  </a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
</script>

But is not quite true. Not quite, **really**. On-Chain Governance could work
besides the failure of our real-world democracy. We need just to sum smart work
and hard work together on this open problem. As a start point, we can leverage
all the things we have nowadays at our hands, which are:

* Decentralized Autonomous Organizations (an approach made by Ethereum)
* Formal Verification (an approach taken by Tezos and Ethereum)
* Prediction Markets & Oracles (an approach taken by AEternity)
* Secure Multiparty Computations (by the Enigma folks)

With all such tools, we can propose the On-chain Governance model of the
Blockchain Protocols **safely**. Prediction Markets & Oracles would help people
to choose the best proposal. Formal Verification would prove the new
protocol has not any kind of bug neither that it's a hidden attack vector on the
Blockchain network. SMC would hide the votes of all the citizens, thus, avoiding
[vote-buying schemes](http://hackingdistributed.com/2018/07/02/on-chain-vote-buying/)
(as they happened on the controversial EOS). The DAO approach, in the end, could
make all existing parties (group of developers) transparent. And so on...

In any case, whenever some _really smart hacker_ patch a critical protocol
change successfully, being a patch which open a huge security breach on the
network, we can always resort to the old and good Split / Hard-fork, following
the example of the genial Ethereum folks, because
"[there is no need for hard forks](https://medium.com/tezos/there-is-no-need-for-hard-forks-86b68165e67d)",
_but there will be hard-forks nonetheless_... After all, Blockchains would not
replace our Government and State, Blockchains will just make them _useless_.

<blockquote class="twitter-tweet" data-lang="pt">
  <p lang="en" dir="ltr">
  Every time you spend your money, you&#39;re voting for the continuing
  existence of everything around it. A market-based society is radically
  democratic because everything around you is in a constant election. Making
  sure everyone has access to money is expanding voting rights.
  </p>
  &mdash; alex van de sande (@avsa)
  <a href="https://twitter.com/avsa/status/1033096612736913409?ref_src=twsrc%5Etfw">
  24 de agosto de 2018
  </a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
</script>

The whole self-amendment nature would unfold novel features for the Blockchains.
Think in Git. Blockchains, all of they, suffer from eventual Split / Hard-fork.
_Self-Amending Ledgers_ enable the _safe_, _agreed upon_ and _consistent_ merge
of previously forked distributed ledgers. It enables even the merge of
_unrelated_ blockchains (without common ancestor, unlike forks which share one) such
as Bitcoin and Ethereum. Today, the community of developer hands & minds
revolves around the deployment of Smart Contracts. The next community of
developer hands & minds would aim fast iterations of additional features, and
even bugfixes in the case of security breachs. The whole Blockchain would become
a single, centralized, distributed, forkable, mergeable, open, permission-less,
censorship-resistant Git repository, with millions of contributors around the
world.


## 6. Off-chain Payments

To scale to "real-time", real-world, "instantaneous" payments, a trending on
blockchains is to perform transfers outside the chain network. The Bitcoin's
[Lightning Network](https://en.wikipedia.org/wiki/Lightning_Network) is the most
famous example of that. Many Payment Providers (PoS / Gateway corporations)
around the world are planning to open such BTC channel for their own Merchants.

There's also some Smart-Contract-based blockchains which
perform off-chain contract code execution (for instance, AEternity's State
Channels & Counterfactual's 2nd layer Generalised State Channels for Ethereum).
The settlement phase is when all liabilities are cleared and a final state of
the contract is committed directly on the chain. Such off-chain contracts also
enable quite good parallelism of the network overall performance.


## 7. Built-in Oracles

Despite the confusing and misleading name, Oracles are the bridge between a
given blockchain and the real-world. Oracles aren't prediction tools, but given
sufficient accumulated data, they _can predict something_ using Machine Learning
and AI techniques. Oracles, also called data-feeders, are basically tools to
report past events from the external world. Such data-feeders can gather the
information from the real-world through plugged sensors, for instance.

In the age of Big-Data and Analytics for Business Planning & Decision Making,
Oracles have a reason to exist. Given a simple question (_how much dollars is
1 ether worth now?_ - for instance), the contract interested on the answer
agrees with the Oracle contract on some ID for this question. Once the answer is
ready, either the Oracle contract calls the interested contract passing the
question ID + answer, or the interested contract is notified about that and then
retrieves the answer from the Oracle by passing the ID on the Oracle's contract
call / transaction. In simple words, he have either "pull-based" or "push-based"
Oracle contracts.

Augur and Oraclize are famous examples of companies providing Blockchain Oracles
tools. Augur uses a token for reputation (REP) to finalize an Oracle response.
On the other hand, Oraclize uses authenticity proofs to confirm that data was
fetched from a genuine source and wasn't tampered with. A novel approach is made by
the AEternity's folks, where they implement the Oracle as part of the Blockchain
Protocol. Keep in mind that all of such approaches are made by third-party
players, and there's no consensus mechanism to ensure the information itself is
trustworthy, _only that the majority agrees / believes on it_ (that is, fake
news are quite possible).

<figure>
  <p/>
  <image src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/mass-surveillance.jpg"/>
  <figcaption>
  Will Oracles lead to State Terrorism & Mass Surveillance à la Psycho Pass?
  </figcaption>
</figure>


## 8. Post-Quantum Cryptography

Quantum computers can break RSA and Elliptic-Curves. There are some compelling
alternatives to protect us from such "Quantum attacks". They're
[Learning With Errors](https://en.wikipedia.org/wiki/Ring_learning_with_errors_signature)
signatures (based on the Quantum computationally-proven secure Lattice-based
cryptography) and Quantum Key Distribution + Quantum Coin Flipping Protocol +
One-time Pads (this last one is theoretically-proven secure).

_Learning With Errors_, in special, is the most promising signature algorithm.
Because QKD+OTP demand a Quantum Computer beforehand to protect us from such
Quantum Attacks on existing signature algorithms (and Quantum Hybrid Machines
would be really expensive initially), the only feasible solution is a
Quantum-resistant cryptography running on Classical machines. The Next
Blockchains must look forward the Lattice-based cryptography, or else, a huge
risk would hit them.

<figure>
  <p/>
  <image src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/chesire-cat.jpg"/>
  <figcaption>The Quantum World has some weird theories.</figcaption>
</figure>

Anyways, if you're curious about Lattice-based cryptography, there's some good
GitHub projects implementing that thing below:

- [open-quantum-safe/liboqs](https://github.com/open-quantum-safe/liboqs)
- [vscrypto/ringlwe](https://github.com/vscrypto/ringlwe)
- [tpoeppelmann/newhope](https://github.com/tpoeppelmann/newhope)


## 9. Object Capabilities

To be at least usable by developers, Smart-Contract-based Blockchains need an
Ecosystem in the same sense of the well-known ones from NodeJS (NPM), OCaml
(OPAM), Elixir (Mix/Hex), etc. Formal Verification may not be enough. We need a
secure way to compose third-party libraries without the risk of any kind of
attacks. For that, Object Capabilities arrive into the game. Initially designed
for Operating System security & Access Control, Object Capabilities are yet
reaching slowly the Programming Languages field.

<blockquote class="twitter-tweet">
  <p lang="en" dir="ltr">
  &quot;An Operating System consists of things you forgot to put into your
  programming language&quot; Alan Kay
  <a href="https://twitter.com/hashtag/unikernels?src=hash&amp;ref_src=twsrc%5Etfw">
    #unikernels
  </a>
  </p>
  &mdash; Justin Cormack (@justincormack)
  <a href="https://twitter.com/justincormack/status/999933037319245824?ref_src=twsrc%5Etfw">
  May 25, 2018
  </a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
</script>

In fact, the whole idea of Smart Contracts is often associated with Object
Capabilities on the academic literature. From the
[erights site](http://erights.org):

> A contract is a mutually agreeable arrangement of rules among mutually
> suspicious parties so they may cooperate with limited risks to each other's
> mischief. It is a game both are willing to play because both expect to win.
>
> A conventional contract is passive paper interpreted at great expense by
> lawyers and courts.
>
> A smart contract is written in program code, in which the logic of the
> program's execution enforce the terms of the contract. Smart contracts reduce
> costs by orders of magnitude, leading to a more cooperative world.

I would make it shorter in the following way: Smart Contracts are
_third-party scripts running on an unreliable host environment where the parties
are mutually suspicious and the code execution enforces the contract laws_.
Reminds you anything? You guessed it right, this is how Ethereum Smart Contracts
work.


## 10. Newcomer-Friendly Documentations

No. It's not a joke. Seriously. Perhaps a bit fun, so... 'Cause the vast
majority of blockchains are Open Source, they all suffer from the lack of good
documentation. Think in Network Effects. A JavaScript-like or Python-like Smart
Contract language wouldn't help to spread the usage of your Blockchain if the
average can't figure out what should they do. And no, high-salaries on the
market don't work well as a fair exchange for headaches. :)

For the race to become the _Winner Blockchain_, the Development Community factor
would make the decisive difference. **Clearly**. After all, Developers will
change the world 'cause **Software is Eating the World**. Following the Lean
Startup idea, fast and short iteration cycles of MVP means _continuous learning_
and the most useful competitive advantage on the highly competitive Blockchain
market.

---

{% include twitter.html %}

---
