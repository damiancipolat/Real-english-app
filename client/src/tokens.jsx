import React           from 'react';
import ReactDOM        from 'react-dom';

import './tokens.less';

class Tokens extends React.Component{

  constructor(props){

    super(props);
    this.onClickToken = this.onClickToken.bind(this);
  }

  onClickToken(token){

    console.log('->',token);
    let audio = new Audio(token.mp3);
    audio.play();

  }

  render(){

    if (this.props.data.tokens.result!=null){

      //Itero el array de resultados.
      let tokens = this.props.data.tokens.result.map((token,index)=>{

        //Armo cada palabra.
        let word = null;

        if (token.mp3!=null)
          word =  (<span key={index} className="token-word">
                     <a onClick={()=>this.onClickToken(token)}>
                        {token.word}
                      </a>
                   </span>);
        else
          word =  (<span key={index} className="token-word-disabled">
                    {token.word}
                   </span>);

        return word;

      });

      return (<div>{tokens}</div>);

    } else
      return (<div>Sin resultados</div>); 

  }

}

export default Tokens;