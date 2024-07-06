const express = require('express')
const { getPokemons, savePokemons } = require('../../utils/db')

const router = express.Router()

router.get('/pokemons', async (_, res) => {
	try {
		const pokemons = await getPokemons()
		res.json(pokemons)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

router.get('/pokemons/:id', async (req, res) => {
	try {
		const pokemons = await getPokemons()
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

router.post('/pokemons', async (req, res) => {
	try {
		const { name } = req.body
		const newPokemon = await savePokemons(name)
	
		res.status(201).json(newPokemon)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

module.exports = router
