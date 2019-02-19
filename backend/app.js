//import { toastr } from 'react-redux-toastr'

const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const cors = require('cors')
const net = require('net')
const axios = require('axios');
const BASE_URL = 'http://localhost:3003/api'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())


var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;
var dbName = "aiclass";
var db = null;

function getDataBase() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            if (err) reject(err);
            this.db = client;
            resolve(client.db(dbName));
            
        });
    });
}
function close() {

    if (this.db != null) {
        this.db.close(function (err) {
            if (err) throw err;

            console.log('DB is closed!')

        });
    }

}
setInterval(() => {
    let client = new net.Socket();
    client.connect(10003, '192.168.137.2', function () {
        console.log('Connected');
        client.on('data', function (data) {
            console.log('Received: ');

            data = data.toString()
            data = data.split("-")

            onoff = data[0]
            goback = data[1]
            identificadorDoPivo = data[2]


            console.log('Valor = ' + onoff)
            console.log('Valor = ' + goback)
            console.log('ID = ' + identificadorDoPivo)


            io.emit("status", data.toString());
            client.destroy(); // kill client after server's response

            atualizarStatus(onoff,goback, identificadorDoPivo)

        });
    });
}, 10000)


function atualizarStatus(onoff,goback, identificadorDoPivo) {
    axios.post('http://localhost:3000/acionamento/status', { id: identificadorDoPivo, value:goback, value: onoff })
        .then(resp => {

            const analyzesDB = 'analyzes'

            if (resp.data.message === "Pressurizou") {

                console.log('DEU')
                
            } else {
                console.log('Outra resp = ' + resp.data.message)
          
            }
        })
        .catch(e => {
            console.log("erro= ", e)
        })
}


app.post('/acionamento/status', function (req, res) {
   
    onoff = req.body.value;

    if (onoff === '10') {

        if (onoff === '10') {
            onoff = "Ligado"
        }
        else if (onoff === '9') {
            onoff = "Erro - Bomba"
        }
        else if (onoff === '4') {
            onoff = "Desligado"
        }

        console.log('Valor do vitinho = ' + onoff)
        
        getDataBase().then((db) => {
            return db.collection('analyzes')
        }).then((pivos,obj) => {
            return pivos.updateOne(
                { parameter4: req.body.id },
                { $set: { parameter1: onoff } },
                
)
        }).then((result) => {

            var success = JSON.parse(result).nModified;
            if (success)
                res.status(200).json({ message: 'Pressurizou' })
            else
                res.status(200).json({ message: 'Não pressurizou' })
            close()

        }).catch((err) => {
            //res.status(200).json({ message: 'Error' })
            console.log('Error closing DB: ' + err);
        });


    }


})

app.post('/acionamento', function (req, res) {
    console.log(req.body);
    console.log("ligar")
    let client = new net.Socket();

    client.connect(10003, '192.168.137.2', function () {
        console.log('Connected');
        client.write(Buffer.from(req.body.data, 'hex'));
        client.on('data', function (data) {
            console.log('Receeeeeived: ' + data);

            client.destroy();
            if (data.toString() === '3') {
                res.status(200).json({ message: 'Pressurizou' })
            }
            else if (data.toString() === '9') {
                res.status(200).json({ message: 'Não Presurizou' })
            }
            else if (data.toString() === '4') {
                res.status(200).json({ message: 'Desligado' })
            }
            else {
                res.status(200).json({ message: 'Deu ruim' })
            }
        });

    });

})


//FEITO POR RAFAELA
app.post('/sentido', function (req, res) {
    console.log(req.body);
    console.log("Avanco")
    let client = new net.Socket();
    client.connect(10003, '192.168.137.2', function () {
        console.log('Connected');
        client.write(Buffer.from(req.body.data, 'hex'));
        client.on('data', function (data) {
            console.log('Received: ' + data);
            if (data.toString() === '7') {
                res.status(200).json({ message: 'Avanco ok' })
            }
            if (data.toString() === '8') {
                res.status(200).json({ message: 'Reverso ok' })
            }
            else {
                res.status(200).json({ message: 'deu ruim' })
            }
            client.destroy(); // kill client after server's response
        });
    });
    //res.status(200).json({message:'ok'})
})

const server = require('http').createServer(app);

server.listen(3000, function (err) {
    if (err) {
        console.log('ERROR', err);
    } else {
        console.log('Listening on port 3000');
    }
})


const io = require('socket.io')(server);
io.on("connection", socket => {
    console.log("New client connected")
    socket.on('status', data => {
        console.log(data)
        socket.broadcast.emit('status', {
            device: "01",
            data: data
        });
    });
    socket.on("disconnect", () => console.log("Client disconnected"));
});