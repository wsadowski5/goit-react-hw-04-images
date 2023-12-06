// import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { useFetchData } from './PixabayAPI/PixabayAPI';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { useState } from 'react';

export const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const [perPage] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImgURL, setModalImgURL] = useState('');

  const { images, isLoading, totalHits, resetImages } = useFetchData(
    query,
    pageNumber,
    perPage
  );

  const handleSubmitForm = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = e.target[1].value;
    const pageNumber = 1;

    if ( inputValue !== query){
      resetImages()
    }
    setQuery(inputValue);
    setPageNumber(pageNumber);
    form.reset();
    console.log(images)
    images.forEach((image)=> console.log(image.id))
  };


  const handleOpenModal = imgURL => {
    setIsModalOpen(true);
    setModalImgURL(imgURL);
    document.addEventListener('keyup', event => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    });
  };

  const handleCloseModal = e => {
    setIsModalOpen(false);
    document.removeEventListener('keyup', event => {});
  };

  const loadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div>
      <Searchbar handleSearch={handleSubmitForm} />
      <ImageGallery data={images} onClick={handleOpenModal} />
      {isLoading ? <Loader /> : null}
      {totalHits > perPage && <Button onClick={loadMore} />}
      {isModalOpen && (
        <Modal handleClose={handleCloseModal} modalImage={modalImgURL} />
      )}
    </div>
  );
};
