const body = document.body

const drawer_div = document.createElement("div")
const drawer_div_ul = document.createElement("ul")
const div_nav = document.createElement("div")
const profile = document.createElement("div")
const drawer_div_ckeckBox = document.createElement("input")

drawer_div.className = 'drawer'
div_nav.className = 'navbar'
div_nav.id = 'navbar'


div_nav.style.paddingBottom = '8px'

profile.className = "profile"

const ul = document.createElement("ul")

const redirects =
    ['Home', 'SignUp', 'Login', 'SignOut', 'Donate', 'Patient']

for (let i = 0; i < redirects.length; i++) {
    let hr = document.createElement("hr")
    let li = document.createElement("li")
    let a = document.createElement("a")

    a.innerText = redirects[i]

    if (!( a.innerText == 'SignOut')) {
        console.log(a.innerText);

        if (a.innerText != 'Home')
            a.href = a.innerText.toLocaleLowerCase()
        else {
            a.href = '/ '
        }
        li.appendChild(a)
        li.appendChild(hr)
        ul.appendChild(li)
    }
    else
    {
        drawer_div_ckeckBox.type = 'checkBox'
        let drawer_div_ul_li = document.createElement("li")
        drawer_div_ul_li.innerText = a.innerText
        const city = document.createElement("input")
        const name = document.createElement("input")
        city.type = 'text'
        name.type = 'text'
        city.placeholder = 'Enter your city'
        drawer_div_ul_li.appendChild(city)
        drawer_div_ul.appendChild(drawer_div_ul_li)
        drawer_div.appendChild(drawer_div_ul)
        div_nav.appendChild(drawer_div)
    }
}

div_nav.appendChild(drawer_div_ckeckBox)

const navE = document.querySelector("nav")
div_nav.appendChild(ul)
div_nav.appendChild(profile)

navE.appendChild(div_nav)
body.appendChild(navE)

drawer_div_ckeckBox.addEventListener("click",e=>{
    drawer_div.id == 'float' ? drawer_div.id = '' : drawer_div.id = 'float'
})
//ip -> 167.235.251.13
//port -> 22
//xx