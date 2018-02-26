import React     from 'react';
import ReactDOM  from 'react-dom';

//Incluyo componentes.
import Textbox from './textbox.jsx';
import Tokens  from './tokens.jsx';

//Styles
import './form.less';

//Servicios.
import Api from './api.js';

//Form
class Form extends React.Component{

  constructor(props){

    super(props);
    this.state      = {text:''};
    this.updateText = this.updateText.bind(this);
    this.procSpeech = this.procSpeech.bind(this);

  }

  updateText(val){

    this.setState({text:val});
    
  }

  procSpeech(){

    if (this.state.text!=''){

      //Modo de carga.
      this.props.onProcess({type: 'loading'});

      //Hago el request, envo al reducer los datos.
      Api.findTextRequest(this.state.text)
        .then((result) => this.props.onProcess({type: 'process',payload:result}))
        .catch((err)   => this.props.onProcess({type: 'proc-error'}));

    }

  }

  render(){
    
    return (<div>
              {/* Banner */}
              <div className="banner">
                <div className="title">Real English</div>
              </div>                            
              {/* Formulario */}
              <div className="form">
                <div className="title">
                  <img src="./img/british.png" className="voz-icon"/>
                  English Speech
                </div>
                <div className="detail">
                  Escribe el texto en ingles, para poder obtener la pronuciación de cada palabra, luego haz click en <b>procesar</b>.
                </div>
                <div className="text-panel">
                    <Textbox onChange={this.updateText}/>
                    {/* Boton de procesar */}
                    <input type="button" value="Procesar" className="proc-btn" onClick={this.procSpeech}/>
                </div>
              </div>              
              {/* Resultados */} 
              {this.props.value.status!=null?
              <div className="form">
                {/* Muestro cuando hubo un error */}
                {this.props.value.status=='error'?
                <div className="title-error">
                  Se produjo un error.
                  <div className="detail-error">
                    Hubo un problema al hacer la busqueda intenta nuevamente.
                  </div>
                </div>:''}
                {/* Muestro msj de cargando */}
                {this.props.value.status=='loading'?
                <div className="title-single">
                  <img src="./img/spinner.gif" className="voz-icon"/>
                  Procesando texto...
                </div>:''}
                {/* Resultados */}
                {this.props.value.status=='success'?
                <div>
                  <div className="title">
                    <img src="./img/voz.png" className="voz-icon"/>
                    Audio tokens
                  </div>
                  <div className="detail">
                    Haz click sobre cada palabra para escuchar su pronuciación.
                  </div>
                  <div className="tokens-div">
                    <Tokens data={this.props.value}/>
                  </div>                  
                </div>:''}
              </div>:''}
            </div>);

  }

}

export default Form;