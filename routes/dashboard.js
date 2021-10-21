const router = require('express').Router();

router.post('/', (req, res) => {
  res.json({
    error: null,
    data: {
      title: '🔒 Mi ruta protegida',
      user: req.user
    }
  })

})

module.exports = router