const express = require("express");
const cors = require('cors');

const sqlite3 = require('sqlite3');

const port = 8000

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = new sqlite3.Database('NovelSite.sqlite3');

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})

app.get("/", function (req, res) {
  res.send("Welcome");
});

app.get("/bye", function (req, res) {
  res.send("Good Bye!");
});

app.get("/morning", function (req, res) {
  res.send("Good morning!!!");
});

app.get("/GetLanguage", (req, res) => {
  db.all("select * from Language", [], (err, rows) => {
    if (err) {
      res.status(400).json({
        "status": "error",
        "message": err.message
      });
      return;
    } else {
      res.status(200).json({
        "status": "OK",
        "members": rows
      });
    }
  })
});

app.get("/GetLanguage/:lang_id", (req, res) => {
  const lang_id = req.params.lang_id;
  db.get("select * from Language where lang_id = ?", lang_id, (err, row) => {
    if (err) {
      res.status(400).json({
        "status": "error",
        "message": err.message
      });
      return;
    } else {
      res.status(200).json({
        "status": "OK",
        "members": row
      });
    }
  })
});

