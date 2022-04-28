const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout.js");
const app = express();
// parses url-encoded bodies
const { db } = require("./models");
const wikiRouter = require("./routes/wiki.js");
const userRouter = require("./routes/users.js");

const PORT = 1337;
app.use(express.urlencoded({ extended: false }));
// app.use(express.json())
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use("/wiki", wikiRouter);

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

const init = async () => {
  await db.sync();
  app.listen(PORT, () => {
    console.log(`App listening in port http://localhost:${PORT}`);
  });
};

init();
