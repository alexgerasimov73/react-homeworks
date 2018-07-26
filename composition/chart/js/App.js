"use strict";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

class App extends React.Component {
  componentWillMount() {
    this.setState({
      data: [],
      series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
      labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
      colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
    })
  }

  componentDidMount() {
    this.populateArray();
    setInterval(this.populateArray.bind(this), 2000);
  }

  populateArray() {
    const series = 5;
    const serieLength = 5;

    let data = new Array(series).fill(new Array(serieLength).fill(0));
    data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);

    return (
      <section>
        <Charts {...this.state} max={max} type='' />
        <Charts {...this.state} max={max} type='stacked' />
        <Charts {...this.state} max={max} type='layered' />
        <Charts {...this.state} max={max} type='horizontal' />
        <Legend {...this.state} />
      </section>
    );
  }
}

const Charts = props => {
    const {data, colors, labels, series, max, type} = props;
    const chartsClass = type === 'horizontal' ? type : '';
    
    const showCharts = data.map((serie, serieIndex) => {
        const sortedSerie = serie.slice(0);
        sortedSerie.sort(compareNumbers);
        const sum = serie.reduce((carry, current) => carry + current, 0);
        const serieStyle = type === 'horizontal' ? {height: 'auto'} : {height: 250};
        const serieLabel = type === 'horizontal' ? series[serieIndex] : labels[serieIndex];
        const serieClass = type === 'horizontal' ? '' : type;
        const addProps = {
            serie: serie,
            serieClass: serieClass,
            serieLabel: serieLabel,
            serieStyle: serieStyle,
            serieIndex: serieIndex,
            sortedSerie: sortedSerie,
            sum: sum
        };
        const serieProps = Object.assign({}, props, addProps);
        return (
            <ChartsSerie {...serieProps} />
        );
    })
    return (
        <div className={`Charts ${chartsClass}`}>
            { showCharts } 
        </div>
    );
}

const ChartsItem = ({type, style, itemIndex, color, item}) => {
    return (
        <div className={`Charts--item ${type}`} style={ style } key={ itemIndex }>
                <b style={{ color: color }}>{ item }</b>
        </div>
    );
}

const ChartsSerie = props => {
    const {serie, serieClass, serieIndex, serieLabel, serieStyle, colors, itemIndex, sum, max, type, sortedSerie} = props;
    const showChartItems = serie.map((item, itemIndex) => {
        const color = colors[itemIndex];
        const size = type === 'stacked' ? (item / sum * 100) : (item / max * 100);
        const style = {
            backgroundColor: color,
            opacity: type === 'stacked' ? 1 : item/max + .05,
            zIndex: item,
            height: type === 'horizontal' ? '' : size + '%',
            width: type === 'horizontal' ? size + '%' : '',
            right: type === 'layered' ? ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%' : ''
        };
        const itemProps = {
            type: type,
            style: style,
            itemIndex: itemIndex,
            color: color,
            item: item
        }
        return (
            <ChartsItem {...itemProps} />
        );
    });
    return (
        <div className={`Charts--serie ${serieClass}`} key={ serieIndex } style={ serieStyle}>
                <label>{ serieLabel }</label>
                { showChartItems }
        </div>
    );
}

const Legend = ({labels, colors}) => {
    const showLabels = labels.map((label, labelIndex) => {
        return (
            <LegendItem label={label} labelIndex={labelIndex} colors={colors} />
        );
    });
    return (
        <div className="Legend">
            { showLabels }
      </div>
    );
}

const LegendItem = ({label, labelIndex, colors}) => {
    return(
        <div>
            <span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length] }} />
            <span className="Legend--label">{ label }</span>
        </div>
    );
}