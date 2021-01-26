// Modules
const router = require('express').Router();

// Controller Imports
const { getStats, getMembers, getMember} = require('../controller/memberController');

router.get('/', (req, res) => {
    getMembers(req, res);
});


router.get('/stats', (req, res) => {
    getStats(req, res);
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    getMember(req, res, id);
});

module.exports = router;