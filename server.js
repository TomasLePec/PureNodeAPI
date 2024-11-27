const http = require('http')
const { getPlayers, getPlayer, createPlayer, updatePlayer, deletePlayer } = require('./controllers/playersController')

const PORT = process.env.PORT || 3031

const server = http.createServer((req, res) => {
    if (req.url === '/api/players' && req.method === "GET") {
        getPlayers(req, res)
    } else if (req.url.match(/\/api\/players\/([a-zA-Z0-9]+)/) && req.method === "GET") {
        getPlayer(req, res)
    } else if (req.url === '/api/players' && req.method === 'POST') {
        createPlayer(req, res)
    } else if (req.url.match(/\/api\/players\/([a-zA-Z0-9]+)/) && req.method === 'PUT') {
        updatePlayer(req, res)
    } else if (req.url.match(/\/api\/players\/([a-zA-Z0-9]+)/) && req.method === 'DELETE') {
        deletePlayer(req, res)
    }
    else {
        res.writeHead(404, {"Content-type": "application/json"})
        res.end(JSON.stringify({message: `${req.url} NOT FOUND`}))
    }
})

server.listen(PORT, () => {console.log(`Server running on PORT ${PORT}`)})
