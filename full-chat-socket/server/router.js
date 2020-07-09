const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('O servidor está rodando')
})

module.exports = router