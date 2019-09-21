const express = require("express");
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db/db.json');
const db = low(adapter);

router.get('/', (req, res) => {
    const users = db.get('Users').value();
    res.send(users);
});

router.post('/add', (req, res) => {
    const userdata = {
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }

    db.get('Users')
    .push(userdata)
    .last()
    .write()
    res.send('post ok')
});

router.put('/update/:id', (req, res) => {
    const getid = req.params.id;
    const userid = db.get('Users').find(getid).value();
    const userdata = {
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }

    db.get('Users')
    .find(userid)
    .last()
    .assign(userdata)
    .write()
    res.send('post ok')
});

router.delete('/delete/:id', (req, res) => {
    const getid = req.params.id;
    const userid = db.get('Users').find(getid).value();
    db.get('Users')
    .remove(userid)
    .value()
    res.send('delete ok')
});

module.exports = router;