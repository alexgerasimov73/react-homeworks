class SubscribeForm extends React.Component {
    render() {
        return (
            <div className="subscribe__form">
                <Form />
            </div>
        )
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false
        }
    }

    handleChange(event) {
        this.setState({
            value: event.currentTarget.validity.valid
        })
    }

    render() {
        const validationCheck = this.state.value ? 'is-valid' : 'is-error';
        return (
            <form className={`form form--subscribe ${validationCheck}`}>
                    <h4 className="form-title">Подписаться:</h4>
                    <div className="form-group">
                        <label htmlFor="input-email" className="sr-only">Email</label>
                        <input type="email" id="input-email" placeholder="Email" className="form-control" onChange={this.handleChange.bind(this)}/>
                        <div className="form-error">Пожалуйста, проверьте корректность адреса электронной почты</div>
                        <button type="submit" className="form-next">
                            <i className="material-icons">keyboard_arrow_right</i>
                        </button>
                    </div>
            </form>
        )
    }
}