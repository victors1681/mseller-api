const { transformEvent } = require("./utils");
const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();

      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
      console.log(err);
    }
  },

  createEvent: async args => {
    const { title, description, price, date } = args.eventInput;

    const event = new Event({
      title,
      description,
      price,
      date: new Date(date),
      creator: "5c25150e65e7c32c1e2e53d2"
    });

    try {
      const result = await event.save();

      const createdEvent = transformEvent(result);

      const user = await User.findById("5c25150e65e7c32c1e2e53d2");

      if (!user) {
        throw new Error("Don't have user");
      }

      user.createdEvents.push(event);
      await user.save();

      return createdEvent;
    } catch (err) {
      throw err;
    }
  }
};
