const formItems = document.querySelector('.form__items');
const likeCounter = document.querySelector('.like__counter');
let goods = [];
if (localStorage.getItem('goods')) {
  goods = JSON.parse(localStorage.getItem('goods'))
}
let basketNumber = document.querySelector('.backet__number__inner');
basketNumber.innerText = goods.length

let catalogList = [];
if (localStorage.getItem('catalogList')) {
  catalogList = JSON.parse(localStorage.getItem('catalogList'))
};

let products = [];
if (localStorage.getItem('products')) {
  products = JSON.parse(localStorage.getItem('products'))
}
likeCounter.innerText = products.length

for (let i = 0; i < catalogList.length; i++) {
  for (let y = 0; y < products.length; y++) {
    if (catalogList[i].id == products[y].id) {
      const formItemHTML = `<div class="form__item" data-id="${catalogList[i].id}" data-price="${catalogList[i].price}">
      <div class="form__label__link">
      <img class="form__label__img" src="${catalogList[i].img}" alt="">
      </div>
      <button class="form__like form__active">
      <img class="form__like__img" src="images/like-3.svg" alt="Like">
      </button>
      <div class="form__label__title">
      <a class="form__label__title__link" href="cream-coat.html"> ${catalogList[i].title}</a>
      </div>
      <p class="form__label__sum">${catalogList[i].sum}</p>
      <ul class="form__label__size ${catalogList[i].size1} ${catalogList[i].size2} ${catalogList[i].size3} ${catalogList[i].size4} ${catalogList[i].size5}">
    
    <li class="form__size"><a href="#">${catalogList[i].size1}</a></li>
    <li class="form__size"><a href="#">${catalogList[i].size2}</a></li>
    <li class="form__size"><a href="#">${catalogList[i].size3}</a></li>
    <li class="form__size"><a href="#">${catalogList[i].size4}</a></li>
    <li class="form__size"><a href="#">${catalogList[i].size5}</a></li>
    </ul>
      <div class="form__color">
      <div class="fotm__radio__style fotm__radio__style__white"></div>
      <div class="fotm__radio__style fotm__radio__style__blue"></div>
      <div class="fotm__radio__style fotm__radio__style__beige"></div>
      </div>
      </div>`
      formItems.insertAdjacentHTML('afterbegin', formItemHTML)
    }
  }
}

window.addEventListener('click', function (e) {
  if (e.target.classList.contains('form__like__img')) {
    const productRemove = e.target.closest('.form__item')
    const id = productRemove.dataset.id
    const index = products.findIndex((item) => (item.id == id))
    const active = productRemove.dataset.id;
    const task = catalogList.find((product) => product.id == active)
    task.active = !task.active
    products.splice(index, 1)
    productRemove.remove()
  }
  saveCatalogListLocalStorage()
  saveProductsLocalStorage()
  likeCounter.innerText = products.length
})

function saveProductsLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products))
}

function saveCatalogListLocalStorage() {
  localStorage.setItem('catalogList', JSON.stringify(catalogList))
}