/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { BlogForm } from '../App';

test('renders content', () => {
  const blog = {
    title: 'Component testing',
    url: 'a url',
    author: 'Oguzhan',
  };

  render(<Blog user={{}} blog={blog} />);

  const element = screen.getByText('Component testing');
  expect(element).toBeDefined();
});

test('show url after toggle', async () => {
  const blog = {
    title: 'Component testing',
    url: 'a url',
    author: 'Oguzhan',
  };

  render(<Blog user={{}} blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText('Show');
  await user.click(button);

  const element = screen.getByText('a url');
  expect(element).toBeDefined();
});

test('show likes after toggle', async () => {
  const blog = {
    title: 'Component testing',
    url: 'a url',
    author: 'Oguzhan',
  };

  render(<Blog user={{}} blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText('Show');
  await user.click(button);

  const element = screen.getByText('Likes:');
  expect(element).toBeDefined();
});

test('Like clicked twice', async () => {
  const blog = {
    title: 'Component testing',
    url: 'a url',
    author: 'Oguzhan',
  };

  const mockHandler = jest.fn();

  render(<Blog user={{}} blog={blog} mockLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('Show');
  await user.click(button);

  const likeButton = screen.getByText('Like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('Form filled and sent', async () => {
  const mockHandler = jest.fn();

  render(<BlogForm mockSubmit={mockHandler} />);

  const inputs = screen.getAllByRole('textbox');

  const user = userEvent.setup();
  await user.type(inputs[0], 'testing a form');
  await user.type(inputs[1], 'testing a form');
  await user.type(inputs[2], 'testing a form');

  const button = screen.getByText('create');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
