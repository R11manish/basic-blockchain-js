# Basic Blockchain Implementation in JavaScript

This project provides a **basic implementation of a blockchain** in JavaScript for educational purposes. It demonstrates the fundamental concepts of blockchain technology, including blocks, hashing, proof of work, and the chain of trust between blocks.

---

## **Features**
- **Blocks**: Each block contains data, a timestamp, a hash, and a reference to the previous block's hash.
- **Proof of Work**: Implements a simple proof-of-work algorithm to add difficulty to the mining process.
- **Chain Validation**: Ensures the integrity of the blockchain by validating the hashes and the sequence of blocks.

---

## **Requirements**
- [Node.js](https://nodejs.org) (Version 18+ recommended)
- ```bash
  docker run --name redis-container -d redis
---

## **Getting Started**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/R11manish/basic-blockchain-js.git
   cd basic-blockchain-js
   pnpm install
