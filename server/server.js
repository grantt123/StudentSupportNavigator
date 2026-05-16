const express = require('express')
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv')
const supabaseClient = require('@supabase/supabase-js')

dotenv.config()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {q: query, format: 'json', viewbox: '-76.955,38.980,-76.930,39.000', bounded: 1, limit: 10},
        headers: {'User-Agent': 'StudentSupportNavigator/1.0'}
      }
    )
    res.json(response.data)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Search failed'
    })
  }
})

app.get('/api/favorites', async (req, res) => {
  try {
    const {data, error} = await supabase.from('favorites').select('*')

    if (error) {
      console.log(error)
      return res.status(500).json(error)
    }
    res.json(data)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Failed to get favorites'
    })
  }
})

app.post('/api/favorites', async (req, res) => {
  try {
    const {name, latitude, longitude, category} = req.body
    console.log(req.body)

    const {data, error} = await supabase.from('favorites').insert([{name, latitude, longitude, category}]).select()

    if (error) {
      console.log(error)
      return res.status(500).json(error)
    }
    res.json(data)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Failed to save favorite'
    })
  }
})

app.delete('/api/favorites/:id', async (req, res) => {
    try {
      const id = req.params.id

      const {error} = await supabase.from('favorites').delete().eq('id', id)

      if (error) {
        console.log(error)
        return res.status(500).json(error)
      }

      res.json({
        message: 'Favorite deleted'
      })

    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: 'Delete failed'
      })
    }
  }
)

if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`))
}

module.exports = app;