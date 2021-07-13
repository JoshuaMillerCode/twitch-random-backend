require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const PORT = process.env.PORT || '3001'
const cors = require('cors')

app.use(cors())

const headers = {
  "Accept": "application/json",
  "Client-ID": process.env.CLIENT_ID,
  "Authorization": `Bearer ${process.env.TOKEN}`
}

app.get('/streams', async (req, res) => {
  try {
    const response = await axios.get('https://api.twitch.tv/helix/streams?language=en', {
      headers: headers,
    })
    if(response.data) {
      const data = response.data.data
      const result = data[Math.floor(data.length * Math.random())]
      res.send({
        stream: result,
        pagination_cursor: response.data.pagination.cursor
      })
    }

  } catch(err) {
    console.error(err)
  }
})



app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})