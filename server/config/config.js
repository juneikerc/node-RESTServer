const { LOCAL_DB, ATLAS_DB } = process.env
//========================
//Puerto
//========================
process.env.PORT = process.env.PORT || 3000

//========================
//Entorno
//========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//========================
//Bases de datos
//========================

let urlDb

if(process.env.NODE_ENV === 'dev') {
  urlDb = LOCAL_DB
}else{
  urlDb = ATLAS_DB
}

process.env.URLBD = urlDb

 