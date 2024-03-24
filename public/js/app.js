console.log("client side javascript file");

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msgone=document.querySelector('#msg-1')
const msgtwo=document.querySelector('#msg-2')
weatherform.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const location=search.value;

    msgone.textContent='loading...'
    msgtwo.textContent=''
    fetch('/weather?address='+location).then((response)=>
    {
    response.json().then((data)=>
    {
        if(data.error)
        {
            msgone.textContent=data.error
        }
        else{
            msgone.textContent=data.location
            msgtwo.textContent=data.forecast
        }
    })
})

})