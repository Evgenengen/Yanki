const dropdownList = document.querySelector('.dropdown__list');
const dropdownListItem = document.querySelectorAll('.dropdown__list__item');
const productItemClose = document.querySelector('.product__item__close');
const productList = document.querySelector('.product__compound__list')
const productColor = document.querySelectorAll('[data-tab]')
const productColorText = document.querySelectorAll('[data-tab-content')

let products = [];
if (localStorage.getItem('products')) {
  products = JSON.parse(localStorage.getItem('products'))
}
let likeCounter = document.querySelector('.like__counter');
likeCounter.innerText = products.length
const btnDropdown = document.querySelector('.dropdown__btn');

let goods = [];
if (localStorage.getItem('goods')) {
  goods = JSON.parse(localStorage.getItem('goods'))
}
let basketNumber = document.querySelector('.backet__number__inner');
basketNumber.innerText = goods.length

btnDropdown.addEventListener('click', function () {
  dropdownList.classList.toggle('dropdown__list__visible')
})

dropdownListItem.forEach(function (listItem) {
  listItem.addEventListener('click', function (e) {
    e.stopPropagation();
    btnDropdown.innerText = this.innerText;
    dropdownList.classList.remove('dropdown__list__visible')
  })
});

document.addEventListener('click', function (event) {
  if (event.target !== btnDropdown) {
    dropdownList.classList.remove('dropdown__list__visible')
  }
})
// dropdownbtn выпадаюзщее окно описание

const btnProductDesc = document.querySelector('.product__description__compound__title');
btnProductDesc.addEventListener('click', function () {
  productList.classList.toggle('dropdown__list__visible')
})

document.addEventListener('click', function (e) {
  if (e.target !== btnProductDesc) {
    productList.classList.remove('dropdown__list__visible')
  }
})
let productColors = document.querySelector('.product__color')
productColors.addEventListener('click', function (e) {
})

// выбор цвета 
for (var i = 0; i < productColor.length; i++) {
  productColor[i].addEventListener('click', function () {
    for (var i = 0; i < productColor.length; i++) {
      productColor[i].classList.remove('product__circle');
    }
    this.classList.add('product__circle');
  });
}

productColor.forEach(function (item) {
  item.addEventListener('click', function () {
    productColorText.forEach(function (item) {
      item.classList.add('hidden')
    })
    const productBox = document.querySelector('#' + this.dataset.tab);
    productBox.classList.remove('hidden')
  })
})
// Добавление в корзину
window.addEventListener('click', function (event) {
  if (event.target.hasAttribute('data-cart')) {
    const productInner = event.target.closest('.product__inner');
    const productInfo = {
      id: productInner.dataset.id,
      title: productInner.querySelector('.product__description__title').innerText,
      price: productInner.querySelector('.form__label__sum').innerText,
      size: productInner.querySelector('.dropdown__btn').innerText,
    };
    const newGoods = {
      text: productInfo,
    }
    goods.push(newGoods)
    saveToLocalStorage()
    basketNumber.innerText = goods.length
  }
});

function saveToLocalStorage() {
  localStorage.setItem('goods', JSON.stringify(goods))
}

