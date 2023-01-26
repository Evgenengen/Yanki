let viewProductList = [];

let catalogList = [];
if (localStorage.getItem('catalogList')) {
  catalogList = JSON.parse(localStorage.getItem('catalogList'))
};
viewProductList = [...catalogList];

let goods = [];
if (localStorage.getItem('goods')) {
  goods = JSON.parse(localStorage.getItem('goods'))
}

let basketNumber = document.querySelector('.backet__number__inner');
basketNumber.innerText = goods.length

let formItems = document.querySelector('.form__items');

let products = [];
if (localStorage.getItem('products')) {
  products = JSON.parse(localStorage.getItem('products'))
}

function renderCatalog(productList = []) {
  formItems.innerHTML = ''
  productList.forEach(function (item) {
    const cssClass = products.some((favoriteItem) => favoriteItem.id === item.id.toString()) ? 'form__like form__active' : 'form__like'

    const formItemHTML = `<div class="form__item" data-id="${item.id}" data-price="${item.price}">
    <div class="form__label__link">
      <img class="form__label__img" src="${item.img}" alt="">
    </div>
    <button class="${cssClass}">
      <img class="form__like__img" src="images/like-3.svg" alt="Like">
    </button>
    <div class="form__label__title">
      <a class="form__label__title__link" href="cream-coat.html"> ${item.title}</a>
    </div>
    <p class="form__label__sum">${item.sum}</p>
    <ul class="form__label__size ${item.size1} ${item.size2} ${item.size3} ${item.size4} ${item.size5}">
    
    <li class="form__size"><a href="#">${item.size1}</a></li>
    <li class="form__size"><a href="#">${item.size2}</a></li>
    <li class="form__size"><a href="#">${item.size3}</a></li>
    <li class="form__size"><a href="#">${item.size4}</a></li>
    <li class="form__size"><a href="#">${item.size5}</a></li>
    </ul>
    <div class="form__color">
      <div class="fotm__radio__style fotm__radio__style__white"></div>
      <div class="fotm__radio__style fotm__radio__style__blue"></div>
      <div class="fotm__radio__style fotm__radio__style__beige"></div>
    </div>
  </div>`
    formItems.insertAdjacentHTML('afterbegin', formItemHTML)
  });
  setFavoriteListeners()
}
// Добавление продукта в LC в избранное
renderCatalog(viewProductList);

let likeCounter = document.querySelector('.like__counter');
likeCounter.innerText = products.length

function setFavoriteListeners() {
  const formLike = document.querySelectorAll('.form__like');

  formLike.forEach(function (item) {
    item.addEventListener('click', function (event) {
      const formItem = event.target.closest(('.form__item'))
      const formItemInfo = {
        id: formItem.dataset.id,
      }

      item.classList.toggle('form__active');

      const isActive = item.classList.contains('form__active')

      if (isActive) {
        products.push(formItemInfo)
      } else {
        products = products.filter((product) => product.id !== formItemInfo.id)
      }
      saveProductsLocalStorage(products);
      likeCounter.innerText = products.length
    })
  })
}

// Сортировка товара
// по цене
const catalogBtnSort = document.querySelector('[data-btn]')
let catalogDropdown = document.querySelector('.catalog__features__list')
const increase = document.querySelector('[data-increase]')
const descending = document.querySelector('[data-descending]')
const rating = document.querySelector('[data-rating]')
const rest = document.querySelector('[data-rest]')

catalogBtnSort.addEventListener('click', function () {
  catalogDropdown.classList.toggle('hide')
  increase.addEventListener('click', function () {
    viewProductList.sort(function (a, b) {
      return a.price - b.price
    })
    catalogBtnSort.innerText = this.innerText;
    catalogDropdown.classList.add('hide')

    renderCatalog(viewProductList)
  })
  descending.addEventListener('click', function () {
    viewProductList.sort(function (a, b) {
      return b.price - a.price
    })
    catalogBtnSort.innerText = this.innerText;
    catalogDropdown.classList.add('hide')
    renderCatalog(viewProductList)

  })
  rating.addEventListener('click', function () {
    viewProductList.sort(function (a, b) {
      return b.rating - a.rating
    })
    catalogDropdown.classList.add('hide')
    catalogBtnSort.innerText = this.innerText;
    renderCatalog(viewProductList)

  })
  rest.addEventListener('click', function () {
    viewProductList.sort(function (a, b) {
      return a.id - b.id
    })
    catalogDropdown.classList.add('hide')
    catalogBtnSort.innerText = this.innerText;
    renderCatalog(viewProductList)
  })
})

function saveProductsLocalStorage(productList) {
  localStorage.setItem('products', JSON.stringify(productList))
}

// Search
const btnSearch = document.querySelector('.search__pr')
btnSearch.addEventListener('click', function () {
  const search = document.querySelector('.search')
  search.classList.toggle('hide')
})
document.getElementById("searchbar").oninput = function () {
  let val = this.value.trim();
  let formTitle = document.querySelectorAll('.form__label__title__link');
  if (val != '') {
    formTitle.forEach(function (item) {
      const formItemTitle = item.closest('.form__item')
      if (item.innerText.search(val) == -1) {
        formItemTitle.classList.add('hide')
      } else {
        formItemTitle.classList.remove('hide')
      }
    })
  } else {
    formTitle.forEach(function (item) {
      const formItemTitle = item.closest('.form__item')
      formItemTitle.classList.remove('hide')
    })
  }
}
