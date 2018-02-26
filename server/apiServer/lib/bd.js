//Incluyo modulos.
const MongoClient = require('mongodb').MongoClient;

//Url mongodb.
const url = "mongodb://localhost:27017/";

//Iniciar conexion a la bd.
const conectBD = ()=>{

  return new Promise((resolve,reject)=>{

    //Me conecto a la bd.
    MongoClient.connect(url, (err, conex)=>{

      if (err)
        reject(err);
      else
        resolve(conex);

    });

  });

}

//Traigo la lista de palabras como un array.
const findWord = (conex,word)=>{

  return new Promise((resolve,reject)=>{

    //Traigo la bd.
    const dbo = conex.db("englishBD");

    dbo.collection("words").find({"word":{$eq:word}},{"_id":1,"word":1,"mp3":1}).toArray((err, result)=>{

      if (err) 
        reject(err);
      else
        resolve(result);

    });

  });

}

//Busco los tokens de audio.
const findText = (conex,tokens)=>{

  return new Promise((resolve,reject)=>{

    //Traigo la bd.
    const dbo = conex.db("englishBD");

    dbo.collection("words").find({"word":{$in:tokens}},{"_id":1,"word":1,"mp3":1}).toArray((err, result)=>{

      if (err) 
        reject(err);
      else
        resolve(result);

    });

  });

}


module.exports.conectBD = conectBD;
module.exports.findWord = findWord;
module.exports.findText = findText;