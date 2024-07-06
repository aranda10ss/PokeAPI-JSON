const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getPokemons = async () => {
	const pokemons = await prisma.pokemon.findMany()
	console.log(pokemons)
	return pokemons
}

const savePokemons = async (name) => {
	console.log(name)
	await prisma.pokemon.create({
		data: {
			name,
		},
	})
}
module.exports = {
	getPokemons,
	savePokemons,
}
