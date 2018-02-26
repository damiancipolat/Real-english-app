//Url del api.
const hostApi = 'http://'+window.location.hostname+':8000';

//Hago el request.
const findTextRequest = (textKey)=>{

  return new Promise((resolve,reject)=>{

	let url = hostApi+'/find-text/';
	console.log(url);
  
    //Armo la estructura para request.    
    const options = {
      method : 'POST',
      body   : JSON.stringify({text:textKey}),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    //Hago el request.
    fetch(url, options)
      .then(res => res.json())
      .then(res => resolve(res))
      .catch((err)=>reject(err));

  });

}

module.exports.findTextRequest = findTextRequest;