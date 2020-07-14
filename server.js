const express = require('express')
const app = express()

const Redis = require("ioredis");
const redis = new Redis();
const io = require('socket.io-emitter')(redis);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/machines', function(req, res){
  redis.get("machine_id", (err, d) => {
	  io.of('/machines').to(d).emit('START', {data: {test: "true"}});
   	  res.send('complete')
  })
})

app.listen(3001)
