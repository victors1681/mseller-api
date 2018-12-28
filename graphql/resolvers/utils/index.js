const Event = require("../../../models/event");
const User = require("../../../models/user");

const getSingleEvent = async eventId => {
  try {
    const event = await Event.findOne(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const getUser = userId => async () => {
  try {
    const user = await User.findById(userId);

    return {
      ...user._doc,
      _id: user.id,
      createdEvents: getEvents(user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const getEvents = eventIds => async () => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });

    return events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date),
        creator: getUser(event.creator)
      };
    });
  } catch (err) {
    throw err;
  }
};

const transformEvent = event => ({
  ...event._doc,
  _id: event.id,
  date: new Date(event._doc.date).toISOString(),
  creator: getUser(event._doc.creator)
});

exports.getUser = getUser;
exports.getEvents = getEvents;
exports.getSingleEvent = getSingleEvent;
exports.transformEvent = transformEvent;
