import axios from 'axios';

export default class ImgApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    }
    
  async fetchImg() {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '29655541-29ac0a319757ef7d347abf8a2';

    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image-type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}