import express from 'express'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import engine from 'ejs-mate'
import config from './config'

const app = express()
const port = process.env.PORT || config.get('port')

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use( bodyParser.json() )

app.get('/', (req, res) => {
    res.render('index')
})

app.use(express.static(path.join(__dirname, 'public')))

const server = require('http').createServer(app)

const ExpressPeerServer = require('peer').ExpressPeerServer;
var options = {
    debug: false
}

const peerServ = ExpressPeerServer(server, options)
app.use('/peerjs', peerServ);


const io = require('socket.io').listen(server)

server.listen(port, (err) => {
    if (err) {
        console.error('Error listen http://localhost:%d', port)
    } else {
        console.log('Start server http://localhost:%d', port)
    }
})

peerServ.on('connection', id => {
    ClientCallServer.findOne({peerId: id})
    .then(client => {
        if(!client){
            return false
        }
        return true
    })
    .then(result => {
        if(!result){
            disconnectPeer(id)
            peerServ.emit('disconnect', id)
        }
        console.log("PeerJs connection to server with id: " + id)
    }).catch(err => {
        console.error(err)
    })
})

peerServ.on('disconnect', function(id) {
    ClientCallServer.remove({peerId: id})
    .then(() => {
        console.log('PeerJS disconnect to server with id: ' + id)
    })
    .catch(err => {
        console.error(err)
    })
});






//Это вынести  в отдельный файл ...

import Site from './models/site'
import ClientCallServer from './models/clientCallServer'
import Message from './models/message'
import HistoryList from './models/historyList'
import Summary from './models/summary'

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
// let testSite = new Site({
//     siteName: 'testSite',
//     domen: 'http://localhost:3000',
//     countAdmins: 5,
//     key: 'testKeys',
//     email: 'testSites@yandex.ru'
//     // userId:{
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     default: 'gleb'
//     // }
// })
// testSite.save()
// let sessions = {}
// let admins = []

app.post('/api/getPeerId', (req, res) => {
    const key = req.body.key
    const userId = req.body.userId
    const isAdmin = req.body.isAdmin
    Site.findOne({key: key})
    .then(site => {
        if(!site){
            res.status(403).send({
                error:{
                    type: 'access error',
                    message: 'invalid key site'
                }
            })
            return null
        }
        const peerId = new Date().getTime() + '-' + userId
        ClientCallServer.findOne({clientId: userId})
        .then(clientPeer => {
            if(!clientPeer){
                return new ClientCallServer({
                    clientId: userId,
                    peerId: peerId,
                    domen: site.domen,
                    pass: '12345asb123124421',
                    type: (isAdmin) ? 'admin' : 'user',
                    busy: false
                })
            }
            disconnectPeer(clientPeer.peerId)
            clientPeer.peerId = peerId
            return clientPeer
        })
        .then(client => {
            client.busy = false;
            client.busyWith = ' ';
            return client.save()
        })
        .then(client => {
            res.send({peerId: client.peerId, pass: client.pass})
            return  HistoryList.findOne({clientId: userId, domen: site.domen})
        })
        .then(history => {
            if(!history){
                return new HistoryList({
                    clientId: userId,
                    domen: site.domen
                }).save()
            }
            history.lastDate =  new Date();
            return history.save()
        })
        .catch(err => {
            console.error(err)
            res.status(500).send({
                error:{
                    type:'server error',
                    message: 'server error'
                }
            })
        })
    })
    .catch(err => {
        console.error(err)
        res.status(500).send({
            error:{
                type:'server error',
                message: 'server error'
            }
        })
    })
})


function authPeer(peerId, pass){
    return ClientCallServer.findOne({peerId: peerId, pass: pass})
    .then(client => {
        if(!client){
            return false
        }
        return true
    })
}

function disconnectPeer(peerId){
    if(peerServ._clients['peerjs'] && peerServ._clients['peerjs'][peerId]){
        peerServ._clients['peerjs'][peerId].socket.close();
        peerServ._ips[peerServ._clients['peerjs'][peerId].ip]--;
        delete peerServ._clients['peerjs'][peerId];
    }
}

io.sockets.on('connection', function(socket) { // При подключении
    const domain = socket.handshake.headers.origin
    Site.findOne({domen: domain})
    .then(site => {
        if(!site){
            return socket.disconnect(true)
        }

        socket.on('logIn', (data, cb) => {
            ClientCallServer.findOne({peerId: data.peerId, pass: data.pass})
            .then(client => {
                if(!client){
                    return null
                }
                client.socket = socket.id
                return client.save().then(()=>{
                    cb({type: client.type})
                })
            })
            .catch(err => {
                cb()
                console.error(err)
            })
        })

        socket.on('iAmFreeAdmin', data => {
            ClientCallServer.findOne({peerId: data.peerId, pass: data.pass, type: 'admin'})
            .then(client => {
                if(!client){
                    return null
                }
                console.log(client.busyWith)
                client.busy = false
                client.busyWith = ''
                console.log('Free Admin is: ' + data.peerId)
                return client.save()
            })
            .catch(err => {
                console.error(err)
            })
        })

        socket.on('getPeerAdminToServer', (data, cb) => {
            ClientCallServer.find({}).then(res=>{console.log(res)});
            authPeer(data.peerId, data.pass)
            .then(result => {
                if(!result){
                    return {peerAdminId: -1}
                }
                return ClientCallServer.findOne({domen: site.domen, type: 'admin', busy: false})
            })
            .then(clientAdmin => {
                if(!clientAdmin) {
                    return null
                }
                if(clientAdmin.peerAdminId == -1){
                    return {peerAdminId: -1}
                }
                clientAdmin.busy = true
                clientAdmin.busyWith = data.peerId
                return clientAdmin.save()
            })
            .then(clientAdmin => {
                if(!clientAdmin){
                    cb({peerAdminId: null})
                    return
                }
                if(clientAdmin.peerAdminId == -1){
                    cb({peerAdminId: -1, error:{type: 'access error', message: 'auth is not valid'}})
                    return
                }
                cb({peerAdminId: clientAdmin.peerId})
                io.sockets.sockets[clientAdmin.socket].emit('willCall')
            })
            .catch(err => {
                console.error(err)
            })
        })

        socket.on('adminOnlyGetClientId', (data, cb) => {
            authPeer(data.peerId, data.pass)
            .then(result => {
                if(!result){
                    return null
                }
                return ClientCallServer.findOne({domen: site.domen, peerId: data.peerId, type: 'admin'})
            })
            .then(client => {
                if(!client){
                    return null
                }
                return ClientCallServer.findOne({peerId: data.otherPeerId, domen: site.domen})
            })
            .then(client => {
                cb({clientId: client.clientId})
            })
            .catch(err => {
                console.error(err)
                cb({clientId: null})
            })
        })

        socket.on('messageTo', (data, cb) => {
            let clientAdmin;
            let clientUser;
            let message;
            let history;
            authPeer(data.from, data.pass)
            .then(result => {
                if(!result){
                    return null
                }
                return ClientCallServer.findOne({domen: site.domen, peerId: data.from})
            })
            .then(client => {//from
                if(client.type == 'user'){
                    clientUser = client
                } else {
                    clientAdmin = client
                }
                message = new Message({
                    clientId: client.clientId,
                    from: client.type,
                    to: 'in next .then()',
                    text: escapeHtml(data.msg)
                })
                return ClientCallServer.findOne({domen: site.domen, peerId: data.to})
            })
            .then(client => {//to
                if(client.type == 'user'){
                    clientUser = client
                } else {
                    clientAdmin = client
                }
                message.to = (client.type == 'user') ? 'user' : 'admin'
                return HistoryList.findOne({clientId: clientUser.clientId, domen: site.domen})
            })
            .then(historyItem => {
                history = historyItem
                return message.save()
            })
            .then(message => {
                history.messages.push(message._id);
                return history.save();
            })
            .then(history => {
                if(clientAdmin.peerId == data.to && clientAdmin.busyWith == data.from){
                    io.sockets.sockets[clientAdmin.socket].emit('messageFrom', {text: data.msg, from: 0, date: message.date});
                } else if(clientAdmin.busyWith == data.to){
                    io.sockets.sockets[clientUser.socket].emit('messageFrom', {text: data.msg, from: 0, date: message.date});
                }
                cb({date: message.date})
                // return HistoryList.populate(history,'messages')
            })
            .catch(err =>{
                console.error(err)
                cb()
            })
        })

        socket.on('getMessages', (data, cb) => {
            let clientMongo;
            authPeer(data.peerId, data.pass)
            .then(result => {
                if(data.nextMsg < 0) return null;
                if(!result){
                    return null
                }
                return ClientCallServer.findOne({domen: site.domen, peerId: data.peerId})
            })
            .then(client => {
                clientMongo = client;
                if(!client){
                    return null
                }
                if(data.userPeerId && client.type == 'admin'){
                    return ClientCallServer.findOne({domen: site.domen, peerId: data.userPeerId, type: 'user'})
                }
                return client
            })
            .then(client => {
                return HistoryList.find({clientId: client.clientId, domen: site.domen})
            })
            .then(history => {
                return HistoryList.populate(history, 'messages')
            })
            .then(historyParse => {
                if(data.nextMsg == null){
                    data.nextMsg = historyParse[0].messages.length
                }
                let listMessages = historyParse[0].messages.slice(data.nextMsg - 10, data.nextMsg)
                data.nextMsg -= 10
                listMessages = listMessages.map(el => {
                    return {text: el.text, from: (clientMongo.type == el.from) ? 1 : 0, date: el.date}
                })
                cb({messages: listMessages, nextMsg: data.nextMsg})
            })
            .catch(err => {
                console.error(err)
                cb({messages: null, nextMsg: -1})
            })
        })

        socket.on('addSummary', (data, cb) => {
            if(data.text.replace(/^\s+/, "") == "" || data.title.replace(/^\s+/, "") == ""){
                return cb({error:'invalid data'})
            }
            let newSummary;
            let historyItem;
            authPeer(data.peerId, data.pass)
            .then(result => {
                if(!result){
                    return null
                }
                return ClientCallServer.findOne({domen: site.domen, peerId: data.peerId, type: 'admin'})
            })
            .then(client => {
                if(!client){
                    return null
                }
                newSummary = new Summary({
                    clientId: client.clientId,
                    text: escapeHtml(data.text),
                    title: data.title,
                })
                return HistoryList.findOne({clientId: data.clientId, domen: site.domen})
            })
            .then(history => {
                historyItem = history
                return newSummary.save()
            })
            .then(summary => {
                historyItem.summarys.push(summary._id)
                return historyItem.save()
            })
            .then(() => {
                cb({})
            })
            .catch(err => {
                console.error(err)
                cb({error: 'Server Error'})
            })
        })

        socket.on('getSummary', (data, cb) => {
            authPeer(data.peerId, data.pass)
            .then(result => {
                if(data.nextSummary < 0) {
                    return null;
                }
                if(!result){
                    return null
                }
                return ClientCallServer.findOne({domen: site.domen, peerId: data.peerId, type: 'admin'})
            })
            .then(client => {
                if(!client){
                    return null
                }
                return ClientCallServer.findOne({domen: site.domen, peerId: data.userPeerId})
            })
            .then(client => {
                return HistoryList.find({clientId: client.clientId, domen: site.domen})
            })
            .then(history => {
                return HistoryList.populate(history, 'summarys')
            })
            .then(historyParse => {
                if(!data.nextSummary){
                    data.nextSummary = historyParse[0].summarys.length
                    console.log(historyParse[0].summarys.length)
                }
                let listSummarys = historyParse[0].summarys.slice(data.nextSummary - 5, data.nextSummary)
                data.nextSummary -= 5;
                listSummarys = listSummarys.map(el => {
                    return {text: el.text, title: el.title, date: el.date}
                })
                cb({summarys: listSummarys, nextSummary: data.nextSummary})
            })
            .catch(err => {
                console.error(err)
                cb({summarys: null, nextSummary: -1})
            })
        })

        socket.on('closeMedia', (data, cb) => {
            console.log('closeMedia!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            authPeer(data.peerId, data.pass)
            .then(result => {
                if(!result){
                    return null
                }
                return ClientCallServer.findOne({domen: site.domen, peerId: data.otherPeerId})
            })
            .then(client => {
                if(!client){
                    return null
                }
                io.sockets.sockets[client.socket].emit('closeMedia');
            })
            .catch(err => {
                console.error(err)
            })
        })

    })
    .catch(err => {
        console.error(err)
    })
});
