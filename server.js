// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { default: ShortUniqueId } = require('short-unique-id');
const shortUniqueId = require('short-unique-id');
const { readAndAppend, readFromFile } = require('./helper/fsUtils.js');


// Express App
const PORT = process.env.PORT || 3001;
const app = express();
const uid = new ShortUniqueId( {length: 3} );


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes (get)


app.get('/api/notes', (req, res) => {

    console.log("test")
    // GET /api/notes should read the db.json file and return all saved notes as JSON.
    readFromFile('./db/db.json').then((data) => {
        console.log(JSON.parse(data));
        res.json(JSON.parse(data))
    });
     
});

// Routes (post)
app.post('/api/notes', (req, res) => {
    // POST /api/notes should receive a new note to save on the request body, add it to the db.json file

    // destructuring assignment for the items in req.body
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            // must give the new note a unique ID (short unique id npm package) Saved under id
            note_id: uid(),
        }
// must return new note to the client
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully!');
    } else {
        res.error('Error in adding note. Please try again');
    }   
});


// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
// app.delete(/api/notes/:note_id, (req, res) => {

// });


// GET ('*'); at the bottom of the page - should return the index.html file
// just captures anything that is not defined as a valid route
// like localhost:3000/blablabla


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));