<?php

  //Extiendo limite de memoria.
  ini_set('memory_limit', '2098M');

  //Quito tiempo limite.
  set_time_limit(0);  

  //Incluyo clases.
  include('foo.php');
  include('bd.php');
  include('tool.php');

  //Analizo las ordenes al proceso.
  if (count($argv)==3){

    //Cargo clases.
    $foo    = new foo();
    $tool   = new englishTool();

    //Cargo el path.
    $jsonFile = $argv[1];

    //Cargo el json.
    $json   = $foo->readJson($jsonFile);

    //Parseo la estructura.
    $parsed = $tool->parsear($json);

    //Si viene el comando para cargar la bd.
    if ($argv[2]=='fillbd')
      $tool->fillBd($parsed);

    //Si viene el comando para procesar / descargar audios.
    if ($argv[2]=='scan')
      $tool->fillBd($parsed);   

    $tool->bd->cerrar();

  } else
    echo 'Falta parametros!: formato: php.exe index.php path cmd';

?>