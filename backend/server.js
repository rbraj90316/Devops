const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Item= require("./models/Item");
const mongoose=require('mongoose');
dotenv.config();
const PORT=process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://devops-backend-1.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));
  app.options("*", cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
// Routes
app.get("/", (req, res) => {
  res.json({ message: "Backend running successfully 🚀" });
});



// Register route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Item.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await Item.create({ name, email, password });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/login",async(req,res)=>{
  const {email, password}=req.body;
  if(!email || !password){
    return res.status(400).json({message:"Fill up requirement!"})
  }
  const user=await Item.findOne({email});
 if(!user){
  return res.status(404).json({message:"User not found"});

 }
 if(user.password != password){
  return res.status(401).json({message:"Invalid credential"});
 }
 res.status(200).json({
  message:"User Login Successfully",
user:  {id:user._id,
  name:user.name,
  email:user.email,
  createAt:user.createdAt,
  password:user.password,
  name:user.name
},
 })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
