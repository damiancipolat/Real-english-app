import React           from 'react';
import ReactDOM        from 'react-dom';

class Search extends React.Component{

  constructor(props){
    super(props);
    this.state       = {text:''};
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(e){

    this.setState({text:e.target.value},()=>{
      this.props.onFind(this.state.text);  
    });
    
  }

  render(){
    return (<input type="text" onChange={this.updateValue} value={this.state.text}/>);
  }

}

export default Search;