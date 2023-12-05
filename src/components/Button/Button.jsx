import { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';




export const Button = ({onClick}) => {
  return (<div className={css.buttonWrapper}>
    <button type="button" className={css.Button} onClick={onClick}>
      Load more
    </button>
    </div>
  );
}


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}