import React, {Component} from 'react';
import CommentSection from './CommentSection'
import { Feed, Icon, Transition } from 'semantic-ui-react'
import moment from 'moment';
import 'semantic-ui-css/semantic.min.css'

class EventListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentsVisible: false,
      numLikes: 0,
      heartStyle: 'heart outline'
    };

    // This code purely for animation purposes
    if (props.event.isNew) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  }

  componentDidMount() {
    this.isVisible = true;
  }

  onCommentClick() {
    this.setState({
      commentsVisible: !this.state.commentsVisible
    })
  }

  onLikeClick() {
    this.setState({
      numLikes: 1,
      heartStyle: 'heart',
    })
  }

  render() {

    let comments = <div />;
    if (this.state.commentsVisible) {
      comments = <CommentSection userService={this.props.userService} id={this.props.event.id} comments={this.props.event.comments} />;
    }

    return (
      <Transition animation='bounce' duration='1000' visible={this.isVisible}>
        <Feed.Event>
          <Feed.Label>
            <img src={this.props.event.profImgUrl} alt='profile' />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User href={this.props.event.buyerAddressUrl}>{this.props.event.buyer}</Feed.User> bought {this.props.event.assetName}
              <Feed.Date>{moment.utc(this.props.event.eventTimestamp).fromNow()}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra images>
              <a href={this.props.event.permaLink}>
                <img src={this.props.event.assetImgUrl} alt='asset' />
              </a>
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like onClick={this.onLikeClick.bind(this)}>
                <Icon name={this.state.heartStyle} size='big' />
                {this.state.numLikes} Likes
              </Feed.Like>
              <Feed.Like onClick={this.onCommentClick.bind(this)}>
                  <Icon name='comment outline' size='big' />
                  {this.props.event.comments.length} Comments
              </Feed.Like>
            </Feed.Meta>
            {comments}
          </Feed.Content>
        </Feed.Event>
      </Transition>
    );
  }
}

export default EventListItem;