const express = require("express");
const { createCanvas } = require("canvas");
const app = express();

// Logging middleware
app.use((req, res, next) => {
  // Get IP address
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Get current timestamp
  const timestamp = new Date().toISOString();

  // Log the request
  console.log(`[${timestamp}] IP: ${ip} - ${req.method} ${req.url}`);

  next();
});

app.get("/:text/og.png", (req, res) => {
  // Get IP and text for detailed logging
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const requestedText = decodeURIComponent(req.params.text);

  // Create canvas
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // Rest of your existing canvas code...
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const text = requestedText;
  const fontSize = 60;
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  function wrapText(text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  const maxWidth = canvas.width * 0.8;
  const lines = wrapText(text, maxWidth);
  const lineHeight = fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  const startY = (canvas.height - totalHeight) / 2 + lineHeight / 2;

  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;
    ctx.fillText(line, canvas.width / 2, y);
  });

  res.set({
    "Content-Type": "image/png",
    "Cache-Control": "public, max-age=86400",
  });

  const stream = canvas.createPNGStream();
  stream.pipe(res);
});

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
