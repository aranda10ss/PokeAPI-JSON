const fs = require('fs')
const path = require('path')

const jsonFile = path.join(__dirname, '../..', 'data/pokemon.json')

const getPokemons = () => {
	const data = fs.readFileSync(jsonFile)
	return JSON.parse(data)
}

const savePokemons = pokemons => {
	fs.writeFileSync(jsonFile, JSON.stringify(pokemons, null, 2))
}

module.exports = {
	getPokemons,
	savePokemons,
}
