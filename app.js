const url = 'https://course-api.com/javascript-store-products'

const productsDOM = document.querySelector('.products-center')

const fetchProducts = async () => {
  productsDOM.innerHTML = '<div class="loading"></div>'
  try {
    const resp = await fetch(url)
    const data = await resp.json()
    return data
  } catch (error) {
    productsDOM.innerHTML = '<p class="error">there was an error</p>'
  }
}

const displayProducts = (list) => {
  const productList = list
    .map((product) => {
      const { id } = product
      const { name: title, price } = product.fields
      const { url: img } = product.fields.image[0]
      const formatPrice = price / 100
      return `<a class="single-product" href="product.html?id=${id}&name=lubohlav&pokus=26">
            <img src="${img}" class="single-product-img img" alt="${title}" />
            <footer>
              <h5 class="name">${title}</h5>
              <span class="price">$${formatPrice}</span>
            </footer>
          </a>`
    })
    .join('')
  productsDOM.innerHTML = ` <div class="products-container">
         ${productList}
          
        </div>`
}

const form = document.querySelector('.input-form')
const searchInput = document.querySelector('.search-input')

const start = async () => {
  const data = await fetchProducts()
  displayProducts(data)

  form.addEventListener('keyup', () => {
    const inputValue = searchInput.value
    let filteredData = { ...data }
    filteredData = data.filter((product) => {
      return product.fields.name.toLowerCase().includes(inputValue)
    })
    if (filteredData.length < 1) {
      productsDOM.innerHTML = `
      <div class="no-match">
        <h3>no products matched your search, try again please.</h3>
      </div>`
      return
    }
    displayProducts(filteredData)
  })
}

start()
