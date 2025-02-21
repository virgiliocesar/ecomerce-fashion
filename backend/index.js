const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;
const url = process.env.MONGO_DB;

// Middleware setup
app.use(express.json({limit: "25mb",}));
app.use(express.urlencoded({limit: "25mb",}));
app.use(cookieParser({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


//all routes
const authRules = require("./src/users/user.route");



// const userRules = require("./routes/user");
// const productRules = require("./routes/product");
// const cartRules = require("./routes/cart");
// const orderRules = require("./routes/order");

app.use("/api/auth", authRules);
// app.use("/api/user", userRules);
// app.use("/api/product", productRules);
// app.use("/api/cart", cartRules);
// app.use("/api/order", orderRules);




main()
  .then(() => console.log("conectado ao MongoDB com sucesso"))
  .catch((err) => console.log(err));

// Connect to MongoDB database
async function main() {
  await mongoose.connect(url);
}

app.get("/", (req, res) => {
  res.send("Fashion E-commerce Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
