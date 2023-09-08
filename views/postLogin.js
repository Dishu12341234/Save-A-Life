let countdown = 5

setInterval(()=>{
    let sendBack = document.getElementById('sendBack')
    sendBack.innerText = countdown--;
    if(countdown < 0)
    {
        window.location.href = '/'
    }
},1000)