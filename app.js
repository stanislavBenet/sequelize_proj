const express = require('express');
const router = require('./routes');
const app = express();

app.use(express.json());
//http://localhost:3000/api
app.use('/api', router);

app.use((err, req, res, next) => {
  res.status(500).send({
    errors: [{ title: err.message }],
  });
  next(err)
});
module.exports = app;
