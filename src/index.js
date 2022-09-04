// імпорт бібліотек і файлів
import './sass/styles.css';
import ImgApi from './fetchImg';
import Notiflix from 'notiflix';


// створюю екземпляр класу, в який записала купу функцій. клас - зручніше
const ImgEl = new ImgApi();
console.log(ImgEl)

// доступ до елементів HTML
const formEl = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');


// реєструю подію на формі
formEl.addEventListener('submit', onFormSubmit);


// велика функція, де отримую фото 
function toGetImages() {

    // фетчимо об*єкт, деструктуризуємо в зені його складові, тотали - числа, хітс - масив 
    ImgEl.fetchImg()
      
        
      .then(({ total, totalHits, hits }) => {
        // якщо нічого не знайшов, поверни "спробуй ще"
      if (hits.length === 0 && totalHits === 0 && total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        //   а якщо знайшов, то створи розмітку по хітс, бо в цьому масиві лежать об*єкти з картинок і властивостей
        insertMarkup(hits);
// збільши на 1 кількість сторінок (була перша - перейди на другу)
        ImgEl.incrementPage();
      }
      })
      

        // злови помилку
    .catch(() => {
      Notiflix.Notify.failure('Oops, something went wrong');
    })
        
        // в кінці-кінців, якщо що, ресетни форму
    .finally(() => {
      formEl.reset();
    });
}

// наступні дії відбудуться при натисканні на сабміт форми
function onFormSubmit(e) {
  e.preventDefault();

    // пошуковий запит на основі класу - це те, що в даний момент ввели на формі + трім, який позбавляє пробілів 
    ImgEl.query = e.currentTarget.elements.searchQuery.value.trim();

  ImgEl.resetPage();
  gallery.innerHTML = '';
  toGetImages();
}

// функція створення розмітки на 1 картку
function insertMarkup(array) {
  const galeryMarkup = array
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <a href="${largeImageURL}" class="gallery__link">
        <div class="photo-card">
           <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes:</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views:</b>
            ${views}
          </p>
          <p class="info-item">
            <b>Comments:</b>
            ${comments}
          </p>
          <p class="info-item">
            <b>Downloads:</b>
            ${downloads}
          </p>
        </div>
      </div>
      </a>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeEnd', galeryMarkup);
}
    


