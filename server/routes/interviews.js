const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Interviews route');
});

module.exports = router;
