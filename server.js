// Dependencies
const express = require('express');
const path = require('path');
const { clog } = require('middleware/clog.js');

// Express App
const PORT = 0000;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));


app.get('/api/notes', (req, res) => {
    // GET /api/notes should read the db.json file and return all saved notes as JSON.
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
    // POST /api/notes should receive a new note to save on the request body, add it to the db.json file

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text
        }
// must give the new note a unique ID (npm package)
// must return new note to the client
        readAndAppend(newNote, 'db/db.json');
        res.json('Note added successfully!');
    } else {
        res.error('Error in adding note. Please try again');
    }   
});



// GET ('*'); at the bottom of the page
// just captures anything that is not defined as a valid route
// like localhost:3000/blablabla




// The following HTML routes should be created:
    // GET /notes should return the notes.html file. DONE
    // GET * should return the index.html file.


// The following API routes should be created:
    // GET /api/notes should read the db.json file and return all saved notes as JSON.
    // POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

// data persistence