const express = require("express");
const mongoose = require("mongoose");
const uri = require("../atlas_uri");
const bodyParser = require("body-parser");
// require("dotenv").config();

const app = express();

// const sessionMiddleware = require("./modules/session-middleware");
// const passport = require("./strategies/user.strategy");
const port = 3000;

// Route includes
const usersRouter = require("./routes/users.router")

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
// app.use(sessionMiddleware);

// start up passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

// Connect to the MongoDB Atlas database
mongoose.connect(
  `${uri}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Schema


//Routes 
app.use("/users", usersRouter);


//endpoint
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});









/* Routes */
// app.use("/api/user", userRouter);
// app.use("/api/survey", surveyResponsesRouter);
// app.use("/api/emergencies", emergenciesRouter);
// app.use("/api/events", eventsRouter);
// app.use("/api/injuries", injuriesRouter);

// Serve static files
// app.use(express.static("build"));

// App Set //
// const PORT = process.env.PORT || 5000;

/** Listen * */
// app.listen(PORT, () => {
//   console.log(`Listening on port: ${PORT}`);
// });
