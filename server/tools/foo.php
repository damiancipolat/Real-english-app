<?php

  //Clase para proceso de funciones usuales.
  class foo{

    //Cargo el objeto del json.
    function readJson($file){

      if(file_exists($file)){

        $fp      = fopen($file, "r");
        $content = fread($fp, filesize($file));
        fclose($fp);

        return json_decode($content);

      } else {

        echo 'No se encontro el archivo'+$file;
        return null;

      }

    }

    //Reviso si esxiste la url.
    function urlExist($url) {

      $ch = curl_init($url);

      curl_setopt($ch, CURLOPT_HEADER, TRUE);
      curl_setopt($ch, CURLOPT_NOBODY, TRUE);
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, FALSE);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
      $status = array();
      preg_match('/HTTP\/.* ([0-9]+) .*/', curl_exec($ch) , $status);

      return ($status[1] == 200);

    }

    //Traigo el timestampo.
    function timestamp(){

      $now = new DateTime();
      return $now->format('YmdHis');

    }

  }

?>