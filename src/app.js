const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const jsonFile = path.join(__dirname, '..', 'data/pokemon.json')

app.use(express.json())

const getPokemons = () => {
  const data = fs.readFileSync(jsonFile)
  return JSON.parse(data)
}

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
    const newPokemon = { id: pokemons.length + 1, ...req.body }
    
    if(!newPokemon.id || !newPokemon.name) {
      return res.status(400).json({ error: 'Invalid request' })
    }

    pokemons.push(newPokemon)
  
    fs.writeFileSync(jsonFile, JSON.stringify(pokemons, null, 2))
  
    res.status(201).json(newPokemon)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = app