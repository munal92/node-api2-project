

const app = require('./server.js');


const PORT = 4000;

app.listen(PORT , () => {
    console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
});