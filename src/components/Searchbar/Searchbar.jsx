import PropTypes from 'prop-types';
import { useState } from 'react';

import s from './searchbar.module.scss';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <header className={s.searchBar}>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <button type="submit" className={s['searchForm-button']}>
          <span className={s['searchForm-button-label']}>Search</span>
        </button>

        <input
          value={search}
          name="search"
          onChange={handleChange}
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

Searchbar.defaultProps = {
  onSubmit: function () {},
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
