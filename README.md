# Real english Api / Web
Este proyecto consiste en ser una plataforma para aprendizaje de la pronuciación de palabras en ingles, esta creada con la tecnologias 

node.js / React.js / Redux / Mongodb.

Se toma como referencia el proyecto **[English-words-pronunciation-mp3-audio-download]** de @nathanielove, que armo una recopílación de 

palabras y urls con archivos mp3 de 7 diccionarios online:
- Cambridge Dictionary
- Oxford Dictionaries
- Dictionary.com
- Vocabulary.com
- YourDictionary
- The Free Dictionary
- OneLook Dictionary Search

El total de palabras procesadas para este proyecto fueron 119376, esto signfica que hay archivos de audio de todas ellas.

Para hacer el proceso de descarga de cada archivo y validación de las urls se uso el lenguaje PHP ya que para ejecución de tareas sincronas es más sencillo para este caso que node.js que debemos hacerlas asincroncias, el tiempo total de procesamiento en una 
computadora de cpu Intel I5 de 4GB de RAM fueron de 3 días.

[English-words-pronunciation-mp3-audio-download]:https://github.com/nathanielove/English-words-pronunciation-mp3-audio-download

## Base linguistica.
Para simplificar el uso del proyecto ya se encuentra un backup con la bd en mongodb que use para el proyecto y debe ser importada para el 

mismo, esto se encuentra en la carpeta: /server/data/bd-backup.json ejecutar los sig. comandos para importar la BD.

```sh
#Importar la base de datos para procesarla.
$ mongoimport --db englishBD --collection words --jsonArray --file "C:\wamp\www\english-bd\data\origin-bd.json"

#Actualizo las urls, quito el path:
PATH: ejemplo C:\\wamp\\www\\english-bd\\mp3\\ (revisar en la bd el campo mp3).

db.words.find({}).forEach(function(doc){
  var updated_url = doc.mp3.replace(PATH,'');
  db.getCollection('words').update({"_id":doc.id},{"$set":{"mp3":updated_url}});	
});

#Exportar la base de datos, para backup:
$ mongoexport --db englishBD --collection words --out "C:\wamp\www\english-bd\data\bd-backup.json"
```

## Server
El proyecto esta compuesto por un Api-Rest un WebServer y una SPA creada con React.js.

### Api-rest:
Para ejecutar el api server, ejecute los sig. comandos.

```sh
$ cd /server/apiServer/
$ npm install
$ npm start
```

### Web Server:
Para ejecutar el api server, ejecute los sig. comandos.

```sh
$ cd /server/webServer/
$ npm install
$ npm start
```

### Web Server:
Para transpilar el proyecto.

```sh
$ cd /client/
$ npm install
$ npm run bundle
```
