const Player = require('../modules/playersModule')
const { getPostData } = require('../utils')

async function getPlayers(req,res) {
    try {
        const players = await Player.findAll()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(players))

    } catch (error) {
        console.log(error)
    }
}

async function getPlayer(req,res) {
    try {
        const id = req.url.split('/')[3]
        const player = await Player.find(id)
        if (!player) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: `Player Not found with id = ${id}`}))
        }
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(player))
    } catch (error) {
        console.log(error)
    }
}

async function createPlayer(req, res) {
    try {
        let body = getPostData(req)

        const { 
            firstName,
            lastName,
            teams,
            retired,
            nacionality
        } = JSON.parse(body)

        const player = {
            firstName,
            lastName,
            teams,
            retired,
            nacionality
        }
        const newPlayer = await Player.createPlayer(player)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(newPlayer))
        
        

    } catch (error) {
        console.log(error)
    }
}

async function updatePlayer(req, res) {
    try {
        const id = req.url.split('/')[3];
        const player = await Player.find(id)
        
        if(!player) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Player Not Found' }))
        } else {
            const body = await getPostData(req)

            const { 
                firstName,
                lastName,
                teams,
                retired,
                nacionality
             } = JSON.parse(body)

            const playerData = {
                firstName: firstName || player.firstName,
                lastName: lastName || player.lastName,
                teams: teams || player.teams,
                retired: retired || player.retired,
                nacionality: nacionality || player.nacionality
            }

            const updateProduct = await Player.updatePlayer(id, playerData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(updateProduct)) 
        }
    } catch (error) {
        console.log(error)
    }
}

async function deletePlayer(req, res) {
    try {
        const id = req.url.split('/')[3];
        const player = await Player.find(id)

        if(!player) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Player Not Found' }))
        } else {
            await Player.deletePlayer(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Player ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer
}
