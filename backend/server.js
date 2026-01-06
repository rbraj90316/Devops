    const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Backend running successfully 🚀" });
});
app.post('/register')

app.listen(5000, () => console.log("Backend running on port 5000"));
