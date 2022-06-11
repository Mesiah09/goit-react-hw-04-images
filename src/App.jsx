import Gallery from 'components/Gallery';
import Button from 'components/Button';
import Searchbar from 'components/Searchbar';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { useState, useEffect } from 'react';
const axios = require('axios').default;
export default function App() {
  const [page, setPage] = useState(1);
  const [key, setKey] = useState('');
  const [fetchElements, setFetchElements] = useState({
    loading: false,
    error: null,
    items: [],
  });
  // const [error, setError] = useState(null)
  // const [items, setItems] = useState([])
  const [modal, setModal] = useState({ appearance: false, modalContent: {} });

  useEffect(() => {
    if (!key) return;
    setFetchElements(prev => {
      return { ...prev, loading: true, error: null };
    });
    try {
      async function getData() {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${key}&page=${page}&key=27028263-30a4c0e676d46eddbf4883679&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (page === 1)
          setFetchElements(prev => {
            return { ...prev, loading: false, items: response.data.hits };
          });
        else
          setFetchElements(prev => {
            return {
              ...prev,
              loading: false,
              items: [...prev.items, ...response.data.hits],
            };
          });
      }
      getData();
    } catch (e) {
      setFetchElements(prev => {
        return { ...prev, loading: false, error: e };
      });
      alert(fetchElements.error);
    }
  }, [key, page, fetchElements.error]);

  const showModal = (url, tags) => {
    setModal({
      appearance: true,
      modalContent: { url: url, tags: tags },
    });
  };
  const closeModal = () => {
    setModal({
      appearance: false,
    });
  };
  const loadMore = () => {
    setPage(prev => prev + 1);
  };
  const setQuery = data => {
    setKey(data);
    setPage(1);
  };

  return (
    <div>
      <Searchbar onSubmit={setQuery} />
      {Boolean(fetchElements.items.length) && (
        <Gallery items={fetchElements.items} onClick={showModal} />
      )}
      {Boolean(fetchElements.items.length) && !fetchElements.loading && (
        <Button onClick={loadMore} text={'Load more'} />
      )}
      {fetchElements.loading && <Loader boolean={fetchElements.loading} />}
      {modal.appearance && (
        <Modal
          close={closeModal}
          children={
            <img src={modal.modalContent.url} alt={modal.modalContent.tags} />
          }
        />
      )}
    </div>
  );
}
