const { Schema, model } = require("mongoose");

const EventSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

EventSchema.methods.toJSON = function () {
    const { __v, _id, ...event } = this.toObject();
    event.id = _id;
    return event;
};

module.exports = model("Event", EventSchema);
