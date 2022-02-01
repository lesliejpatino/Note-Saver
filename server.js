// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { default: ShortUniqueId } = require('short-unique-id');
const shortUniqueId = require('short-unique-id');
const { readAndAppend, writeToFile, readFromFile } = require('./helper/fsUtils.js');


// Express App
const PORT = process.env.PORT || 3001;
const app = express();
const uid = new ShortUniqueId({ length: 3 });


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes (get)

// GET /api/notes read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        console.log(JSON.parse(data));
        res.json(JSON.parse(data))
    });

});

// Routes (post)
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file
app.post('/api/notes', (req, res) => {
    // destructuring assignment for the items in req.body
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uid(),
        }
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully!');
    } else {
        res.error('Error in adding note. Please try again');
    }
});


// DELETE a note
app.delete('/api/notes/:id', (req, res) => {
    console.log("delete id request", req.params.id);

    readFromFile('db/db.json').then((jsonString) => {
        const noteData = JSON.parse(jsonString);
        var removeNote = noteData
            .map(function (item) {
                return item.id;
            })
            .indexOf(req.params.id);

        if (removeNote === -1) {
            res.statusCode = 404;
            return res.send("error404");
        }

        var result = noteData.splice(removeNote, 1);
        writeToFile("db/db.json", noteData);
        res.json("Note deleted successfully");
    })
});


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));