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

const header = document.createElement("header")
header.innerHTML = 
`
    <h1>
        Home | Save A Life
    </h1>           
    <iframe src='settings.svg'></iframe>
`
document.body.appendChild(header)