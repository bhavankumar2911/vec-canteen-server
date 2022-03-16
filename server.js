const app = require("express")();
const express = require("express");
const dbInstance = require("./db/instance");
const adminRouter = require("./routes/admin");

(async () => {
  try {
    await dbInstance.authenticate();
    console.log("Connected to database...");
  } catch (error) {
    console.log("Cannot connect to database: ", error);
  }
})();

(async () => {
  try {
    await dbInstance.sync({ alter: true });
    console.log("All models synchronized...");
  } catch (error) {
    console.log("Cannot synchronize models: ", error);
  }
})();

// middlewares
app.use(express.json());

// api routes
app.use("/admin", adminRouter);

const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
