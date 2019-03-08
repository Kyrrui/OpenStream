import React from 'react';
import { Comment } from 'semantic-ui-react'
import moment from 'moment';
import 'semantic-ui-css/semantic.min.css'

const CommentList = ((props) => {
  let comments = [];
  let i = 0;
  if (props.comments && props.comments.length) {
    comments = props.comments.map((comment) => {
      i++;
      return (
        <Comment key={i}>
          <Comment.Avatar src={comment.userImgUrl} />
          <Comment.Content>
            <Comment.Author as='a' href={comment.profLink} >{comment.userName}</Comment.Author>
            <Comment.Metadata>
              <div>{moment.utc(comment.date).fromNow()}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.content}</Comment.Text>
          </Comment.Content>
        </Comment>
      );
    })
  }

  return (
    <div>
      {comments}
    </div>
  );
})

export default CommentList;