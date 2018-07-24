'use strict'

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: "All"
    };
  }
  
  onSelectFilter(filter) {
    this.setState({selected: filter});
  }
  
  filterProjects() {
    if(this.state.selected != "All") {
      return this.props.projects.filter(project => project.category === this.state.selected);
    }
    return this.props.projects;
  }
  
  render() {
    return (
      <div>
        <Toolbar
          filters={this.props.filters}
          selected={this.state.selected}
          onSelectFilter={this.onSelectFilter.bind(this)}
        />
        <Portfolio projects={this.filterProjects()} />
      </div>
    );
  }
}
