'use strict';

const DateTime = props => {
    return (
        <p className="date">{props.date}</p>
    )
};

function correctDate (Component) {
    function calculateDate(date) {
        date = date.split(' ');
        const dateArray = date[0].split('-').concat(date[1].split(':')).map((el, index) => {
            el = Number(el);
            if (index === 1) el -= 1;
            return el;
        });
        const [year, month, day, hour, minutes, seconds] = dateArray;
        const videoDate = new Date(year, month, day, hour, minutes, seconds);
        const currentDate = new Date();
        const minutesDifference = Math.ceil((currentDate.getTime() - videoDate.getTime()) / 1000 / 60);
        return renderDate(minutesDifference);
    }
    
    function renderDate(difference) {
        let time, differenceRender;
        if (difference < 60) {
            time = 'минут';
            differenceRender = difference;
        } else if (difference < 1440) {
            differenceRender = Math.ceil(difference / 60);
            if (differenceRender === 1 || differenceRender === 21) time = 'час';
            else if (differenceRender === 2 || differenceRender === 3 || differenceRender === 4 || differenceRender == 22 || differenceRender == 23) time='часа';
            else time = 'часов';
        } else {
            differenceRender = Math.ceil(difference / 60 / 24);
            const lastDigit = Number(differenceRender.toString().slice(-1));
            if (lastDigit === 1) time = 'день';
            else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) time = 'дня';
            else time = 'дней'
        }
        return `${differenceRender} ${time} назад`
    }
    
    return class extends React.Component {
        render () {
            const dateToRender = calculateDate(this.props.date);
            return <Component date={dateToRender} />
        }
    }
}