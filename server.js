const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  // Read the data from 'data.json' file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.post('/', (req, res) => {
  // Read the data from 'data.json' file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const jsonData = JSON.parse(data);

    // Modify the data as needed based on the request body
    // For example, you can update a specific property in the JSON data
    jsonData.property = req.body.newValue;

    // Write the modified data back to 'data.json' file
    fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error('Error writing data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.send('Data updated successfully');
    });
  });
});
