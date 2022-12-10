/////// setting variable, file
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

/////// use public static files
app.use(express.static('public'))

/////// setting express-handlebars
app.engine('handlebars', exphbs({ defaultLayout:'main' }))
app.set('view engine', 'handlebars')

/////// setting routes
// for restaurant-list 
app.get('/', (req,res) => {
  res.render('index', { restaurants: restaurantList.results })
  // document.title = 'yooo'
})


// for restaurant detail page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find( restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant: restaurant })
})


app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

/////// setting listening
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
