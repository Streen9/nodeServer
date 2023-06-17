import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to read data from GitHub
app.get('/api/data', async (req, res) => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Streen9/nodeServer/main/data.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// Endpoint to write data to the object and save it on GitHub
app.post('/api/data', (req, res) => {
  const newData = req.body;

  try {
    // Read the existing data from GitHub
    const readUrl = 'https://raw.githubusercontent.com/Streen9/nodeServer/main/data.json';
    fetch(readUrl)
      .then(response => response.json())
      .then(existingData => {
        // Merge the existing data with the new data
        const mergedData = { ...existingData, ...newData };

        // Write the merged data to a file
        const filePath = './data.json';
        fs.writeFileSync(filePath, JSON.stringify(mergedData));

        res.json(mergedData);
      })
      .catch(error => {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Failed to read data' });
      });
  } catch (error) {
    console.error('Error writing data:', error);
    res.status(500).json({ error: 'Failed to write data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
