const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Campo obbligatorio, nessun file caricato.'
  }
  if (!values.ownership) {
    errors.ownership = 'Campo obbligatorio'
  }
  if (!values.nome) {
    errors.nome = 'Campo obbligatorio'
  }
  if (!values.notes) {
    errors.notes = 'Campo obbligatorio'
  }
  if (!values.theme) {
    errors.theme = 'Campo obbligatorio'
  }
  if (!values.license1) {
    errors.license1 = 'Campo obbligatorio'
  }
  if (!values.editor) {
    errors.editor = 'Campo obbligatorio'
  }
  if (!values.email) {
    errors.email = 'Campo obbligatorio'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.domain) {
    errors.domain = 'Campo obbligatorio'
  }
  if (!values.subdomain) {
    errors.subdomain = 'Campo obbligatorio'
  }
  

  return errors
}

export default validate
