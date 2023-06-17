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
const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Export the Express API
module.exports = app


// index.js
// const express = require('express')

// const app = express()
// const PORT = 4000

// app.listen(PORT, () => {
//   console.log(`API listening on PORT ${PORT} `)
// })

// app.get('/', (req, res) => {
//   res.send('Hey this is my API running 🥳')
// })

// app.get('/about', (req, res) => {
//   res.send('This is my about route..... ')
// })

// // Export the Express API
// module.exports = app