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

app.get('/pokemons/:id', (req, res) => {
  const pokemons = getPokemons()
  const pokemonId = parseInt(req.params.id, 10)
  const pokemon = pokemons.find(p => p.id === pokemonId)

  if (!pokemon) {
    return res.status(404).json({ error: 'pokemont not found'})
  }

  res.json(pokemon)
})

app.post('/pokemons', (req, res) => {
  try {
    const pokemons = getPokemons()
    const newPokemon = {...req.body, id: pokemons.length + 1 }
    
    if(!newPokemon.id || newPokemon.name) {
      return res.status(400).json({ error: 'Invalid request' })
    }

    pokemons.push(newPokemon)
  
    fs.writeFileSync(path.join(__dirname, '..', 'data/pokemon.json'), JSON.stringify(pokemons, null, 2))
  
    res.status(201).json(newPokemon)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})