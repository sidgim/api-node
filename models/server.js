const express = require('express')
const cors = require("cors");
const {dbConnection} = require("../db/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
      await  dbConnection();
    }
    middlewares() {
        this.app.use(cors());
        // Lectura y Parseo del body
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;
