import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.connect(
  "mongodb+srv://rainymasster:EToS04U49Cy7Hr3y@inforce.rxbs1.mongodb.net/"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

const productSchema = new mongoose.Schema({
  imageUrl: String,
  name: String,
  count: Number,
  size: {
    width: Number,
    height: Number,
  },
  weight: String,
  comments: [String],
});

const Product = mongoose.model("Product", productSchema);

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    const error = err as Error; // Приведення типу
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

app.patch("/api/products/:id/comments", async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) {
      res.status(400).json({ message: "Comment is required" });
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment }, },
      { new: true, timestamps:true}
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(updatedProduct);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
