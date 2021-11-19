const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require('path');

const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});