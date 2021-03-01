const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const apiRoutes = require("./api");

const app = express();

app.use(express.static(path.join(__dirname, './client/build')));

app.use("/api", apiRoutes);

app.get('*', function(_, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);