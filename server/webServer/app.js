//Incluyo modulos.
const restify = require('restify');
const server  = restify.createServer();
const fs      = require('fs');
const path    = require('path');

//Cargar archivo config.
const config = JSON.parse(fs.readFileSync('./settings.json').toString());

//Agrego bodyparser para paresar el body de post.
server.use(restify.plugins.bodyParser());

//Descarga estatica de archivos.
server.get(/\/?.*/, restify.plugins.serveStatic({
  directory: config.www
}));

//Pongo en modo escucha.
server.listen(config.port, function() {

  console.log('REAL VOICE ENGLISH');
  console.log('*******************');
  console.log('');
  console.log('HTTP Static Web server');
  console.log('%s listening at %s', server.name, server.url);
  console.log('Publishing: ',config.www);
  console.log('');

});