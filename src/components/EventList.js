import React from 'react';
import EventListItem from './EventListItem'
import { Feed } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const EventList = ((props) => {
  let events = [];
  if (props.events) {
    events = props.events.map((event) => {
      return <EventListItem key={event.id} event={event} userService={props.userService} />
    })
  }

  return (
    <Feed>
      {events}
    </Feed>
  );
})

export default EventList;