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
    collection: "userSessions",
  },
  function (error) {
    if (error) {
      console.log(error);
      return next(error);
    }
  }
);

const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

//Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.MONGODB_SESSION_SECRET,
    cookie: { maxAge: 10 * 60 * 1000 },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

//Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.get("*", (req, res) => {
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
