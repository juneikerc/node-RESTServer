const jwt = require('jsonwebtoken')

//=================
//Verificar Token
//=================

const verificaToken = ( req, res, next ) => {

  let token = req.get('token')
  
  jwt.verify(token, process.env.SEED, (err,decoded) => {
    
    if(err) {
      return res.status(401).json({ok:false,err: { message: 'Token No válido'  }})
    }
    
    //decoded deveuelve el objeto que "encrypta en jwt"
    req.usuario = decoded.usuario
    next()
  })

  

}

//=================
//Verificar AdminRole
//=================

const verificaAdminRole = (req,res,next) => {

  const { role } = req.usuario

  if(role !== 'ADMIN_ROLE' ) {
    return res.status(401).json({ok: false, err: 'No estás autriazado para crear usuarios'})
  }else{
    next()
  }

}

module.exports = {verificaToken,verificaAdminRole}