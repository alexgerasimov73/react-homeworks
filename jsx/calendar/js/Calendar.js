function Calendar({date}) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const currentDate = date.getDate();
    const weekDay = date.getDay();
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
    const monthNamesChanged = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ];
    const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье' ];
    return (
        <div className="ui-datepicker">
            <MaterialHeader year={year} month={month} currentDate={currentDate} weekDay={weekDay} dayNames={dayNames} monthNamesChanged={monthNamesChanged}/>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{monthNames[month]}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col className="ui-datepicker-week-end"/>
                    <col className="ui-datepicker-week-end"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <CalendarBody year={year} month={month} currentDate={currentDate} weekDay={weekDay} />
            </table>
        </div>
    );
}

function MaterialHeader({year, month, currentDate, weekDay, dayNames, monthNamesChanged}) {
    return (
        <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{dayNames[weekDay]}</div>
            <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{currentDate}</div>
                <div className="ui-datepicker-material-month">{monthNamesChanged[month]}</div>
                <div className="ui-datepicker-material-year">{year}</div>
            </div>
        </div>
    );
}

function CalendarBody({year, month, currentDate, weekDay}) {
    const monthFirstDay = new Date(year, month, 1).getDay();
    const monthLastDay = new Date(year, month + 1, 0).getDay();
    const monthLastDate = new Date(year, month + 1, 0).getDate();
    const previousMonthLastDate = new Date(year, month, 0).getDate();

    const amountPreviousDays = getDaysAmountPreviousMonth(monthFirstDay);
    const amountNextDays = getDaysAmountNextMonth(monthLastDay);
    const datesPreviousMonth = getDatesOtherMonth(amountPreviousDays, previousMonthLastDate);
    const datesNextMonth = getDatesOtherMonth(amountNextDays);
    const datesThisMonth = getDatesThisMonth(1, monthLastDate, currentDate);
    const datesAll = datesPreviousMonth.concat(datesThisMonth).concat(datesNextMonth);
    const weeks = getWeeks(datesAll, 7);

    return(
        <tbody>
            {weeks.map(week => CalendarRow(week))}
        </tbody>
    );
}

function CalendarRow(week) {
    return (
        <tr>
            {week.map(day => CalendarDay(day))}
        </tr>
    )
}

function CalendarDay(day) {
    return(
        <td className={day.cls}>{day.date}</td>
    );
}

function getDatesOtherMonth(daysAmount, previousMonthLastDate = false) {
    const daysArray = [];
    for(let i = 0; i < daysAmount; i++) {
        let day = {cls: 'ui-datepicker-other-month'};
        if(previousMonthLastDate) {
            day.date = previousMonthLastDate;
            previousMonthLastDate--;
        } else {
            day.date = i + 1
        };     
        daysArray.push(day);
    }
    return daysArray;
}

function getDatesThisMonth(firstDay, lastDay, currentDate) {
    const daysArray = [];
    for(let i = 0; i < lastDay; i++) {
        let day = {date: i + 1};
        if (i + 1 === currentDate) {
            day.cls = 'ui-date-picker-today'
        }
        daysArray.push(day);
    }
    return daysArray;
}

function getDaysAmountPreviousMonth(monthFirstDay) {
    if(monthFirstDay === 0) return 6;
    if(monthFirstDay === 1) return 0;
    return monthFirstDay - 1
}

function getDaysAmountNextMonth(monthLastDay) {
    if(monthLastDay === 0) return 0;
    return 7 - monthLastDay;
}

function getWeeks(dates, weekLength) {
    const weeks = [];
    for(let i = 0; i < dates.length; i+=weekLength) {
        const week = dates.slice(i, i + weekLength);
        weeks.push(week);
    }
    return weeks;
}