const cartList = document.querySelector('.cart__items');
const totalValue = document.querySelector('.total-price');
const clearBtn = document.querySelector('.empty-cart');
let localCartList = [];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const sumCart = () => {
  const total = localCartList.reduce((acc, item) => acc + (item.price * 100), 0);
  const totalRounded = total / 100;
  totalValue.innerText = `${totalRounded}`;
};

const cartItemRemove = (event, sku) => {
  cartList.removeChild(event.target);
  // console.log(event.target);
  localCartList = localCartList.filter((item) => item.id !== sku);
  // console.log(localCartList);
  sumCart();
  saveCartItems(JSON.stringify(localCartList));
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => cartItemRemove(event, sku));
  return li;
};

const addItemToCart = async (sku) => {
  const item = await fetchItem(sku);
  localCartList.push(item);
  saveCartItems(JSON.stringify(localCartList));
  const newItem = createCartItemElement(item);
  cartList.appendChild(newItem);
  sumCart();
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addBtn.addEventListener('click', () => addItemToCart(sku));
  section.appendChild(addBtn);
  
  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// const addLoading = ()

const renderProductItems = async () => {
  const items = document.querySelector('.items');
  const loading = createCustomElement('p', 'loading', 'carregando...');
  items.appendChild(loading);
  const { results } = await fetchProducts('computador');
  items.removeChild(items.firstChild);
  results.forEach((item) => {
    const newItem = createProductItemElement(item);
    items.appendChild(newItem);
  });
};

const renderLocalCartList = (list) => {
  list.forEach((item) => {
    const newItem = createCartItemElement(item);
    cartList.appendChild(newItem);
  });
  sumCart();
};

clearBtn.addEventListener('click', () => {
  localCartList = [];
  saveCartItems(JSON.stringify(localCartList));
  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }
  sumCart();
});

window.onload = async () => { 
  await renderProductItems();
  localCartList = JSON.parse(getSavedCartItems('cartItems')) || [];
  renderLocalCartList(localCartList);
};
