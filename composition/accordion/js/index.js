'use strict';

class Accordian extends React.Component {
    render() {
        const {content, title} = this.props;
        const list = this.props.list ? this.props.list : content.length;
        const showSections = [];
        for(let i = 0; i < list; i++) {
            showSections.push(<AccordianSection content={content[i]} />);
        }

        return(
            <main className='main'>
                <h2 className='title'>{title}</h2>
                { showSections }
            </main>
        );
    }
}

class AccordianSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }

    toggleSection() {
        this.setState({hidden: !this.state.hidden});
    }

    render() {
        const {id, title, text} = this.props.content;
        const isOpened = this.state.hidden ? '' : 'open';
        return(
            <section className={`section ${isOpened}`} key={id}>
                <button>toggle</button>
                <h3 className='sectionhead' onClick={this.toggleSection.bind(this)}>{title}</h3>
                <div className='articlewrap'>
                    <div className='article'>{text}</div>
                </div>
            </section>
        );
    }
}