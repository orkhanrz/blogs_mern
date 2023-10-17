require("dotenv/config");
const express = require("express");
const app = express();
const path = require("path");
const db = require("./db/db");

const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

//Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
app.use(express.json());

//Routes
app.use('/users', userRoutes);
app.use("/blogs", blogRoutes);

//Not found page
app.use('*', (req, res, next) => {
  console.log('error')
  return res.status(404).json({message: 'Page not found :/'});
});

app.use("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  const stack = err.stack || {};
  
  return res.status(status).json({message, stack});
});

db.init(() => {
  app.listen(8000, () => {
    console.log("App runs on port 8000.");
  });
});
