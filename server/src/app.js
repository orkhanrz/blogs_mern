require("dotenv/config");
const express = require("express");
const app = express();
const path = require("path");
const db = require("./db/db");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore(
  {
    uri: process.env.MONGODB_URI,
    databaseName: "blogs",
    collection: "mySessions",
  },
  function (error) {
    console.log(error);
  }
);

const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

//Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.MONGODB_SESSION_SECRET,
    cookie: { maxAge: 60 * 1000 },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

//Routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

//Not found page
app.use("*", (req, res, next) => {
  console.log("error");
  return res.status(404).json({ message: "Page not found :/" });
});

app.use("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const stack = err.stack || {};

  console.log(err);

  return res.status(status).json({ message, stack });
});

db.init(() => {
  app.listen(8000, () => {
    console.log("App runs on port 8000.");
  });
});
