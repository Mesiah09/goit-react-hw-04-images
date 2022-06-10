import PropTypes from 'prop-types';
import s from './gallery.module.scss';
import GalleryItem from './GalleryItem';
export default function Gallery({ items, onClick }) {
  return (
    <ul className={s.gallery}>
      {items.map(item => (
        <GalleryItem key={item.id} item={item} onClick={onClick} />
      ))}
    </ul>
  );
}
Gallery.defaultProps = {
  items: [],
  onClick: function () {},
};
Gallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ),
};
