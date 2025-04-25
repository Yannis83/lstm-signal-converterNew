const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.get('/api/msft', async (req, res) => {
  try {
    const response = await fetch('https://opensheet.vercel.app/1Seu4KHSGRNVnxUw7cISUOqkzRKNat6bQDkJy8rbf8to/Sheet1');
    const data = await response.json();

    const signalTimes = data.map(entry => parseInt(entry.epoch));
    const signalLabels = data.map(entry => `"${entry.label}"`);

    const pineScript = `signalTimes = array.from(${signalTimes.join(', ')})
signalLabels = array.from(${signalLabels.join(', ')})`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(pineScript);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}/api/msft`);
});
