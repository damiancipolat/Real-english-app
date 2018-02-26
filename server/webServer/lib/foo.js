//Separo por espacios un texto, devuelvo un array.
const tokenize = (text)=>{

  return text.split(" ");

}

//Mezclo las respuestas del api con los tokens del texto.
const mixTokensResult = (tokens,result)=>{

  return tokens.map((token)=>{

    //Busco la url de este token.
    let objWord = result.find((resu)=>resu.word==token);

	//Quito el path.
	if ((objWord!=undefined)&&(objWord.mp3!=null)){
		objWord.mp3 = objWord.mp3.replace(global.mp3HardPath,'');
		objWord.mp3 = global.mp3Url+objWord.mp3;
	}
	
    return {word : token,mp3: (objWord!=null?objWord.mp3:null)};

  });

}

module.exports.tokenize        = tokenize;
module.exports.mixTokensResult = mixTokensResult;