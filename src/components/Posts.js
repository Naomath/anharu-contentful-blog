import React from 'react';
import PostItem from './PostItem';

const Posts = ({posts: posts}) => (
  <div>
    {
      posts.map(post => <PostItem post={post} />)
    }
  </div>
);

export default Posts;
