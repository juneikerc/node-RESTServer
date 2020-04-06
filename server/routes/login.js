const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const app = express()

app.post('/login', (req,res) => {

  const { email, password } = req.body

  Usuario.findOne({email: email}, (err,usuarioDb) => {
    
    if(err){
      return res.status(500).json({ok:false,err})
    }

    if(!usuarioDb){
      return res.status(400).json({ok:false,err: { message: '(Usuario) o contraseña incorrectos' }})
    }

    if(!bcrypt.compareSync(password, usuarioDb.password )){
      return res.status(400).json({ ok:false, err : { message: 'Usuari o (contraseña) incorrectos' } })
    }

    const token = jwt.sign({ usuario: usuarioDb }, process.env.SEED ,{ expiresIn: process.env.CADUCIDAD_TOKEN })

    res.json({
      ok:true,
      usuario: usuarioDb,
      token
    })

  })
})

module.exports = app