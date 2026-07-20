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
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({
      message: "Both a and b must be numbers.",
    });
  }

  res.status(200).json({
    result: a + b,
  });
});

// Only start the server when this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;