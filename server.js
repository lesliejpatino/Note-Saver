const express = require('express');
const path = require('path');
const { clog } = require('middleware/clog.js');


const PORT 
const app = express();







// GET ('*'); at the bottom of the page
// just captures anything that is not defined as a valid route
// like localhost:3000/blablabla




// The following HTML routes should be created:
    // GET /notes should return the notes.html file.
    // GET * should return the index.html file.


// The following API routes should be created:
    // GET /api/notes should read the db.json file and return all saved notes as JSON.
    // POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).