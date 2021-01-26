// Module Imports
const router = require('express').Router();

// Controller imports
const { sig, handle_sig }  = require('../controller/sig');


// @Route GET /register/sig
router.get('/sig', (req, res) => {
    sig(req, res);
});

// @Route POST /register/sig
router.post('/sig', (req, res) => {
    handle_sig(req, res);
});

module.exports = router;