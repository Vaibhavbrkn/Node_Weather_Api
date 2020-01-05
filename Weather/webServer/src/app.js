const express = require('express')
const path = require('path')
const hbs = require('hbs')
const GEO = require('./utils/GEO.js')
const forecast = require('./utils/forecast.js')
const app = express()

console.log(__dirname)
console.log(path.join(__dirname , '../public'))

const publicDirectoryPath = path.join(__dirname , '../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')

app.set('view engine' , 'hbs')
app.set('views' , viewpath)
hbs.registerPartials(partialPath)


app.use(express.static(publicDirectoryPath))

app.get('' , (req , res)=>{
    res.render('index',{
        title: 'weather app' ,
        name : 'vaibhav agrawal'
        
    })
})

app.get('/weather' , (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    
    else{
        GEO(req.query.address,(error , {latitude , longitude , location}={})=>{
            if(error){
                return console.log(error)
            }
            forecast(latitude, longitude, (error , forecastData)=>{
                if(error){
                    return console.log(error)
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
    
    
})

app.get('/about' , (req , res)=>{
    res.render('about' ,{
        title:'about me',
        name :'vaibhav'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return  res.send({
            error:'you must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help' , (req , res)=>{
    res.render('help' ,{
        title:'helpful text'
    })
})

app.get('/help/*',(req,res)=>{
    res.send('help article not found')
})

app.get('*',(req,res)=>{
    res.send('my 404 page')
})

app.listen(3000 , ()=>{
    console.log('Server is up on port 3000')
})