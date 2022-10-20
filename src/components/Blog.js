/* eslint-disable no-underscore-dangle */
import { put, del } from '../services/api';
import Togglable from './Togglable';

function Blog({ user, blog, mockLike }) {
  return (
    <div style={{ border: '1px solid black', margin: '0.25rem', padding: '0.25rem' }}>
      <p>{blog.title}</p>
      {' '}
      <p>{blog.author}</p>
      <Togglable openText="Show">
        <p>{blog.url}</p>
        <div>
          <p>Likes:</p>
          {' '}
          {blog.likes}
          <button
            type="button"
            onClick={() => {
              if (mockLike) {
                mockLike();
              } else {
                put(`/blogs/${blog._id}`, { likes: blog.likes + 1 });
              }
            }}
          >
            Like
          </button>
        </div>
        <p>{blog.user?.name}</p>
        {user._id === blog.user?._id && (
        <div style={{ marginBottom: '0.5rem' }}>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Do you want to delete this blog?')) {
                del(`/blogs/${blog._id}`).then((d) => alert('Deleted!'));
              }
            }}
          >
            Remove
          </button>

        </div>
        )}
      </Togglable>
    </div>
  );
}

export default Blog;
