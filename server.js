const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
const ip = '192.168.1.6'
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
    if(data == '{}'){
      res.send(null)
    }
    else{const jsonData = JSON.parse(data);
      res.json(jsonData);}
    // console.log(data,'read')
    
  });
});

app.post('/', (req, res) => {
  // Read the existing data from 'data.json' file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
  });
    //replacing the json file
    fs.writeFile('data.json', JSON.stringify(req.body), (err) => {
      if (err) {
        console.error('Error writing data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.send('Data updated successfully');
    });
  
});