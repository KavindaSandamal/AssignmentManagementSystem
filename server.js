const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use('/uploads', express.static('uploads'));
app.get('/submitted-assignments', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads'); // Replace 'uploads' with your folder name
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return res.status(500).send('Internal Server Error');
      }
      // Send the list of submitted files to the client
      res.json({ submittedFiles: files });
    });
  });

//import routes
const postRoutes = require('./routes/posts');
const moduleRoutes = require('./routes/modules');
const assignmentRoutes = require('./routes/assignments');
const submissionRoutes = require('./routes/submissions');


//app midlware
app.use(bodyParser.json());
app.use(cors());

//route midleware
app.use(postRoutes);
app.use(moduleRoutes);
app.use(assignmentRoutes);
app.use('/submissions', submissionRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://kavindasandamal:Kavinda899@cluster0.2wncwjp.mongodb.net/mernCrud?retryWrites=true&w=majority';

mongoose.connect(DB_URL)
.then(() =>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connction error',err));


app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});
