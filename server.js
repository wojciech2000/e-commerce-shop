require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/User");
const productRouter = require("./routes/Product");

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_URI || process.env.MONGODB_LOCAL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected with DB")
);

app.use(cookieParser());
app.use(express.json(), express.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/uploads", express.static("uploads"));
app.use((error, req, res, next) => {
  console.log(error);
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
