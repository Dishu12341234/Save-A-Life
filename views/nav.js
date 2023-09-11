const body = document.body

const div_nav = document.createElement("div")

div_nav.className = 'navbar'
div_nav.id = 'navbar'
div_nav.style.paddingBottom = '8px'
const ul = document.createElement("ul")

const redirects =
    ['Home', 'SignUp', 'Login', 'SignOut', 'Donate', 'Patient']

for (let i = 0; i < redirects.length; i++) {
    let hr = document.createElement("hr")
    let li = document.createElement("li")
    let a = document.createElement("a")
    a.innerText = redirects[i]
    if (a.innerText != 'Home')
        a.href = a.innerText.toLocaleLowerCase()
    else {
        a.href = '/ '
    }
    li.appendChild(a)
    li.appendChild(hr)
    ul.appendChild(li)
}

const navE = document.querySelector("nav")
div_nav.appendChild(ul)

navE.appendChild(div_nav)
body.appendChild(navE)