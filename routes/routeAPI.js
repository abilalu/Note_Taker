const fs = require("fs");
const path = require("path");
var notesInfo = getNotes();

function getNotes() {
  let data = fs.readFileSync("./db/db.json", "UTF-8");
  // console.log(data);
  let notes = JSON.parse(data);
  for (let i = 0; i < notes.length; i++) {
    notes[i].id = "" + i;
    console.log(notes);
  }
  return notes;
}

module.exports = (app) => {

  app.get("/api/notes", (req,res) =>{
      notesInfo = getNotes();
      //converting noteData to JSON string using JSON stringfy() method
      res.json(notesInfo);
  });

  app.get("api/notes", (req,res)=>{
    notesInfo.push(req.body);
    res.json(true);
    
  });

  app.post("/api/notes", (req,res) =>{
    notesInfo.push(req.body);
    fs.writeFileSync("./db/db.json", JSON.stringify(notesInfo), "UTF-8");
    res.json(true);
  });

  app.delete("/api/notes/:id", function(req, res) {
    const newID = req.params.id;

    let note = notesInfo.filter(note => {
      return note.id === newID;
    })[0];

    const idIndex = notesInfo.indexOf(note);

    notesInfo.splice(idIndex, 1);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesInfo), "utf8");
    res.json("Note deleted");
  });

};