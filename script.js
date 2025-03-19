import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import register from './controllers/register.js'
import signin from './controllers/signin.js'
import profile from './controllers/profile.js'
 

const db = knex({
    client: 'pg',
    connection: {
      host: 'dpg-cvbl0156l47c73af6kl0-a',
      port: 5432,
      user: 'crypto_tgzb_user',
      password: '3xAeyjbBaXpwi6p9SftoJdEJidTqsPKG',
      database: 'crypto_tgzb',
      ssl: { rejectUnauthorized: false }
    },
  });


const app = express()
app.use(express.json())
app.use(cors())


// host=localhost port=5432 dbname=crypto user=postgres password=xxxxxxx connect_timeout=10 sslmode=prefer


app.get('/', (req, res ) => {res.send('hello!! World')})
app.get('/profile/:id', (req, res)=>{profile(req, res, db)})
 


app.post('/signin', (req, res) => {signin(req, res, bcrypt, db)});
  


app.post('/register', (req, res) => {register(req, res, bcrypt, db)});

app.put('/image', (req, res) => {image(req, res, db)});

app.post('/setUpInfo', (req, res) => {setUpInfo(req, res)})

const port = process.env.port || 4500
app.listen(port, () => {
    `server is running on port ${port}`
})

// now figthnign with the regex , i need to see why it is changing my request to get after correct register and not post