import React, {Component} from 'react';
import EventList from './EventList'
import {
  Container,
  Divider,
  Header,
  Image,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class ContentContainer extends Component {
  render() {
    return (
      <div>
        <Container text style={{ marginTop: '2em' }}>
          <Header as='h1'><Image src='https://opensea.io/static/images/logos/opensea-logo.png' /> Activity Stream </Header>
          <Divider />
          <EventList events={this.props.events} userService={this.props.userService} />
        </Container>
      </div>
    );
  }
}

export default ContentContainer;