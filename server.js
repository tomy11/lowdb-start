const express = require("express");
const bodyParser = require("body-parser");

const port = 5000;
const userRour = require("./routes/Users");

const app = express();
app.use(bodyParser.json());
app.use('/api', userRour)

app.listen(port,()=> console.log(`Server app listening on http://127.0.0.1:${port}!`));