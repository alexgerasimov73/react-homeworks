"use strict";

const FeedbackForm = ({ data, onSubmit }) => {
    let form;
    function sendForm (event) {
        event.preventDefault();
        let sendData = "";
        const formData = new FormData(form);
        for (const [key, value] of formData) {
            const field = selectField(key);
            sendData += `${field}: ${value}; `
        }
        onSubmit(sendData);
    }
    return (
        <form className="content__form contact-form" ref={element => form = element}>
            <div className="testing">
                <p>Чем мы можем помочь?</p>
            </div>
            <SalutationField salutation={data.salutation}/>
            <NameField name={data.name}/>
            <EmailField email={data.email}/>
            <QuestionField question={data.subject}/>
            <MessageField message={data.message}/>
            <BonusField bonuses={data.snacks}/>
            <button className="contact-form__button" onClick={sendForm} type="submit">Отправить сообщение!</button>
            <output id="result"/>
        </form>
    );
}

function selectField(key) {
    if (key === "salutation") return "Обращение";
    else if (key === "name") return "Имя";
    else if (key === "email") return "Адрес электронной почты";
    else if (key === "subject") return "Причина обращения";
    else if (key === "message") return "Текст сообщения";
    return "Хочет получить";
}

const SalutationField = ({salutation}) => {
    return (
        <div className="contact-form__input-group">
            <SalutationInput value="Мистер" id="salutation-mr" salutation={salutation}/>
            <SalutationLabel value="Мистер" id="salutation-mr"/>
            <SalutationInput value="Миссис" id="salutation-mrs" salutation={salutation}/>
            <SalutationLabel value="Миссис" id="salutation-mrs"/>
            <SalutationInput value="Мисс" id="salutation-ms" salutation={salutation}/>
            <SalutationLabel value="Мисс" id="salutation-ms"/>
        </div>
    );
}

const SalutationInput = ({ value, salutation, id }) => {
    if (value === salutation) {
        return (
            <input defaultChecked className="contact-form__input contact-form__input--radio" id={id} name="salutation" type="radio" value={value} />
            );
    }
    return (
        <input className="contact-form__input contact-form__input--radio" id={id} name="salutation" type="radio" value={value} />
        );
}

const SalutationLabel = ({ value, id }) => {
    return (
        <label className="contact-form__label contact-form__label--radio" htmlFor={id}>{value}</label>
        );
}

const NameField = ({ name }) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="name">Имя</label>
            <input className="contact-form__input contact-form__input--text" defaultValue={name} id="name" name="name" type="text"/>
        </div>
    );
}

const EmailField = ({ email }) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="email">Адрес электронной почты</label>
            <input className="contact-form__input contact-form__input--email" defaultValue={email} id="email" name="email" type="email"/>
        </div>
    );
}

const QuestionField = ({ question }) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="subject">Чем мы можем помочь?</label>
            <select className="contact-form__input contact-form__input--select" defaultValue={question} id="subject" name="subject">
                <option>У меня проблема</option>
                <option>У меня важный вопрос</option>
            </select>
        </div>
    );
}

const MessageField = ({ message }) => {
    return (
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="message">Ваше сообщение</label>
            <textarea className="contact-form__input contact-form__input--textarea" defaultValue={message} 
                id="message" name="message" rows="6" cols="65"></textarea>
        </div>
    );
}

const BonusField = ({ bonuses }) => {
    return (
        <div className="contact-form__input-group">
            <p className="contact-form__label--checkbox-group">Хочу получить:</p>
                <BonusInput value="пицца" id="snacks-pizza" bonuses={bonuses}/>
                <BonusLabel value="Пиццу" id="snacks-pizza"/>
                <BonusInput value="пирог" id="snacks-cake" bonuses={bonuses}/>
                <BonusLabel value="Пирог" id="snacks-cake"/>
        </div>
    );
}

const BonusInput = ({ value, id, bonuses }) => {
    if (bonuses) {
        const filter = bonuses.filter(bonus => bonus === value);
        if(filter.length === 1) {
            return (
                <input defaultChecked className="contact-form__input contact-form__input--checkbox" id={id} name="snacks" type="checkbox" value={value} />
                );
        }  
    }
    return (
        <input className="contact-form__input contact-form__input--checkbox" id={id} name="snacks" type="checkbox" value={value} />
        );
}

const BonusLabel = ({ value, id }) => {
    return (
        <label className="contact-form__label contact-form__label--checkbox" htmlFor={id}>{value}</label>
        );
}