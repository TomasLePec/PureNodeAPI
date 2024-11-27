const players = require('../players.json')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(players)
    })
}

function find(id) {
    return new Promise((resolve, reject) => {
        const player = players.find((p) => p.id == id)
        resolve(player)
    })
}

function createPlayer(playerData) {
    return new Promise((resolve, reject) => {
        const newPlayer = { id: uuidv4() ,...playerData}
        players.push(newPlayer)
        writeDataToFile('./players.json', players)
        resolve(newPlayer)
    })
}

function updatePlayer(id, playerData) {
    return new Promise((resolve, reject) => {
        const index = players.findIndex((p) => p.id == id)
        players[index] = {id, ...playerData}
        writeDataToFile('./players.json', players)
        resolve(players[index])
    })
}

function deletePlayer(id) {
    return new Promise((resolve, reject) => {
        const newPlayersList = players.filter((p) => p.id !== id)
        writeDataToFile('./players.json', newPlayersList)
        resolve(players)
    })
}

module.exports = {
    findAll,
    find,
    createPlayer,
    updatePlayer,
    deletePlayer
}
