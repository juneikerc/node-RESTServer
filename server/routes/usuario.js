const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/usuario')
const app = express()

//#########GET USER#################

app.get('/usuario', (req,res) => {

  let desde = req.query.desde || 0
  desde = Number(desde)
  let limite = req.query.limite || 5
  limite = Number(limite)

  Usuario.find({estado: true},'nombre email role estado google img')
          .skip(desde)
          .limit(limite)
          .exec((err, usuarios) => {
            
            if(err) {
              return res.status(400).json({ok:false,err})
            }
            
            res.json({ok:true, usuarios})
          })
 
})

//#########POST USER#################

app.post('/usuario', (req,res) => {
  
  const { nombre, email, password, role } = req.body 
  
  const usuario = new Usuario({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10 ),
    role  
  })

  usuario.save((err,usuarioDB) => {
     if(err){
      return res.status(400).json({ ok:false, err })
    }

    //Antes de devolver el json con el objeto en el modelo usuario usa el metodo tojson para eliminar el campo password y no se deveuelto en los datos para el front

    res.json({ ok:true, usuario: usuarioDB })

  })
  
})

//#########PUT USER#################

app.put('/usuario/:id', (req,res) => {

  const { id } = req.params
  const body = _.pick(req.body, ['nombre','email','img','role','estado'] )
 
  Usuario.findByIdAndUpdate( id, body , { new: true, runValidators: true }, (err, usuarioDB) => {
    
    if(err){
      return res.status(400).json({ok: false, err })
    }
    
    res.json({ ok: true, usuario: usuarioDB })
  
  })
  
})

//#########DELETE USER#################

//Delete fisico
// app.delete('/usuario/:id', (req,res) => {
 
//   const { id } = req.params

//   Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    
//     if(err) {
//       return res.status(400).json({ ok:false, err })
//     }

//     if(!usuarioBorrado) {
//       return res.status(400).json({
//         ok:false,
//         err: {
//           message: 'usuario no encontrado'
//         }
//       })
//     }

//     res.json({ ok:true, usuario:usuarioBorrado })
//   } )

// })

//delete cambiando el estado
app.delete('/usuario/:id', (req,res) => {

  const { id } = req.params
  const { estado } = req.body
  
  Usuario.findByIdAndUpdate(id, { estado }, { new: true, runValidators: true },(err, usuarioBorrado) => {
    
    if(err){
      return res.status(400).json({ok:false}, err)
    }

    res.json({ok:true, usuario: usuarioBorrado})


  }  )

})

module.exports = app

