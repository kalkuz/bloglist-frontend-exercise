/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import { get, post } from './services/api';

function LoginForm({ setUser, setNotif }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const HandleLogin = () => {
    post('/login', { username, password })
      .then(({ data }) => {
        setUser({ _id: data._id, name: data.name, username: data.username });
        window.localStorage.setItem('token', data.token);
        setNotif({ type: 'success', message: 'Login successful' });
      })
      .catch((err) => setNotif({ type: 'error', message: 'Wrong username or password' }));
  };

  return (
    <form>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="button" onClick={HandleLogin}>login</button>
    </form>
  );
}

function BlogForm({ onCreate, setNotif, mockSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const CreateBlog = () => (mockSubmit ? mockSubmit() : post('/blogs', {
    title, author, url,
  })
    .then(({ data }) => {
      setNotif({ type: 'success', message: `A new blog '${data.title}' by ${data.author} was created` });
      onCreate();
    })
    .catch((err) => alert('An error occured. Try again')));

  return (
    <form>
      <div>
        Title
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="button" onClick={CreateBlog}>create</button>
    </form>
  );
}

function Notification({ message }) {
  if (message === null) {
    return null;
  }

  return (
    <div className={message.type}>
      {message.message}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notif, setNotif] = useState(null);

  const GetBlogs = () => get('/blogs').then((b) => setBlogs(b.data || [])).catch((err) => null);

  useEffect(() => {
    get('/me').then((d) => setUser({ _id: d.data._id, username: d.data.username, name: d.data.name } || null)).catch(() => null);
    GetBlogs();
  }, []);

  useEffect(() => {
    if (notif) {
      const timer = setTimeout(() => setNotif(null), 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react/function-component-definition
    return () => null;
  }, [notif]);

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notif} />
      {!user ? (
        <LoginForm setUser={setUser} setNotif={setNotif} />
      ) : (
        <>
          <p>
            {user.name}
            {' '}
            logged in.
            <button
              type="button"
              onClick={() => {
                setUser(null);
                window.localStorage.removeItem('token');
              }}
            >
              logout
            </button>
          </p>

          <Togglable openText="new blog">
            <div style={{ marginBottom: '1rem' }}>
              <h2>create new</h2>
              <BlogForm onCreate={() => GetBlogs()} setNotif={setNotif} />
            </div>
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog._id} user={user} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
export { BlogForm };
