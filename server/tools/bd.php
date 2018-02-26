<?php

  //Clase para manejo de la bd.
  class wrapperBD{

    function wrapperBD(){

      $this->host  = "mongodb://localhost:27017/";

    }

    //Me conecto a la bd.
    function conectar(){

      //Abro la conexión a la bd.
      $this->conex = new MongoClient($this->host);
      
      //Elijo la colección.
      $this->words = $this->conex->selectCollection('englishBD','words');

      echo "> MongoDB connection ok!";

    }

    //Borro la coleccion
    function clearWords(){

      $this->words->drop();

    }

    //Agrego una palabra.
    function insertWord($word){
      
      return $this->words->insert($word);

    }

    //Cierro la conexion.
    function cerrar(){

      $this->conex->close();

    }

    //Actualizo una palabra.
    function wordUpdate($word){

      return $this->words->update(
                array('word' => $word['word']),
                array('$set' => array('word'=>$word['word'],'urls'=>$word['urls'],'mp3'=>$word['mp3'],'downloadMp3'=>$word['downloadMp3']))
             );

    }

  } 

?>