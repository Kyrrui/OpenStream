import React, {Component} from 'react';
import CommentList from './CommentList';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentString: '',
    };
  }

  handleTextChange(e) {
    this.setState({commentString: e.target.value});
  }

  onCommentClick(e) {
    this.props.userService.addComment(this.props.id, this.state.commentString);
  }

  render() {
    return (
        <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>
          <CommentList comments={this.props.comments}/>
          <Form reply>
            <Form.TextArea onChange={this.handleTextChange.bind(this)} />
            <Button onClick={this.onCommentClick.bind(this)} content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
    );
  }
}

export default CommentSection;