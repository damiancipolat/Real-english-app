//Modulo bd.
const bd  = require('./bd.js');

//Modulos grales.
const foo = require('./foo.js');

//Descarga estatica de archivos.
const downloadFile = (mp3)=>{

}

//Buscar palabra.
const findWord = (req,res)=>{

  //Reviso si biene el parametro.
  if (req.body.word!=null){

    console.log('find request > ',req.body.word);

    //Armo la conexion.
    bd.conectBD().then((conex)=>{

      //Hago la busqueda.
      bd.findWord(conex, req.body.word).then((result)=>{

        //Extraigo la url y la devuelvo.
        res.contentType = 'json';
        
        //Armo la url para acceder al archivo.
        let mp3Url = result[0]['mp3'].replace('C:\\wamp\\www\\english-bd\\mp3\\','');
            mp3Url = 'http://127.0.0.1:8000/mp3/'+mp3Url;        

        //Envio el request.
        res.send({"word":result[0]['word'],mp3:mp3Url});

      }).catch((err)=>{

        res.send(JSON.stringify({"error":"Search error"}));
        console.log(JSON.stringify({"error":"Search error"}));

      });    

    }).catch((err)=>{

      res.send(JSON.stringify({"error":"Internal error BD"}));
      console.log(JSON.stringify({"error":"Internal error BD"}));

    });

  } else {

    res.send(JSON.stringify({"error":"bad request"}));
    console.log({"error":"bad request"});

  }

}

//Busco los audios de todo un texto.
const findText = (req,res)=>{

  console.log("-> Receibed request");

  //Reviso si biene el parametro.
  if (req.body.text!=null){

    //Armo la conexion.
    bd.conectBD().then((conex)=>{

      //Separo por tokens un texto.
      let tokens = foo.tokenize(req.body.text);

      //Hago la busqueda.
      bd.findText(conex, tokens).then((result)=>{

        //Extraigo la url y la devuelvo.
        res.contentType = 'json';
        
        //Obtengo los audios de cada token.
        let mix = foo.mixTokensResult(tokens,result);

        //Envio el request.
        res.send({"result":mix});

      }).catch((err)=>{

        res.send(JSON.stringify({"error":"Search error"}));
        console.log({"error":"Search error","detail":err});

      });

    }).catch((err)=>{

      res.send(JSON.stringify({"error":"Internal error BD"}));
      console.log(JSON.stringify({"error":"Internal error BD"}));

    });

  } else {

    res.send(JSON.stringify({"error":"bad request"}));
    console.log({"error":"bad request"});

  }


}

module.exports.findText     = findText;
module.exports.findWord     = findWord;
module.exports.downloadFile = downloadFile;