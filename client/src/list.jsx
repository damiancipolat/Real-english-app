import React           from 'react';
import ReactDOM        from 'react-dom';

class List extends React.Component{

  constructor(props){

    super(props);
    console.log('@',this.state);
  }

  render(){

    let paises = this.props.list.paisesList.map((pais,index)=><li key={index}>{pais}</li>);
    return (<ul>{paises}</ul>);

  }

}

export default List;