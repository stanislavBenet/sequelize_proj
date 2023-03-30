const express = require('express');
const router = require('./routes');
const app = express();

app.use(express.json());
//http://localhost:3000/api
app.use('/api', router);

/* app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).send({
      errors: [{ title: err.message }],
    });
  }
  next(err);
}); */

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({
    errors: [{ title: err.message || '2Server error' }],
  });
});
module.exports = app;
