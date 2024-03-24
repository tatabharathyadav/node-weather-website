const request = require('request');
const geocode=(address,callback)=>
{
    const url='https://api.opencagedata.com/geocode/v1/json?q='+ encodeURIComponent(address)+'&key=a9a2d2bbba0445c49bd4f3eb80d11db0';
    request({ url:url, json: true }, (error, response) => {
            if (error)
            {
                callback('unable to connect to weather services',undefined);
            } 
            else if (response.body.results.length === 0)
            {
                callback('unable to find location',undefined);
            }
            else
            {
                callback(undefined,{

                latitude:response.body.results[0].geometry.lat,
                longitude:response.body.results[0].geometry.lng,
                location:response.body.results[0].annotations.timezone.name
                })
            }
        })
}



module.exports = geocode;