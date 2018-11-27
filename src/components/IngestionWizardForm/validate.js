const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Campo Obbligatorio';
    }
    if (!values.lastName) {
      errors.lastName = 'Campo Obbligatorio';
    }
    if (!values.email) {
      errors.email = 'Campo Obbligatorio';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Indirizzo email non valido';
    }
    if(!values.tempopolling){
      errors.tempopolling = 'Campo Obbligatorio'
    }
    if(values.tempopolling==0 && !values.espressionecron){
      errors.espressionecron = 'Campo Obbligatorio'
    }
    if(values.tempopolling==1 && !values.timerunita){
      errors.timerunita = 'Campo Obbligatorio'
    }   
    if(values.tempopolling==1 && !values.timerquantita){
      errors.timerquantita = 'Campo Obbligatorio'
    }   
    if (!values.sex) {
      errors.sex = 'Campo Obbligatorio';
    }
    if (!values.favoriteColor) {
      errors.favoriteColor = 'Campo Obbligatorio';
    }
    if (!values.titolo) {
      errors.titolo = 'Campo Obbligatorio';
    } else {
      if(values.titolo.length>50){
        errors.titolo = 'Il Titolo non può superare i 50 caratteri';
      }
    }
    if (!values.categoria) {
      errors.categoria = 'Campo Obbligatorio';
    }
    if (!values.sottocategoria) {
      errors.sottocategoria = 'Campo Obbligatorio';
    }
    if (!values.tipodataset) {
      errors.tipodataset = 'Campo Obbligatorio';
    }
    if (!values.modalitacaricamento) {
      errors.modalitacaricamento = 'Campo Obbligatorio';
    }
    if (!values.gruppoproprietario) {
      errors.gruppoproprietario = 'Campo Obbligatorio';
    }
    if (!values.strategiamerge) {
      errors.strategiamerge = 'Campo Obbligatorio';
    }
    
    
    return errors;
    
  };
  
  export default validate;
  