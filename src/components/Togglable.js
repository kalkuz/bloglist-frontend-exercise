import { useState } from 'react';
import PropTypes from 'prop-types';

function Togglable({ children, openText }) {
  const [open, setOpen] = useState(false);

  return (open ? (
    <>
      {children}
      <button type="button" onClick={() => setOpen(false)}>Cancel</button>
    </>
  ) : (
    <button type="button" onClick={() => setOpen(true)}>{openText}</button>
  ));
}

Togglable.propTypes = {
  openText: PropTypes.string.isRequired,
};

export default Togglable;
