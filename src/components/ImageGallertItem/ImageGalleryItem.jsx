import PropTypes from 'prop-types';
import css from './ImageGallerItem.module.css';

export const ImageGalleryItem = ({ bigImg, smallImg, tags, onClick }) => {
  const handleImgClick = imgURL => {
    imgURL = bigImg;
    onClick(imgURL);
  };

  return (
    <li className={css.galleryItem} onClick={handleImgClick}>
      <img
        className={css.image}
        src={smallImg}
        modalimg={bigImg}
        alt={tags}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  smallImg: '#',
  bigImg: '#',
  tags: 'some image',
  id: Math.random(),
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImg: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
