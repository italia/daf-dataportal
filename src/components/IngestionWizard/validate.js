const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Campo obbligatorio, nessun file caricato.'
  }
  if (!values.editor) {
    errors.editor = 'Campo obbligatorio'
  }
  if (!values.email) {
    errors.email = 'Campo obbligatorio'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

export default validate
