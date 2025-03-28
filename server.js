const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(bodyParser.json());

const url = "mongodb://localhost:27017/mydb";

mongoose
  .connect(url)
  .then((res) => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const customerSchema = mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
    index: true,
  },
});
const Customer = mongoose.model("Customer", customerSchema);

const ageCheck = async (req, res, next) => {
  try {
    const check = req.body.age === 26 ? true : false;
    console.log(check);
    next();
  } catch (error) {
    console.log(error);
  }
};
app.post("/", ageCheck, async (req, res) => {
  try {
    const { name, age } = req.body;
    const customer = new Customer({ name, age });
    const saveCustomer = await customer.save();
    res.status(200).json(saveCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.get("/ping", (req, res) => {
  res.status(200).send("ALive");
});

app.listen(5000, () => {
  console.log("Connected");
});
