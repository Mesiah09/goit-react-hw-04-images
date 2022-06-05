import s from './galleryItem.module.scss';
export default function GalleryItem({ item, onClick }) {
  return (
    <li className={s.galleryItem}>
      <img
        onClick={() => {
          onClick(item.largeImageURL, item.tags);
        }}
        className={s.image}
        src={item.webformatURL}
        alt={item.tags}
      />
    </li>
  );
}
