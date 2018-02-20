const express = require('express');
const multer = require('multer');
const convert = require('tide-to-freeagent/lib');
const storage = multer.memoryStorage();
const upload = multer({storage});
const app = express();
const PORT = process.env.PORT || 8081;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
}

// Convert file
app.post('/api/convert', upload.single('statement'), (req, res, next) => {
  if (!req.file)
    return res.status(400).send({message: 'You must upload a file'});

  const statement = req.file;
  const options = req.body || {};

  return convert(statement.buffer, {buffer: true, ...options})
    .then(({file, filename}) => {
      res.status(201).send({
        file,
        filename,
      });
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send('Something went wrong');
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use((req, res) => {
  res.status(404).send('Oops, that page appears to be missing!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
