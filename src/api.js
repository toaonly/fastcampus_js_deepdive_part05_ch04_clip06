const api = {
  getProductCategories() {
    return fetch(`http://localhost:3000/product-categories`).then(res => res.json())
  },
  getProductCategory({ uuid }) {
    return fetch(`http://localhost:3000/product-categories/${uuid}`).then(res => res.json())
  },
  removeProductCategory({ uuid }) {
    return fetch(`http://localhost:3000/product-categories/${uuid}`, { method: 'DELETE' })
  },
  createProductCategory({ name }) {
    return fetch(`http://localhost:3000/product-categories`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name }),
    }).then(res => res.json())
  },

  getProducts() {
    return fetch(`http://localhost:3000/products`).then(res => res.json())
  },
  getProduct({ uuid }) {
    return fetch(`http://localhost:3000/products/${uuid}`).then(res => res.json())
  },
  removeProduct({ uuid }) {
    return fetch(`http://localhost:3000/products/${uuid}`, { method: 'DELETE' })
  },
  createProduct({ name, description, size, color, category }) {
    return fetch(`http://localhost:3000/products`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, description, size, color, category }),
    }).then(res => res.json())
  },
}

export default api
