const { PrismaClient } = require('@prisma/client')
const path = require('path')
const fs = require('fs')

const prisma = new PrismaClient()
const jsonFile = path.join(__dirname, '..', 'data/pokemon.json')

const main = async () => {
	const data = fs.readFileSync(jsonFile, 'utf8')
	const pokemons = JSON.parse(data)

	await prisma.$transaction(async prisma => {
		await prisma.pokemon.createMany({
			data: pokemons,
		})
	})
}

main()
