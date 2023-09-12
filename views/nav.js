const nav = document.querySelector("nav")
 nav.innerHTML = 
`
 <div class="float">
            <ul id="navUl">
                <center>

                    <li id="navLi"><a href='/'>Home</a></li>
                    <hr>
                    <li id="navLi"><a href='signUp'>SignUp</a></li>
                    <hr>
                    <li id="navLi"><a href='signOut'>SignOut</a></li>
                    <hr>
                    <li id="navLi"><a href='login'>Login</a></li>
                    <hr>
                    <li id="navLi"><a href='donate'>Donate  </a></li>
                    <hr>
                    <li id="navLi"><a href='patient'>Patient</a></li>
            </center>
            </ul>
        </div>
`

const header = document.querySelector("header")
header.innerHTML += 
`
    <iframe src='settings.svg' id='settings-frame'>
    </iframe>
    <input type='checkbox' id='settings-cbx'/>
`

const iframe = document.getElementById('settings-frame')
const cbx = document.getElementById('settings-cbx')

cbx.addEventListener("click",e=>{
    nav.style.display === 'block' ? nav.style.display = 'none' : nav.style.display = 'block';
})

document.addEventListener("keydown",e=>{
    if(e.code === 'Escape')
    {
        nav.style.display = 'none'
    }
})