const express = require("express")
const BlockChain = require("./blockchain")
const PubSub = require('./publish-subscribe')
const app = express()
app.use(express.json());



const blockchain = new BlockChain();

const pubsub = new PubSub({ blockchain })

pubsub.subscribe((message) => console.log(message))

setTimeout(() => pubsub.broadcastChain(), 1000)


async function synChain() {
  const url = 'http://localhost:3000/api/blocks';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('dsfhjdskh', JSON.stringify(data.chain))
    blockchain.replaceChain(data.chain)
  } catch (error) {
    console.error('Error fetching blocks:', error.message);
  }
}

app.get("/api/blocks", (req, res) => {
  res.json(blockchain)
})


app.post("/api/blocks", (req, res) => {
  const { data } = req.body;
  blockchain.addBlock({ data })
  pubsub.broadcastChain()
  res.redirect('/api/blocks')
})

function generateRandomPort() {
  const minPort = 1024; // Minimum non-reserved port number
  const maxPort = 65535; // Maximum valid port number
  return Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort;
}

const args = process.argv.slice(2); // Skip 'node' and script name
const port = args[0]; // First argument


synChain()
const PORT = port || generateRandomPort()
app.listen(PORT, () => console.log(`listening to port no : ${PORT}`))