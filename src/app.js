const express=require('express');
const path=require('path');

const hbs=require('hbs');
//const forecast = require('../../weather-app/utils/forecast');
const app=express();

const port=process.env.PORT || 8090;    
//converted into html file
const publicdirectorypath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')



app.set('view engine' ,'hbs');
app.set('views',viewspath)
hbs.registerPartials(partialspath)
app.use(express.static(publicdirectorypath));

//used to create dynamic webpages 
//tempate engine   render
//handle bars
app.get('',(req,res)=>
{
    res.render('index',{
        title:'weather app',
        name:'bharat'
    })
   
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'about me',
        name:'bharat'
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
       help:'help me please',
       title:'help',
       name:'bharat'
    });
})





//query strings

// app.get('/product',(req,res)=>
// {
//     if(!req.query.search)
//     {
//         return res.send({
//             error:'you must provide a serach term'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products:[]
//     })
// })


// app.get('/weather',(req,res)=>
// {
//     if(!req.query.address)
//     {
//         return res.send(
//             {
//                 error:'u must provide an address'
//             }
//         )
//     }
//     console.log(req.query);
//     res.send({
//         forecast:'it is snowing',
//         address:req.query.address
        
//     });
// })
const request = require('request');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send(
            {
                error:'u must provide an address'
            }
        )
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })

    })
        
})














//static webpages
// app.get('',(req,res)=>
// {
//     res.send("welcome to my session");
// })

// app.get('/about',(req,res)=>
// {
//     res.send("this is about me");
// })


// app.get('/apple',(req,res)=>
// {
//     res.send("<h1>apple is crazy</h1>");
// })

// app.get('/mango',(req,res)=>
// {
//     res.send({
//         name:'bharat',
//         age:27
//     });
// })


// app.get('/help/*',(req,res)=>
// {
//     res.send('help article not found');
// })

// app.get('*',(req,res)=>
// {
//     res.send('My 404 page');
// })

app.get('/help/*',(req,res)=>
{
    res.render('404',{
        title:'404',
        name:'bharat',
        errormessage:'help article not found'
    });
})


app.get('*',(req,res)=>
{
    res.render('404',{
        title:'404',
        name:'bharat',
        errormessage:'page not found'
    });
})




//to start the server we use listen

app.listen(port,()=>
{
    console.log('server is on port '+port);
})