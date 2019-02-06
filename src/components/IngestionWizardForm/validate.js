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
    if(!values.timerunita){
      errors.timerunita = 'Campo Obbligatorio'
    }   
    if(!values.timerquantita){
      errors.timerquantita = 'Campo Obbligatorio'
    }  
    if(isNaN(values.timerquantita)){
      errors.timerquantita = 'Il campo deve essere un numero'
    }
    if(values.timerquantita < 0){
      errors.timerquantita = 'Il campo deve essere un numero positivo'
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
      if(values.titolo.trim().length===0){
        errors.titolo = 'Campo Obbligatorio';
      }
    }
    if(!values.nome && values.titolo && values.titolo.length>0){
      errors.nome = 'Non è stato possibile costruire il nome dal titolo. Il titolo non può contenere solo caratteri speciali'
    }
    if(!values.descrizione){
      errors.descrizione = 'Campo Obbligatorio'
    }
    if(!values.urlws){
      errors.urlws = 'Campo Obbligatorio'
    }
    if(!values.filesftp){
      errors.filesftp = 'Campo Obbligatorio'
    }
    if (!values.categoria) {
      errors.categoria = 'Campo Obbligatorio';
    }
    if (!values.sottocategoria) {
      errors.sottocategoria = 'Campo Obbligatorio';
    }
    if (!values.licenza) {
      errors.licenza = 'Campo Obbligatorio';
    }
    if(!values.ultimamodifica){
      errors.ultimamodifica = 'Campo Obbligatorio';
    }
    if (!values.ownership) {
      errors.ownership = 'Campo Obbligatorio';
    }
    if (!values.frequenzaaggiornamento) {
      errors.frequenzaaggiornamento = 'Campo Obbligatorio';
    }
    // if (!values.seguestd) {
    //   errors.seguestd = 'Campo Obbligatorio';
    // }
    if (!values.tipoingestiondati) {
      errors.tipoingestiondati = 'Campo Obbligatorio';
    }
    if (!values.tiposalvataggio) {
      errors.tiposalvataggio = 'Campo Obbligatorio';
    }
    if (!values.strategiamerge) {
      errors.strategiamerge = 'Campo Obbligatorio';
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
    
    return errors;
    
  };
  
  export default validate;
  