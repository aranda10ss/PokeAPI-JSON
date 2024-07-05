const express = require('express')
const { getPokemons, savePokemons } = require('../../utils/pokeManager')

const router = express.Router()

router.get('/pokemons', (_, res) => {
	try {
		const pokemons = getPokemons()
		res.json(pokemons)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

router.get('/pokemons/:id', (req, res) => {
	try {
		const pokemons = getPokemons()
		const pokemonId = Number.parseInt(req.params.id, 10)
		const pokemon = pokemons.find(p => p.id === pokemonId)

		if (!pokemon) {
			return res.status(404).json({ error: 'Pokemon not found' })
		}

		res.json(pokemon)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

router.post('/pokemons', (req, res) => {
	try {
		const pokemons = getPokemons()
		const newPokemon = { id: pokemons.length + 1, ...req.body }

		if (!newPokemon.id || !newPokemon.name) {
			return res.status(400).json({ error: 'Invalid request' })
		}

		pokemons.push(newPokemon)
		savePokemons(pokemons)

		res.status(201).json(newPokemon)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

module.exports = router
