const express = require('express');

const app = express();
const PORT = 3000;

// This is required
app.use(express.json());

// Route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return res.status(400).json({
      message: "Both a and b must be numbers.",
    });
  }

  res.status(200).json({
    result: num1 + num2,
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});