var express = require("express");
const fs = require("fs");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// gets json notes
function getNotes(){
  return JSON.parse(fs.readFileSync("db.json"))
}
// // path to home
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"/public/index.html"));
});
// // path to notes
app.get("/notes",function(req,res){
  res.sendFile(path.join(__dirname,"/public/notes.html"));
});

// //gets notes from api/notes
app.get("/api/notes",function(req,res){
  var Notes = getNotes();
  res.json(Notes);
});

// // user gives input, stick it in db
app.post("/api/notes",function(req,res){
  var Inputs = getNotes().concat(req.body);
  fs.writeFile("db.json",JSON.stringify(Inputs),function(err){
    if (err) 
      {throw err;}
      res.json("success");
  });
});




app.use(express.static(path.join(__dirname, '/public')));
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
