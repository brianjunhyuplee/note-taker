const { text } = require("body-parser");
var express = require("express");
const fs = require("fs");
const { get } = require("http");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// path to index.html
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"/public/index.html"));
});
// path to notes.html
app.get("/notes",function(req,res){
  res.sendFile(path.join(__dirname,"/public/notes.html"));
});




// gets json notes
function getNotes(){
  return JSON.parse(fs.readFileSync("db.json"));
}

// gets notes from api/notes
app.get("/api/notes",function(req,res){
  var Notes = getNotes();
  //console.log(Notes);
  res.json(Notes);
});

// user gives input, stick it in db
app.post("/api/notes",function(req,res){
  const rand = Math.floor(Math.random()*1000);
  const input=
  {
    id: rand,
    title: req.body.title,
    text: req.body.text
  }
  var Inputs = getNotes().concat(input);
  fs.writeFile("db.json",JSON.stringify(Inputs),function(err){
    if (err) 
      {throw err;}
      res.json("success");
  });

  // deletes
  // function deleteNote(res){
  //   var Notes = getNotes();
  //   Notes.filter(note => note.body.id !== res.body.id)
  // }
  app.delete("api/notes/547",function(req,res){
    console.log("in app delete");
    console.log("about to filter");
    var Notes = getNotes();
    Notes.filter(note => note.body.id !== req);

    // res.json(Notes[0]);
  })
});




app.use(express.static(path.join(__dirname, '/public')));
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
