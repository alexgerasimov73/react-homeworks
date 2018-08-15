'use strict';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        axios.get('https://api.myjson.com/bins/l2s9l').then(response => {
            this.setState(response.data);
        });
    }

    render() {
        return (
            <div id="app">
                <SortedMonth list={this.state.list} />
                <SortedYear list={this.state.list} />
                <SortedTable list={this.state.list} />
            </div>
        );
    }
};

const SortedMonth = sort(MonthTable, 'month');
const SortedYear = sort(YearTable, 'year');
const SortedTable = sort(SortTable, 'sort')

function sort(Component, type) {
    function changeList (list) {
        list.sort(compareDates);
        if (type === 'month' || type == 'year') {
            const sortedList = list.map(item => {
                const month = new Date(item.date).toLocaleDateString('en-US', {month: 'short'});
                const year = new Date(item.date).getFullYear();
                if (type === 'month') {
                    return {month: month, amount: item.amount};
                } else {
                    return {year: year, amount: item.amount};
                }
            });

            return sortedList.reduce((accum,item) => {
                const checkIndex = accum.findIndex(itemToFind => itemToFind[type] === item[type]);
                if (checkIndex != -1) {
                    accum[checkIndex].amount += item.amount;
                } else {
                    accum.push(item);
                }
                return accum;
            }, []);
        }
        return list;
    }

    function compareDates(a,b) {
        const first = new Date(a.date).getTime();
        const second = new Date(b.date).getTime();
        return first - second;
    }

    return class extends React.Component {
        render() {
            const sortedList = changeList(this.props.list);
            return <Component {...this.props} list={sortedList} />
        }
    }
}