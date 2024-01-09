const router = require('express').Router()

const articles = [
    {
        id: 1,
        title: 'Article One',
        article: 'This is article one'
    },
    {
        id: 2,
        title: 'Article Two',
        article: 'This is article two'
    },
    {
        id: 3,
        title: 'Article Three',
        article: 'This is article three'
    }
    
]

router.get('/', (req, res) => res.render('welcome', {
    name: 'Chinedu',
    articles: articles
}))

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

// router.get('/articles', (req, res)=> {
//     res.render('article', {
//         name: 'Health',
//         article: articles
//     })
// })

module.exports = router