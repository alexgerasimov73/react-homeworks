"use strict";

class AuthForm extends React.Component {
    render() {
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
            if (this.props.onAuth && typeof this.props.onAuth === "function") {
                this.props.onAuth(user);
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
                <Input required type="text" name="Имя" onSubmit={send} onAuth={this.props.onAuth}/>
                <Input required={false} type="email" name="Электронная почта" onSubmit={send} onChange={formatText} onAuth={this.props.onAuth}/>
                <Input required type="password" name="Пароль" onSubmit={send} onChange={formatText} onAuth={this.props.onAuth}/>
                <Button type="submit" onClick={send}/>
            </form>
        )
    }
}

class Input extends React.Component {
    render() {
        const required = this.props.required ? true : false;
        const onChange = this.props.onChange ? (event) => this.props.onChange(event, this.props.type) : false;
        return (
            <div className="Input">
                <input required={required} 
                       type={this.props.type} 
                       placeholder={this.props.name} 
                       onSubmit={event => this.props.onSubmit(event)} 
                       onChange={onChange}/>
                <label />
            </div>
        );
    }
}

class Button extends React.Component {
    render() {
        return (
            <button type={this.props.type} onClick={this.props.onClick}>
                <span>Войти</span>
                <i className="fa fa-fw fa-chevron-right"></i>
            </button>
        );
    }
}