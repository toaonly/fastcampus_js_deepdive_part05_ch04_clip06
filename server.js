import jsonServer from 'json-server'
import { omit } from 'lodash-es'
import { v4 as uuid } from 'uuid'

const server = jsonServer.create()
const router = jsonServer.router('db/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.get('/product-categories', (_req, res) => {
  const productCategories = router.db.getState()['product-categories']

  res.status(200).json(productCategories)
})

server.post('/product-categories', (req, res) => {
  const { name } = req.body
  const productCategories = router.db.get('product-categories')
  const newCate = { id: uuid(), name }

  productCategories.push(newCate).write()

  res.status(201).json(newCate)
})

server.get('/product-categories/:uuid', (req, res) => {
  const { uuid } = req.params
  const productCategories = router.db.getState()['product-categories']
  const findedCate = productCategories.find(cate => cate.id === uuid)
  let resData = { status: 201, data: null }

  if (!findedCate) {
    resData = { status: 404, data: null }
  } else {
    resData = { status: 200, data: findedCate }
  }

  res.status(resData.status).json(resData.data)
})

server.delete('/product-categories/:uuid', (req, res) => {
  const { uuid } = req.params
  const productCategories = router.db.get('product-categories')
  const cate = productCategories.find({ id: uuid }).value()
  let resData = { status: 204 }

  if (!cate) {
    resData = { status: 404 }
  } else {
    router.db.get('product-categories').remove({ id: uuid }).write()

    resData = { status: 204 }
  }

  res.status(resData.status).json()
})

server.get('/products', (_req, res) => {
  const productCategories = router.db.getState()['product-categories']
  const products = router.db.getState().products.map(product => {
    const categoryName = productCategories.find(pc => pc.id === product.category)?.name

    return {
      ...omit(product, ['description']),
      categoryName,
    }
  })

  res.status(200).json(products)
})

server.post('/products', async (req, res) => {
  const { name, description, size, color, category } = req.body
  const products = router.db.get('products')
  const newProd = { id: uuid(), name, description, size, color, category }

  products.push(newProd).write()

  res.status(200).json(newProd)
})

server.get('/products/:uuid', (req, res) => {
  const uuid = req.params.uuid
  const findedProduct = router.db.getState().products.find(post => post.id === uuid)
  let resData = { status: 201, data: null }

  if (!findedProduct) {
    resData = { status: 404, data: null }
  } else {
    const productCategories = router.db.getState()['product-categories']
    const categoryName = productCategories.find(pc => pc.id === findedProduct.category)?.name

    resData = { status: 200, data: { ...findedProduct, categoryName } }
  }

  res.status(resData.status).json(resData.data)
})

server.delete('/products/:uuid', (req, res) => {
  const { uuid } = req.params
  const products = router.db.get('products')
  const prod = products.find({ id: uuid }).value()
  let resData = { status: 204 }

  if (!prod) {
    resData = { status: 404 }
  } else {
    router.db.get('products').remove({ id: uuid }).write()

    resData = { status: 204 }
  }

  res.status(resData.status).json()
})

server.use(router)

server.listen(3000, () => {
  console.log(`\nRunning a server on localhost:3000\n`)
})
