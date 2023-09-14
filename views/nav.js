const nav = document.querySelector("nav")
nav.innerHTML =
`
<h1>Home | Save A Life</h1>
`

const header = document.querySelector("header")
header.innerHTML +=
`
`

const iframe = document.getElementById('settings-frame')
const cbx = document.getElementById('settings-cbx')

cbx.addEventListener("click", e => {
    nav.style.display === 'block' ? nav.style.display = 'none' : nav.style.display = 'block';
})

document.addEventListener("keydown", e => {
    if (e.code === 'Escape') {
        nav.style.display = 'none'
    }
})

const signOut_cbx = document.getElementById("settings-signOut")

signOut_cbx.addEventListener("click",e=>{
    window.location.href = '/signOut'
    console.log('ufhei');
})

let a = fetch(`${window.location.origin}/getUserCredentials`)

a.then(async r => {
    let a = false;
    await r.json().then(x=>a = x[0])
    if (a['login']) {
        const stats = document.getElementsByClassName("stat")
        for(let E in stats)
        {
            try {
                stats[E].style.display = 'none'
                const creds = document.getElementById('creds')
                creds.innerText = a['name']
                console.log(a);
            } catch (error) {
                
            }
        }
    }
    else
    {
        const signOut = document.getElementById("settings-signOut-frame")
        signOut.style.display = 'none'
    }
})