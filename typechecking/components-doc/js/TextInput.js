'use strict';

const TextInput = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input type={props.type} className="form-control" name={props.name} onChange={props.onChange}
             value={props.value} required={props.required}/>
    </div>
  )
};

TextInput.propTypes = {
  label: PropTypes.oneOf(['Email', 'Имя', 'Фамилия', 'Пароль']),
  type: PropTypes.oneOf(['text', 'email', 'password']),
  name: PropTypes.oneOf(['email', 'first_name', 'last_name', 'password']),
  onChange: PropTypes.func,
  value: (props, propName, componentName) => {
    if (props.type === 'email') {
      if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(props[propName]))) {
        return new Error("Неверный формат");
      }
      return null;
    }
    if (props.type === 'text') {
      if (typeof props.value === 'string') return null;
      return new Error("Неверный формат");
    }
  }
}