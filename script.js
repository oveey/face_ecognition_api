import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import register from './controllers/register.js'
import signin from './controllers/signin.js'

import profile from './controllers/profile.js'
import image from './controllers/image.js'
import setUpInfo from './controllers/setUpInfo.js'
 

const db = knex({
    client: 'pg',
    connection: {
      host: 'dpg-ctno1stumphs73c8adr0-a.oregon-postgres.render.com',
      port: 5432,
      user: 'oluwalonmuseya',
      password: 'PeW9Uc2TIhGWK8FoFoV0fWBnEXVGTGaY',
      database: 'smart_brain_97bf',
      ssl: { rejectUnauthorized: false }
    },
  });



const app = express()
app.use(express.json())
app.use(cors())



app.get('/', (req, res ) => {res.send('hello World')})
app.get('/profile/:id', (req, res)=>{profile(req, res, db)})
 


app.post('/signin', (req, res) => {signin(req, res, bcrypt, db)});
  


app.post('/register', (req, res) => {register(req, res, bcrypt, db)});

app.put('/image', (req, res) => {image(req, res, db)});

app.post('/setUpInfo', (req, res) => {setUpInfo(req, res)})

const port = process.env.port || 4500
app.listen(port, () => {
    `server is running on port ${port}`
})

// still fighting with the whole deployement , i wil get it