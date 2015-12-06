import app from '../server'
import path from 'path'

import authHandler from '../handlers/authHandler'
import apiHandler from '../handlers/apiHandler'
import passport from 'passport'



app.post('/auth/login', passport.authenticate('local', {
  successRedirect: '/#/home',
  failureRedirect: '/#/login',
  failureFlash: true 
})                                )

app.get('/auth/logout', authHandler.logout)

app.post('/auth/signup', authHandler.signup)

app.get('/auth/authenticate', authHandler.authenticate)

app.get('/api/intitialState', apiHandler.intitialState)

app.post('/api/budget/category/:id', apiHandler.budget)

// app.get('/test', (req, res) => {
//     let user = new User({first_name: 'Lucilla', last_name: 'Chalmer', phone_number: 7344749351, uuid: 'abc123'})
//     user.save().then((user) => {
//       console.log('user has been created!!! YAY!!!')
//       res.json(user)
//     })
// })
