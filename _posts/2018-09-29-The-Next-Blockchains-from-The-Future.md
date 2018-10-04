---
layout: post
title: "The Next Blockchains from The Future"
category: "Computer Science"
tags: [ blockchain,
        crypto-currency,
        smart-contracts,
        onchain-governance ]
foot-icons: true
author: marcoonroad
draft: true
sitemap: false
---

The Crypto-currency world has expanded so much that it is being applied _even_
outside the currency domain. The first "Revolution" / spin-off of the
Crypto-currencies was Ethereum, promised to ease the implementation of new
Crypto-currency assets (a.k.a tokens) by dropping away all the complexity of
Swarm protocols, Consensus algorithms, etc from the average programmers (us).
Due the Turing-completeness of the EVM, it also allowed the implementation of
arbitrary business rules, the so-called _Smart Contracts_. In this article, we
analyze and even guess some features for the next blockchains (some already
ongoing, other just invented here - I wonder), for the second wave of the
Crypto-currency spin-off (a.k.a Third-Generation Blockchains).


## 0. Formal Verification

Regarding the [DAO Attack](https://en.wikipedia.org/wiki/The_DAO_(organization)),
this feature allows us to prove mathematical properties for our Smart Contract code
base. A [guy](https://github.com/MaiaVictor) on Ethereum is building a highly
optimized Functional Smart Contract, Dependently Typed Programming Language
(after much research, clearly, he is always pointing that what he builds is
based on other people's inventions). Other guys on Tezos are planning to use
Proof-assistants (such as Coq) to extract the Smart Contract code. The fact is
we're dealing with the other people's money, and we must be cautious about it.
**Really**.

<figure>
  <p/>
  <image
    src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/double-edge-sword.jpg"/>
  <figcaption>Smart Contracts in Quitessence.</figcaption>
</figure>


## 1. DAGs

Directed Acyclic Graphs are a data structure which lies somehow between a Tree
and a full Graph (with circular loops), so navigation, for example, by scanners
services, is feasible. Also called Blockchain-less crypto-currencies, DAGs enable
parallelization of the network by "forks", so long as such "forks" are merged and
enter in the same consensus (i.e, _canonical path_). Therefore, by parallelization,
DAGs can handle more transactions per second, and lower fees likewise.

An example of crypto-currency using DAGs is the controversial IOTA. Due the low
number of nodes, it is susceptible/prone to colluding attacks. By now, to avoid
that, IOTA is still centralized. DAGs resemble much the Git than Blockchains
themselves, in fact, the whole different types of consensus algorithms (e.g,
Proof-of-Work, Proof-of-Stake, etc...) may be unnecessary here.
There's still much research to be made on this field, and
[Conflict-free Replicated Data Types](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)
could make a perfect couple/match with DAG-based crypto-currencies.

<figure>
  <p/>
  <image
    src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/git-commit.png"/>
  <figcaption>
  Your Future Blockchain with pretty commit messages (credits for
  <a href="https://xkcd.com/1296/">XKCD</a>).
  </figcaption>
</figure>


## 2. Secure Multiparty Computations

The general idea of SMC is to play a "game" without any player revealing their own secrets.
A certain percentage of dishonest/colluding players is acceptable.
Multiparty Computations "generalize" Zero-Knowledge Proofs (which Vitalik is
planning to use to improve the Ethereum scalability & performance),
[Homomorphic encryption](https://en.wikipedia.org/wiki/Homomorphic_encryption),
Coin Tossing/Flipping protocols and
[Functional Encryption](https://en.wikipedia.org/wiki/Functional_encryption)
(this last one allows us to obfuscate the source code of our smart contracts).
They are implemented (mostly) with the
[Secret Sharing/Splitting](https://en.wikipedia.org/wiki/Secret_sharing) idea.
Some Blockchains (such as Elixxir and Enigma) are already investing efforts and
research on such Multiparty Computations field.


## 3. Feeless Transactions

Transaction fees are quite expensive nowadays. It's all 'cause the Supply X Demand
Law/Curve. The truth is that mining is _scarce_, and the mining pools around the world
just make it worse! With the next blockchains, you can pay a cup of coffee while
reading Albert Camus without any problem. Rewards can be the only incentive for
miners (or bakers, whatever you say). In fact, _block rewards must be the only
incentive for them_. It's just a matter to reduce the high-entry barrier on the
Miners' Party and thus, increase the miners' decentralization and supply. Some
guy have implemented something like that feeless idea
[here](https://github.com/bitclave/Feeless). The both controversial EOS and
IOTA blockchains also implement zero fee / feeless transactions (although in EOS
you pay with inflation).

We can also delay such reward to incentive long-lived good/honest/loyal behavior on
them, while applying immediate punishments (it's not different of a job, where
you can be fired in just one day, but your promotion only comes, at least, after
5 months). In this sense, the delayed reward becomes a "Stake" for the miner akin
to bakers on the Proof-of-Stake consensus protocol. The
[Delayed Blockchain Protocols](https://arxiv.org/abs/1804.06836)
paper discuss such sort of delayed rewards idea.

<figure>
  <p/>
  <image
    src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/crypto-party.jpg"/>
  <figcaption>
  <a href="https://www.nytimes.com/2018/01/13/style/bitcoin-millionaires.html">
  Everyone Is Getting Hilariously Rich and You’re Not</a> (image from NY Times).
  </figcaption>
</figure>


## 4. Pausable/Resumable Smart Contracts

The Gas idea of Ethereum was genial. It isn't Ether, so it doesn't oscilate on
the market, but just a unit of computation measurement. With that, Ethereum is
*pseudo-Turing-complete*. Some guys [here](https://synthetic-minds.com/) are
leveraging that property to perform formal verification using _program synthesis_.
But we're missing a *huge* point here. If we want the Blockchain to become the
Web 3.0, we should be able to run long-running contracts/transactions. It's not
possible today, we are just a bit happy with small toy scripts here and there.

We are running contracts and reverting everything when it run out-of-gas. We're
generating entropy without any kind of value on the other side (the contract's
caller). It's quite _non-sense_. A solution would be to use _implicit_ **yield**
_points_, as our contract were a coroutine/continuation. With that, the miner
can save a snapshot of our contract to be run later by other miner. So, every
transaction (a.k.a contract call) becomes a coroutine with the states _PENDING_,
_RUNNING_, _SUSPENDED_ and _DEAD_ (when finished or aborted).

<figure>
  <p/>
  <image
    src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/fisher-price.jpg"/>
  <figcaption>Our Smart Contract programs today (no, it's not a tradeable/fungible kitty).</figcaption>
</figure>


## 5. Self-Amendment

It's important to note that On-Chain Governance and Self-Amendment aren't the
same thing under different words. Governance is one of the most discussed and most
controversial features of the Blockchains 3.0. It's even related to DAOs.
Self-Amendment, on the other hand, can be seen as the opposed of the initial idea
of Ethereum (_a Marketplace for Tokens_). While Smart Contract Tokens compete
each other horizontally for Network Effects and Price/Demand Valuation (and due that,
exchange protocols such as ERC20 were proposed), Self-Amendment is a way to patch
the blockchain with new features vertically, akin to an Evolutionary process.
On-chain governance only attempts to make it democratic by building a consensus
among the different types of end users' interests (bakers, investors/coin holders,
recurrent buyers, etc).


## 6. Off-chain Payments

To scale to "real-time", real-world, "instantaneous" payments, a trending on
blockchains is to perform transfers outside the chain network. The Bitcoin's
[Lightning Network](https://en.wikipedia.org/wiki/Lightning_Network) is the most
famous example of that. Many Payment Providers (PoS/Gateway corporations) around
the world are planning to open such BTC channel for their own Merchants.

There's also some Smart-Contract-based blockchains which
perform off-chain contract code execution (for instance, AEternity's State
Channels). The settlement phase is when all liabilities are cleared and a final
state of the contract is committed directly on the chain. Such off-chain
contracts also enable quite good parallelization of the network overall
performance.


## 7. Built-in Oracles

Despite the confusing and misleading name, Oracles are the bridge between a given
blockchain and the real-world. Oracles aren't prediction tools, but given sufficient
accumulated data, they _can predict something_ using Machine Learning and AI
techniques. Oracles, also called data-feeders, are basically tools to report
past events from the external world. Such data-feeders can gather the information
from the real-world through plugged sensors, for instance.

In the age of Big-Data and Analytics for Business Planning & Decision Making,
Oracles have a reason to exist. Given a simple question (_how much dollars is
1 ether worth now?_ - for instance), the contract interested on the answer agrees with
the Oracle contract on some ID for this question. Once the answer is ready, either
the Oracle contract calls the interested contract passing the question ID + answer,
or the interested contract is notified about that and then retrieves the answer
from the Oracle by passing the ID on the Oracle's contract call/transaction. In
simple words, he have either "pull-based" or "push-based" Oracle contracts.

Augur and Oraclize are famous examples of companies providing Blockchain Oracles
tools. Augur uses a token for reputation (REP) to finalize an Oracle response.
On the other hand, Oraclize uses authenticity proofs to confirm that data was
fetched from a genuine source and wasn't tampered. A novel approach is made by
the AEternity's guys, where they implement the Oracle as part of the Blockchain
Protocol. Keep in mind that all of such approaches are made by third-party players,
and there's no consensus mechanism to ensure the information itself is
trustworthy.

<figure>
  <p/>
  <image
    src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/mass-surveillance.jpg"/>
  <figcaption>
  Will Oracles lead to State Terrorism & Mass Surveillance à la Psycho Pass?
  </figcaption>
</figure>


## 8. Post-Quantum Cryptography

Quantum computers can break RSA and Elliptic-Curves. There are some compelling
alternatives to protect us from such "Quantum attacks". They're
[Learning With Errors](https://en.wikipedia.org/wiki/Ring_learning_with_errors_signature)
signatures (based on the Quantum computationally-proven secure Lattice-based cryptography)
and Quantum Key Distribution + Quantum Coin Flipping Protocol + One-time Pads (this last one
is theoretically-proven secure).

_Learning With Errors_, in special, is the most promising signature algorithm.
Because QKD+OTP demand a Quantum Computer beforahand to protect us from such Quantum
Attacks on existing signature algorithms (and Quantum Hybrid Machines would be
really expensive initially), the only feasible solution is a Quantum-resistant
cryptography running on Classical machines. The Next Blockchains must look forward
the Lattice-based cryptography, or else, a huge risk would hit them.

<figure>
  <p/>
  <image
    src="{{ site.baseurl }}/images/The-Next-Blockchains-from-The-Future/chesire-cat.jpg"/>
  <figcaption>The Quantum World has some weird theories.</figcaption>
</figure>


## 9. Object Capabilities

To be at least usable by developers, Smart-Contract-based Blockchains need an Ecosystem
in the same sense of the well-known ones from NodeJS (NPM), OCaml (OPAM), Elixir (Mix/Hex),
etc. Formal Verification may not be enough. We need a secure way to compose third-party
libraries without the risk of any kind of attacks. For that, Object Capabilities
arrive into the game. Initially designed for Operating System security & Access
Control, Object Capabilities are yet reaching slowly the Programming Languages
field.

In fact, the whole idea of Smart Contracts is often associated with Object Capabilities
on the academic literature. Following the OCaps definition, Smart Contracts are
_third-party scripts running on an untrusted environment where the parties are
mutually suspicious and the code execution enforces the contract laws_. Reminds
you anything? You guessed it right, this is how Ethereum Smart Contracts work.

<blockquote class="twitter-tweet">
<p lang="en" dir="ltr">
&quot;An Operating System consists of things you forgot to put into your programming language&quot; Alan Kay
<a href="https://twitter.com/hashtag/unikernels?src=hash&amp;ref_src=twsrc%5Etfw">#unikernels</a>
</p>&mdash; Justin Cormack (@justincormack)
<a href="https://twitter.com/justincormack/status/999933037319245824?ref_src=twsrc%5Etfw">May 25, 2018</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## 10. Newcomer-Friendly Documentations

No. It's not a joke. Seriously. Perhaps a bit fun, so... 'Cause the vast majority
of blockchains are Open Source, they'all suffer from the lack of good documentation.
Think in Network Effects. A JavaScript-like or Python-like Smart Contract language
wouldn't help to spread the usage of your Blockchain if the average can't figure
out what should they do. And no, high-salaries on the market don't work well as
a fair exchange for headaches. :)
