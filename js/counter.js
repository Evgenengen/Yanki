let goods = [];
if (localStorage.getItem('goods')) {
  goods = JSON.parse(localStorage.getItem('goods'))
}
let basketNumber = document.querySelector('.backet__number__inner');
basketNumber.innerText = goods.length

let products = [];
if (localStorage.getItem('products')) {
  products = JSON.parse(localStorage.getItem('products'))
}

let likeCounter = document.querySelector('.like__counter');
likeCounter.innerText = products.length