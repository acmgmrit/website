// Modules
const router = require('express').Router();

// imports
const { getEventStats, getEvents } = require('../controller/eventController');

router.get('/', (req, res) => {
    getEvents(req, res);
});

router.get('/stats', (req, res) => {
    getEventStats(req, res);
});


module.exports = router;