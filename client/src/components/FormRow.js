import React from 'react'

function FormRow({ type, name, handleChange, labelText, value}) {
  return (
    <div className='form-row'> 
        <label htmlFor={name} className='name'>{labelText || name}</label>
        <input type={type} className='form-input' name={name} value={value} onChange={handleChange} />
    </div>
  )
}

export default FormRow