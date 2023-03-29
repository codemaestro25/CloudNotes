const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors');


connectToMongo();
const app = express()
const port = 5000

app.use(cors()); // used to resolve the browser cors policy error
app.use(express.json())//middleware required for using req.body

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Cloud Notes listening on port ${port}`)
})