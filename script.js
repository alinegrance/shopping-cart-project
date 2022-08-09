const cartList = document.querySelector('.cart__items');

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

const cartItemClickListener = (event) => {
  cartList.removeChild(event.target);
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemToCart = async (sku) => {
  const item = await fetchItem(sku);
  const newItem = createCartItemElement(item);
  cartList.appendChild(newItem);
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

// const addBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  // addBtn.addEventListener('click', async () => {
  //   const item = await fetchItem(sku);
  //   console.log(item);
  //   createCartItemElement(item);
  // });

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const renderProductItems = async () => {
  const items = document.querySelector('.items');
  const { results } = await fetchProducts();
  
  results.forEach((item) => {
    const newItem = createProductItemElement(item);
    items.appendChild(newItem);
  });
};

window.onload = async () => { 
  await renderProductItems();
};
