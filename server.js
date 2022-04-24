if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const dbInstance = require("./db/instance");
const adminRouter = require("./routes/admin");
const menuRouter = require("./routes/menu");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userAuth = require("./middlewares/userAuth");
const sendPasswordResetMail = require("./controllers/passwordReset/sendResetMail");
const resetPassword = require("./controllers/passwordReset/resetPassword");

const app = express();

(async () => {
  try {
    await dbInstance.authenticate();
    console.log("Connected to database...");
  } catch (error) {
    console.log("Cannot connect to database: ", error);
  }
})();

// (async () => {
//   try {
//     await dbInstance.sync({ alter: true, force: true });
//     console.log("All models synchronized...");
//   } catch (error) {
//     console.log("Cannot synchronize models: ", error);
//   }
// })();

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
app.use("/menu", menuRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);
app.get("/user-auth", userAuth);
app.post("/generate-password-reset-id", sendPasswordResetMail);
app.patch("/reset-password/:id", resetPassword);

const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
