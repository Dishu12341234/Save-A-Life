const nav = document.querySelector("nav")
nav.innerHTML =
    `
 <div class="float">
            <ul id="navUl">
                <center>

                    <li class="navLi"><a href='/'>Home</a>
                    <iframe src='Hicon/Linear/Home 4.svg' id='settings-frame'>
    </iframe>
    <input type='checkbox' id='settings-cbx'/>
                <div id='nav-container'>
                </li>
                <hr class='stat'>
                <li class="navLi stat"><a href='signUp'>SignUp</a><iframe src='Hicon/Linear/Foreign.svg' id='settings-frame'>
                </iframe>
                <input type='checkbox' id='settings-cbx'/></li>
                <hr>
                <li class="navLi" id='out'><a href='signOut'>SignOut</a><iframe src='Hicon/Linear/Logout.svg' id='settings-frame'>
                </iframe>
                <input type='checkbox' id='settings-cbx'/></li>
                <hr class='stat'>
                <li class="navLi stat"><a href='login'>Login</a><iframe src='Hicon/Linear/Link.svg' id='settings-frame'>
                </iframe>
                <input type='checkbox' id='settings-cbx'/></li>
                <hr>
                <li class="navLi"><a href='donate'>Donate  </a><iframe src='Hicon/Linear/Award 6.svg' id='settings-frame'>
                </iframe>
                <input type='checkbox' id='settings-cbx'/></li>
                <hr>
                <li class="navLi"><a href='patient'>Patient</a><iframe src='Hicon/Linear/Award 6.svg' id='settings-frame'>
                </iframe>
                <input type='checkbox' id='settings-cbx'/></li>
                <hr>
                <p id='badal-barsa-bijuli'></p>
                </center>
                </div>
            </ul>
        </div>
`

const header = document.querySelector("header")
header.innerHTML +=
    `
    <iframe src='Hicon/Linear/Profile Circle.svg' id='settings-frame'>
    </iframe>
    <p id='creds'></p>
    <input type='checkbox' id='settings-cbx'/>
    <iframe src='Hicon/Linear/Logout.svg' id='settings-signOut-frame' class='signOut' >
    </iframe>
    <input type='checkbox' id='settings-signOut' class='signOut' />
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