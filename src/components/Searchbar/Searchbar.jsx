import PropTypes from 'prop-types';
import { Component } from 'react';

import s from './searchbar.module.scss';

export default class Searchbar extends Component {
  state = {
    search: '',
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
  };
  render() {
    return (
      <header className={s.searchBar}>
        <form onSubmit={this.handleSubmit} className={s.searchForm}>
          <button type="submit" className={s['searchForm-button']}>
            <span className={s['searchForm-button-label']}>Search</span>
          </button>

          <input
            value={this.state.search}
            name="search"
            onChange={this.handleChange}
            className={s['searchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.defaultProps = {
  onSubmit: function () {},
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
