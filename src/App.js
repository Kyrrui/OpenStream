import React, {Component} from 'react';
import ContentContainer from './components/ContentContainer';
import Services from './services/Services';

class App extends Component {
  constructor(props) {
    super(props);
    this.services = props.services || new Services();
    this.state = {events: []};
    this.openSeaEventService = this.services.openSeaEventService
    this.userService = this.services.userService
  }

  componentDidMount() {
    this.services.start();
    this.openSeaEventService.subscribe(this.setState.bind(this));
  }

  componentWillUnmount() {
    this.services.stop();
    this.openSeaEventService.unsubscribeAll();
  }

  render() {
    return (
      <div>
        <ContentContainer events={this.state.events} userService={this.userService} />
      </div>
    );
  }
}

export default App;