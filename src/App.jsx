import Gallery from 'components/Gallery';
import Button from 'components/Button';
import Searchbar from 'components/Searchbar';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { Component } from 'react';
const axios = require('axios').default;
export default class App extends Component {
  state = {
    page: 1,
    key: '',
    loading: false,
    error: null,
    items: [],
    modal: false,
    modalContent: {},
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.key !== prevState.key || this.state.page > prevState.page) {
      this.setState({
        loading: true,
        error: null,
      });
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${this.state.key}&page=${this.state.page}&key=27861920-ebdf63872cc51147152c85382&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.state.key === prevState.key
          ? this.setState(prev => {
              return {
                items: [...prev.items, ...response.data.hits],
                loading: false,
              };
            })
          : this.setState({ items: response.data.hits, loading: false });
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message,
        });
      }
    }
  }
  showModal = (url, tags) => {
    this.setState({
      modal: true,
      modalContent: { url: url, tags: tags },
    });
  };
  closeModal = () => {
    this.setState({
      modal: false,
    });
  };
  loadMore = () => {
    this.setState(prev => {
      return {
        page: prev.page + 1,
      };
    });
  };
  setKey = data => {
    this.setState({ key: data, page: 1 });
  };
  render() {
    const { items, loading, modal, modalContent } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.setKey} />
        {Boolean(items.length) && (
          <Gallery items={items} onClick={this.showModal} />
        )}
        {Boolean(items.length) && !loading && (
          <Button onClick={this.loadMore} text={'Load more'} />
        )}
        {loading && <Loader boolean={loading} />}
        {modal && (
          <Modal
            close={this.closeModal}
            children={<img src={modalContent.url} alt={modalContent.tags} />}
          />
        )}
      </div>
    );
  }
}
