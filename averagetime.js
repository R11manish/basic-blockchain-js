const BlockChain = require('./blockchain')
const blockchain = new BlockChain()

blockchain.addBlock({ data: "hello" })

let prevTImestamp, nextTimestamp, nextBlock, timeDiff, averageTime;

const times = [];

for (let i = 0; i < 1000; i++) {
  prevTImestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock({ data: `block number : ${i}` })
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;
  timeDiff = nextTimestamp - prevTImestamp;
  times.push(timeDiff)

  averageTime = times.reduce((total, num) => (total + num)) / times.length;

  console.log(`Time to mine block: ${timeDiff} ms , Difficulty: ${nextBlock.difficulty} Average Time : ${averageTime}ms`)
}