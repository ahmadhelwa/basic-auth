'use strict';

require('dotenv').config();


let PORT = process.env.PORT || 3030;




const express = require('express');
const signUpRouter = require('./routes/signUp.route');
const signInRouter = require('./routes/signIn.route');
const notFoundHandler = require('./error/404');
const errorHandler = require('./error/500');
const app = express();




app.use(express.json());
app.use(signUpRouter);
app.use(signInRouter);
app.use('*', notFoundHandler);
app.use(errorHandler);






function start(port) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = {
  app: app,
  start: start
};