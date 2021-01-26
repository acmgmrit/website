// Modules
const express = require('express');
const app = express();
const server = require('http').Server(app);

// Imports
const members = require('./data/members');


// Configuration
app.set('view engine', 'ejs');


// Middleware

// Body-Parser
app.use(express.urlencoded({ extended: true }));

// Constants
const PORT = process.env.PORT || 3000;


// @set Static Route for public
app.use(express.static('./public'));

// @Route for members API GET /api/members
app.use('/api/members', require('./router/api/members'));

// @Route for members
app.use('/members', require('./router/members'));

// @Route for events API GET /api/events
app.use('/api/events', require('./router/api/events'));

// @Route for events
app.use('/events', require('./router/events'));

// @Register route | GET /register/sig
app.use('/register', require('./router/register'));

server.listen(PORT, () => {
    console.log(`ACM Server started running @${PORT}`);
});
