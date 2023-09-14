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
                    </li>
                    <hr>
                    <li class="navLi"><a href='signUp'>SignUp</a><iframe src='Hicon/Linear/Foreign.svg' id='settings-frame'>
                    </iframe>
                    <input type='checkbox' id='settings-cbx'/></li>
                    <hr>
                    <li class="navLi"><a href='signOut'>SignOut</a><iframe src='Hicon/Linear/Logout.svg' id='settings-frame'>
                    </iframe>
                    <input type='checkbox' id='settings-cbx'/></li>
                    <hr>
                    <li class="navLi"><a href='login'>Login</a><iframe src='Hicon/Linear/Link.svg' id='settings-frame'>
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
            </ul>
        </div>
`

const header = document.querySelector("header")
header.innerHTML +=
    `
    <iframe src='Hicon/Linear/Profile Circle.svg' id='settings-frame'>
    </iframe>
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

