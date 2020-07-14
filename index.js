const io = require('socket.io')(3000)
const redisAdapter = require('socket.io-redis')
const Redis = require("ioredis") 
const pub = new Redis()
const sub = new Redis()
const redis = new Redis()
io.adapter(redisAdapter({ pubClient: pub, subClient: sub }))

io.of('/machines').on('connection', (socket) => {
    redis.set('machine_id', socket.id)
    socket.emit('message', 'test message')
    socket.on('join-game', (joinData) => {
	io.of('/machine').adapter.remoteJoin(socket.id, 'testroom', (err) => {
		socket.emit('joined_room', `room name: testroom`)
	}) 		
    })
    socket.on('hello', (h) => {
	console.log('h', h)
    })
})


