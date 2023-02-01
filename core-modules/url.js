const url = require('url')

const site = 'http://localhost:3000/products?chair=gray&table=brown'

const parsedUrl = new url.URL(site)

console.log(parsedUrl.host)
console.log(parsedUrl.hostname)
console.log(parsedUrl.port)
console.log(parsedUrl.pathname)
console.log(parsedUrl.search)
console.log(parsedUrl.searchParams)
console.log(parsedUrl.searchParams.get('chair'))
console.log(parsedUrl.searchParams.get('table'))