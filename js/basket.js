let basketItems = document.querySelector('.basket__items')
let products = [];
if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'))
}

let likeCounter = document.querySelector('.like__counter');
likeCounter.innerText = products.length

let goods = [];
if (localStorage.getItem('goods')) {
  goods = JSON.parse(localStorage.getItem('goods'))
}

goods.forEach(function (item) {
  const basketItemHTML = `<div id="${item.id}" class="basket__item">
    <div class="basket__item__content">
      <a class="basket__item__img" href="#">
        <img class="basket__img" src="images/basket-1.jpg" alt="">
      </a>
      <div class="basket__item__title">
        <span>арт. 1589956</span>
        ${item.text.title}
      </div>
    </div>
    <div class="basket__item__line">
      <div class="basket__item__color basket__item__color__blue"></div>
      <div class="basket__size">${item.text.size}</div>
      <div class="basket__item__number">
        <div class="basket__item__minus" data-action="minus">-</div>
        <div class="basket__item__current" data-counter> 1</div>
        <div class="basket__item__plus" data-action="plus">+</div>
      </div>
    </div>
    <div class="basket__item__price">
      <div> ${item.text.price}</div>
      <img class="backet__cart__img" data-action="remove" src="images/cart.svg" alt="">
    </div>
    
  </div>`

  basketItems.insertAdjacentHTML('afterbegin', basketItemHTML)
  calcPrice()
})
let basketNumber = document.querySelector('.backet__number__inner');
basketNumber.innerText = goods.length

window.addEventListener('click', function (event) {
  let counter;
  calcPrice()
  if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
    const basketItemNumber = event.target.closest('.basket__item__number');
    counter = basketItemNumber.querySelector('[data-counter]')
  }
  if (event.target.dataset.action === 'plus') {
    counter.innerText = ++counter.innerText;
  }
  if (event.target.dataset.action === 'minus') {
    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    }
  }
  if (event.target.hasAttribute('data-action') && event.target.closest('.basket__items')) {
    calcPrice()
  }
  if (event.target.dataset.action === "remove") {
    const productRemove = event.target.closest('.basket__item')
    const id = Number(productRemove.id)
    const index = goods.findIndex(function (item) {
      if (item.id === id) {
        return true
      }
    })
    goods.splice(index, 1)
    productRemove.remove()
    calcPrice()
  }
  saveToLocalStorage()
  basketNumber.innerText = goods.length
});

function saveToLocalStorage() {
  localStorage.setItem('goods', JSON.stringify(goods))
}

function calcPrice() {
  let basketSumTotal = document.querySelector('.backet__sum__total')
  let priceTotal = 0
  let basketItem = document.querySelectorAll('.basket__item');
  basketItem.forEach(function (item) {
    const amountEl = item.querySelector('[data-counter]')
    const basketItemPrice = item.querySelector('.basket__item__price')
    const currentPrice = parseInt(amountEl.innerText) * parseInt(basketItemPrice.innerText)
    priceTotal += currentPrice
  })
  basketSumTotal.innerText = priceTotal
}
