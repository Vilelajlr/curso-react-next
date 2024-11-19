import P from 'prop-types';
import { PostCard } from '../PostCard';

import './styles.css';

export function Posts({ posts = [] }) {
  return (
    <div className="posts">
      {posts.map((posts) => (
        <PostCard cover={posts.cover} body={posts.body} title={posts.title} key={posts.id} />
      ))}
    </div>
  );
}

Posts.propTypes = {
  posts: P.arrayOf(
    P.shape({
      id: P.number.isRequired,
      title: P.string.isRequired,
      body: P.string.isRequired,
      cover: P.string.isRequired,
    }),
  ),
};
