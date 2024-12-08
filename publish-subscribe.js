const Redis = require('ioredis');

const CHANNELS = {
  BLOCKCHAIN: "BLOCKCHAIN"
}

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;
    this.channelName = CHANNELS.BLOCKCHAIN;
    this.publisher = new Redis(); // Redis client for publishing
    this.subscriber = new Redis(); // Redis client for subscribing
  }

  // Subscribe to the channel and handle incoming messages
  subscribe(callback) {
    this.subscriber.subscribe(this.channelName, (err, count) => {
      if (err) {
        console.error('Failed to subscribe:', err.message);
      } else {
        console.log(`Subscribed to ${count} channel(s): ${this.channelName}`);
      }
    });

    this.subscriber.on('message', (channel, message) => {
      if (channel === this.channelName) {

        this.blockchain.replaceChain(JSON.parse(message))
        callback(JSON.parse(message));
      }
    });
  }

  // Publish a message to the channel
  publish(message) {
    const messageString = JSON.stringify(message);
    this.publisher.publish(this.channelName, messageString, (err, count) => {
      if (err) {
        console.error('Failed to publish message:', err.message);
      } else {
        console.log(`Message published to ${count} subscriber(s).`);
      }
    });
  }

  broadcastChain() {
    this.publish(this.blockchain.chain);
  }

  // Close Redis connections
  close() {
    this.publisher.quit();
    this.subscriber.quit();
  }
}



// // setTimeout(() => (h.publish('hello'), 1000))
module.exports = PubSub;
