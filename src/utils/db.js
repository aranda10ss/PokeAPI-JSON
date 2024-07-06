const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getPokemons = async () => {
	const pokemons = await prisma.pokemon.findMany()
	console.log(pokemons)
	return pokemons
}

module.exports = {
	getPokemons,
}
