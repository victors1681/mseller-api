const { PubSub } = require("graphql-subscriptions");

const pubSub = new PubSub();

const subscribers = {
  USER_ADDED: "USER_ADDED"
};

const notify = {
  USER_ADDED: data => pubSub.publish(subscribers.USER_ADDED, data)
};

module.exports.subscriptions = {
  Subscription: {
    userAdded: {
      subscribe: () => pubSub.asyncIterator(subscribers.USER_ADDED)
    }
  }
};

module.exports.notify = notify;
