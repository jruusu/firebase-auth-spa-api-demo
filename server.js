const express = require('express')

const app = express()
const port = process.env.PORT || '3000'

app.get('/config', (req, res) => res.json({
  firebase: {
    webApiKey: process.env.FIREBASE_WEB_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }
}))

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
