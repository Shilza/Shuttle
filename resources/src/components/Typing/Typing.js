import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

const Typing = ({ className }) => {
  const [countOfDots, setCountOfDots] = useState(3);

  useEffect(() => {
    const id = setTimeout(() => {
      setCountOfDots(countOfDots === 3 ? 1 : countOfDots + 1)
    }, 300);
    return () => clearTimeout(id);
  });

  return (
    <span className={className}>is typing {'.'.repeat(countOfDots)}</span>
  )
};

Typing.propTypes = {
  className: PropTypes.string
};

export default Typing;
