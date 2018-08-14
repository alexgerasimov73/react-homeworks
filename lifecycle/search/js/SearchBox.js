class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.isFixed = this.isFixed.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.state = { fixed: false };
  }
  
  componentDidMount() {
    this.searchBox = document.querySelector('.search-box');
    this.isFixed();
    window.addEventListener('scroll', this.setPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setPosition);
  }

  render() {
    return <SearchBoxView fixed={this.state.fixed} />
  }

  isFixed() {
    if (this.searchBox.getBoundingClientRect().y <= 0) return true;
    return false;
  }

  setPosition() {
    if (this.isFixed()) {
      this.setState({fixed: true})
    } else {
      this.setState({fixed: false})
    }
  }
}