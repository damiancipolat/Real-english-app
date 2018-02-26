<?php

  //Clase para pareso.
  class englishTool{

    function englishTool(){

      $this->bd = new wrapperBD();
      $this->bd->conectar();
      $this->foo = new foo();

    }

    //Traigo el filename.
    function getFileName($word){

      return str_replace(' ', '', $word).'_'.$this->foo->timestamp();

    }

    //Parseo la estructura del archivo a la de la bd.
    function parsear($json){

      $lista = Array();

      foreach($json as $clave => $valor){

        $urls = $valor;
        $tmp  = Array();

        for ($i=0;$i<=count($urls)-1;$i++)
            array_push($tmp,array("url"=>$urls[$i], "exists"=>false));

        array_push($lista,array("word"=>$clave,"urls"=>$tmp));        

      }

      return $lista;

    }

    //Vuelco el archivo a la bd.
    function fillBd($parsed){

      $total = count($parsed);
      $count = 0;
  
      //Vacio la coleccion.
      $this->bd->clearWords();

      echo '<br/>';

      //Vuelco los datos.
      for ($i=0;$i<=count($parsed)-1;$i++){

        $this->bd->insertWord($parsed[$i]);
        $count++;

        echo "> ".floor(($count*100)/$total).' %<br/>';

      }      

    }

    //Reviso todas las urls.
    function scanUrls($parsed){

      $total = count($parsed);
      $count = 0;

      //Recorro todas las palabras.
      for ($i=0;$i<=count($parsed)-1;$i++){

        $word = $parsed[$i];    
        $count++;

        //Recorro todas las urls de cada palabra.
        for ($j=0;$j<=count($word['urls'])-1;$j++){

          $url   = $word['urls'][$j]['url'];
          $exist = $this->foo->urlExist($url);

          $word['urls'][$j]['exists'] = $exist;

        }
        
        echo "> ".floor(($count*100)/$total).' %<br/>';

        $parsed[$i] = $word;

      }

      return $parsed;

    }

    //Elijo la url.
    function selectUrl($urls){

      $sel = [];

      for ($i=0;$i<=count($urls)-1;$i++){

        if ($urls[$i]['exists']==true)
          array_push($sel,$urls[$i]['url']);

      }

      if (count($sel)>0)
        return $sel[0];
      else
        return null;

    }

    //Actualizo las urls.
    function updateWords($parsed){

      $total = count($parsed);
      $count = 0;

      //Recorro todas las palabras.
      for ($i=0;$i<=count($parsed)-1;$i++){

        $word = $parsed[$i];

        //Armo el nombre del archivo a descargar.
        $word['mp3'] = $this->getFileName($word['word']).'.mp3';

        //Traigo la url a descargar.
        $word['downloadMp3'] = $this->selectUrl($word['urls']);
        
        //Actualizo.
        $ret = $this->bd->wordUpdate($word);

        $count++;
        echo "> ".floor(($count*100)/$total).' %<br/>';

      }

    }

  }

?>