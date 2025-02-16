const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.static(path.join(__dirname, '../FrontEnd')));

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const client = require('twilio')(process.env.accountSid, process.env.authToken);

const me = 'whatsapp:+919381305670'
const md = 'whatsapp:+919392646691'
app.post('/newBooking',(req,res)=>{
    console.log(req.body);
    const message = 
        `*Name:* ${req.body.name}\n\n`
        + `*Phone:* ${req.body.phone}\n\n`
        + `*Date:* ${req.body.date}\n\n`
        + `*Time:* ${req.body.time}\n\n`
        + `*City:* ${req.body.city}\n\n`
        + `*Address:* ${req.body.address}\n\n`
        + `*Type:* ${req.body.type}\n\n`
        + `*People:* ${req.body.people}\n\n`
        + `*Items:* ${req.body.items.join(", ")}`;
    client.messages
    .create({
        body: message,
        from: process.env.From,
        to: process.env.To,
    })
    .then(message => console.log(message.sid))
    .then(res.json({status:true}));
})

app.get('/',(req,res)=>{
    res.send("hello");
})

module.exports = app;
