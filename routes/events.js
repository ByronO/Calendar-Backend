/*
    Events Routes
    host + /api/events
*/

const { Router } = require('express');
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validateJWT);

//Get events
router.get('/', getEvents);

//Get event
router.get('/:id', getEvent);

//Create event
router.post('/',
    [// middlewares
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        validateFields
    ], 
    createEvent
);

//Update event
router.put('/:id', updateEvent);

//Delete event
router.delete('/:id', deleteEvent);

module.exports = router;
