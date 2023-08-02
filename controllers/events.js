const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate("user", "name");

    return res.json({
        ok: true,
        events,
    });
};

const getEvent = async (req, res = response) => {
    const { id } = req.params;

    const event = await Event.findById(id).populate("user", "name");

    return res.json({
        ok: true,
        event,
    });
};

const createEvent = async (req, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;

        const savedEvent = await event.save();

        res.status(201).send({
            ok: true,
            event: savedEvent,
        });
    } catch {
        res.status(500).send({
            ok: false,
            msg: "Error creating event",
        });
    }
};

const updateEvent = async (req, res = response) => {
    const { id } = req.params;
    const uid = req.uid;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).send({
                ok: false,
                msg: "Event not found",
            });
        }

        if (event.user.toString() != uid) {
            return res.status(401).send({
                ok: false,
                msg: "Unauthorized",
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        };

        const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, {
            new: true,
        });

        res.json({
            ok: true,
            event: updatedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: "Error updating event",
        });
    }
};

const deleteEvent = async (req, res = response) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).send({
                ok: false,
                msg: "Event not found",
            });
        }

        if (event.user.toString() != req.uid) {
            return res.status(401).send({
                ok: false,
                msg: "Unauthorized",
            });
        }

        await Event.findByIdAndDelete(id);

        return res.json({
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: "Error deleting event",
        });
    }
};

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
};
