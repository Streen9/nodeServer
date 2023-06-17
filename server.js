const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const ipAddress = '192.168.1.6';

const app = express();
app.use(cors())
app.use(bodyParser.json());

// Define the API endpoints
app.get('/api/data', (req, res) => {
  // Read the data from the JSON file and send it as a response
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  res.json(data);
  res.send('api working')
});

app.post('/api/data', (req, res) => {
  // Save the posted data to the JSON file
  const newData = req.body;
  fs.writeFileSync('data.json', JSON.stringify(newData));
  res.json({ message: 'Data saved successfully' });
  res.send('This is my about route..... ')
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
