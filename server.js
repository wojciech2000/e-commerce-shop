const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req,res) => res.send('XDD'))

app.listen(PORT, ()=> console.log(`app is running on port ${PORT}`))