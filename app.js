const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const giftExchange = require("./routes/gift-exchange");
// const error = require("./utils/errors");
const { NotFoundError } = require("./utils/errors");
// const port = 3000

// app.use(bodyParser.json());
app.use(morgan("tiny")); // tiny: short condensed version. common: longer version of info
app.use("/gift-exchange", giftExchange);
app.get("/", async (req, res, next) => {
  res.status(200).send({ ping: "pong" });
});

// Define a middleware handler after all other middleware, routes, etc in the application
app.use((err, req, res, next) => {
  // extract the status and message properties from the error argument.
  // If no valid status exists, it should default to 500
  // If no valid message exists, it should default to
  return res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
});
app.use(async (rec, res, next) => {
  return next(new NotFoundError());
});
module.exports = app;
