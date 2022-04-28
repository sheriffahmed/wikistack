const express = require("express");
const morgan = require('morgan');
const layout =  require("./views/layout.js")
const app = express();
// parses url-encoded bodies

const PORT = 1337;
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

app.get('/', (req, res) =>{

  res.send(layout());
});


app.listen(PORT, () => {
  console.log(`App listening in port http://localhost:${PORT}`);
});



