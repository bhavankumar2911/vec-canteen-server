if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const dbInstance = require("./db/instance");
const adminRouter = require("./routes/admin");
const menuRouter = require("./routes/menu");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth = require("./middlewares/auth");

const app = express();

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
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

// api routes
app.use("/admin", adminRouter);
app.use("/menu", auth, menuRouter);
app.use("/user", userRouter);

const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
