const router = require('express').Router();

router.post('/convert', (req, res, next) => {
  res.status(201).send('heres the file');
});

module.exports = router;
