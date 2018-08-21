"use strict";

const AuthForm = ({ onAuth }) => {
    const send = event => {
        event.preventDefault();
        const user = {};
        Array.from(document.querySelector("form")).forEach(el => {
            if (el.value) {
                if (el.type === "text") {
                    return user.name = el.value;
                }
                user[el.type] = el.value;
            }
        });
        if (onAuth && typeof onAuth === "function") {
            onAuth(user);
        }
    }

    function formatText(event, type) {
        if (type === "email") {
            event.currentTarget.value = event.currentTarget.value.replace(/[^A-Za-z0-9@._-]/g,'');
        } else {
            event.currentTarget.value = event.currentTarget.value.replace(/[^A-Za-z0-9_]/g,'');
        }
    }
    return (
        <form className="ModalForm" action="/404/auth/" method="POST">
            <Input required type="text" name="Имя" onSubmit={send} onAuth={onAuth}/>
            <Input required={false} type="email" name="Электронная почта" onSubmit={send} onChange={formatText} onAuth={onAuth}/>
            <Input required type="password" name="Пароль" onSubmit={send} onChange={formatText} onAuth={onAuth}/>
            <Button type="submit" onClick={send}/>
        </form>
    )
}

const Input = ({ required, onChange, type, name, onSubmit }) => {
	  const boolean = required ? true : false;
	  const changed = onChange ? (event) => onChange(event, type) : false;
	  return (
	    <div className="Input">
	      <input required={boolean} 
	        type={type} 
	        placeholder={name} 
	        onSubmit={event => onSubmit(event)} 
	        onChange={changed}/>
	      <label />
	    </div>
    );
}

const Button = ({ type, onClick }) => {
    return (
        <button type={type} onClick={onClick}>
            <span>Войти</span>
            <i className="fa fa-fw fa-chevron-right"></i>
        </button>
    );
}