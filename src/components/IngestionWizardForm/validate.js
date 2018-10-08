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
    if (!values.sex) {
      errors.sex = 'Campo Obbligatorio';
    }
    if (!values.favoriteColor) {
      errors.favoriteColor = 'Campo Obbligatorio';
    }
    if (!values.titolo) {
      errors.titolo = 'Campo Obbligatorio';
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
    
    return errors;
    
  };
  
  export default validate;
  