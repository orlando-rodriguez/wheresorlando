const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const port = parseInt(process.env.PORT || 5000);
const cors = require('cors');


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

const basic_information = require('./routes/basic_information');
const comments = require('./routes/comments');

app.use('/basic_information', basic_information);
app.use('/comments', comments);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: req.app.get("env") === "development" ? err.stack : {}
    });
});

app.listen(port)
  .on('error',     console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on ' + port));
