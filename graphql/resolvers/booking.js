const Event = require("../../models/event");
const Booking = require("../../models/booking");
const { getUser, getSingleEvent } = require("./utils");

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        console.log(booking._doc.event);
        return {
          ...booking._doc,
          _id: booking.id,
          user: getUser(booking._doc.user),
          event: getSingleEvent(booking._doc.event),
          createAt: new Date(booking._doc.createdAt).toISOString(),
          updateAt: new Date(booking._doc.updatedAt).toISOString()
        };
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async args => {
    try {
      const { eventId } = args;

      const fetchedEvent = await Event.findOne({ _id: eventId });

      const booking = new Booking({
        user: "5c25150e65e7c32c1e2e53d2",
        event: fetchedEvent
      });

      const result = await booking.save();
      return {
        ...result._doc,
        _id: result.id,
        user: getUser(result._doc.user),
        event: getSingleEvent(result._doc.event),
        createAt: new Date(result._doc.createdAt).toISOString(),
        updateAt: new Date(result._doc.updatedAt).toISOString()
      };
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById({ _id: args.bookingId }).populate(
        "event"
      );
      const event = transformEvent(booking.event);

      Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
