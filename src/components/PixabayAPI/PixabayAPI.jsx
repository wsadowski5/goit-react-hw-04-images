import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const url = 'https://pixabay.com/api/';
const apiKey = '39805913-a4bc2a6c03690a5e9014989d5';

export const useFetchData = (query, pageNumber, perPage) => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null)

  useEffect(() => {
    if (query === '') return;
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: response } = await axios.get(url, {
          params: {
            key: apiKey,
            q: query,
            page: pageNumber,
            per_page: perPage,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
          },
        });
        setImages(prevImages => [...prevImages, ...response.hits]);
        setTotalHits(response.totalHits)
      } catch (error) {
        console.error('ERROR:', error);
        alert(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, perPage, pageNumber]);

  return {
    images,
    isLoading,
    totalHits,
  };
};

useFetchData.propsTypes = {
    query: PropTypes.string.isRequired, 
    pageNumber: PropTypes.number.isRequired, 
    perPage: PropTypes.number.isRequired,
}