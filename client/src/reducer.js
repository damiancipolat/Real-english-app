//Estructura del estado.
const estado ={
  status     : null,
  tokens     : [],
  text       : ''
};

// Preparamos nuestra funcion reducer
const processReducer = (state = estado, action) => {

  switch(action.type) {
    case 'proc-error':{
      state.status = 'error';
      return state;
    }
    break;    
    case 'loading':{
      state.status = 'loading';
      return state;
    }
    break;
    case 'process':{

      state.status = 'success';
      state.text   = action.payload;
      state.tokens = action.payload;
      console.log('*',state);
      return state;

    }
    break;
    default:
      return state;
  }

}

export default processReducer;