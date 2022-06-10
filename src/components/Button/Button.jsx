import PropTypes from 'prop-types';
import s from './button.module.scss';
export default function Button({ onClick, text }) {
  return (
    <button className={s.button} type="button" onClick={onClick}>
      {text}
    </button>
  );
}
Button.defaultProps = {
  onClick: function () {},
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
