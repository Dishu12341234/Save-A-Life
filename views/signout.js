let countdown = 5

setInterval(()=>{
    let sendBack = document.getElementById('sendBack')
    sendBack.innerHTML = `<p>You will be redirected to <a href='/'>Home Page</a> in ${countdown--}</p>`;
    if(countdown < 0)
    {
        window.location.href = '/'
    }
},1000)