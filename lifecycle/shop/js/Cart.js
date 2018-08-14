class Cart extends React.Component {

  shouldComponentUpdate(nextProps) {
    if ( (this.props.isOpen || nextProps.isOpen) && this.props.items.length != nextProps.items.length) return true; 
    return nextProps.isOpen === true ? true : this.props.isOpen === true ? true : false;
  }

  render() {
    return (
      <CartView {...this.props} />
    );
  }

}