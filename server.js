const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;


const app = express();
const apiRoutes = require("./api");
const serverController = require("./controllers/serverController.js")

app.use(express.static(path.join(__dirname, './client/build')));
app.use(express.json());

//server controller
app.get("/server", serverController.getDetails)
app.post("/server", serverController.setRSAKeys)


app.use("/api", apiRoutes);

app.get('*', function(_, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
  
app.listen(port);


