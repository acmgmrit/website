'use strict'
// Modules
const router = require('express').Router();

// Data import
const events = require('../../data/events.json');


router.get('/', (req, res) => {
    res.json(events);
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let event = events.filter(event => event.id == id);
    if(event.length === 0) {
        res.json({message: "Event Not Avlailable"});
    } else {
        res.json(event[0]);
    }
});

module.exports = router