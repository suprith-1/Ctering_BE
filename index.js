const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();


const allowedOrigins = [
  'http://localhost:5173', 
  'https://ctering-be.vercel.app' 
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  methods: 'GET,POST,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

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
