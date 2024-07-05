const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3000

app.use(express.json())

const getPokemons = () => {
  const data = fs.readFileSync(path.join(__dirname, '..', 'data/pokemon.json'))
  return JSON.parse(data)
}

app.get('/', (_, res) => {
  res.send('Hello, World!')
})

app.get('/pokemons', (_, res) => {
  const pokemons = getPokemons()
  res.json(pokemons)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})