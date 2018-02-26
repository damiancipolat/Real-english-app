import React           from 'react';
import ReactDOM        from 'react-dom';

import './textbox.less';

class Textbox extends React.Component{

  constructor(props){

    super(props);
    this.state       = {text:''};
    this.updateValue = this.updateValue.bind(this);

  }

  updateValue(e){

    this.setState({text:e.target.value},()=>{
      this.props.onChange(this.state.text)
    });

  }

  render(){

    return (<div>
              <textarea cols="100" rows="10" onChange={this.updateValue}></textarea>              
            </div>);

  }

}

export default Textbox;