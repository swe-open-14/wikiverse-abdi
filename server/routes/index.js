const { db } = require('.././db')
const express = require("express");
const app = express();
// different model routers

const pagesRouter = require("./wiki");
const userRouter = require("./users");

app.use('/wiki', pagesRouter);
app.use('/users', userRouter);

module.exports = app;
