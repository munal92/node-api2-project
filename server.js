const express = require('express');


const server = express();
const dbRouter = require('./data/dbRoutes')




server.use(express.json());
server.use('/api/posts', dbRouter);





server.get('/', (req,res) =>{
    res.send(`<h2>SERVER RUNNING...</h2>`)
})



module.exports = server;