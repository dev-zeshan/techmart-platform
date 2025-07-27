const express = require("express");
const cors = require("cors"); // ✅ Add this
const product = require("./routes/product");
const user = require("./routes/users");
const order = require("./routes/order");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

// ✅ Use CORS before other middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // optional - needed if you’re using cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/order", order);

app.all("*", (req, res, next) => {
  throw new Error("this path not found");
});

app.use(errorHandler);

module.exports = app;
