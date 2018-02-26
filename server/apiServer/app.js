//Incluyo modulos.
const restify = require('restify');
const routes  = require('./lib/routes.js');
const corsMdw = require('restify-cors-middleware');

//Agrego cors middleware.
const cors 		= corsMdw({preflightMaxAge: 5,origins: ['*']});

//Creo el servidor.
const server  = restify.createServer();

global.mp3Url 	   = 'http://127.0.0.1:8000/mp3/';
global.mp3HardPath = 'C:\\wamp\\www\\english-bd\\mp3\\';

//Agrego bodyparser para paresar el body de post.
server.use(restify.plugins.bodyParser());

//Agrego CORS.
server.pre(cors.preflight);
server.use(cors.actual);

//Descarga estatica de archivos.
server.get(/\/?.*/, restify.plugins.serveStatic({
  directory: '../data/'
}));

//Busco la palabra en la bd.
server.post('/find-word',routes.findWord);

//Busco un texto en la bd.
server.post('/find-text',routes.findText);

//Defino urls.
server.get('/hello/:name', (req,res)=>{

  //res.send('hello ' + req.params.name);
  res.send('hello damian');

});

//Pongo en modo escucha.
server.listen(8000, ()=>{
  
  console.log('REAL VOICE ENGLISH');
  console.log('*******************');
  console.log('');
  console.log('API-REST Server');
  console.log('%s listening at %s', server.name, server.url);

});