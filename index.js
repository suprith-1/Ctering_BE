const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



const allowedOrigins = [
  'http://localhost:5173/fourth', 
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

const accSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = require('twilio')(accSid,authToken);

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
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+916304118626'
    })
   .then((message) => {console.log("Message sent: ", message.sid);res.json({ status: true });}) 
    .catch((error) => {console.error("Error: ", error);res.json({ status: false });});
})

app.get('/',(req,res)=>{
    res.send("hello");
})

module.exports = app;
