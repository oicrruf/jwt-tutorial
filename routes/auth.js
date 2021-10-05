const router = require('express').Router();

router.post('/register', async (req, res) => {
  res.json({
    error: null,
    data: 'register endpoint'
  })
})

module.exports = router;