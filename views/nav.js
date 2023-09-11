const body = document.body

const div_nav = document.createElement("div")

div_nav.className = 'navbar'
div_nav.id = 'navbar'
div_nav.style.paddingBottom = '8px'
const ul = document.createElement("ul")

const redirects =
    ['home', 'signUp', 'login', 'signOut', 'donate', 'patient']

for (let i = 0; i < redirects.length; i++) {
    let li = document.createElement("li")
    let a = document.createElement("a")
    a.innerText = redirects[i]
    if (a.innerText != 'home')
        a.href = a.innerText
    else {
        a.href = '/ '
    }
    li.appendChild(a)
    ul.appendChild(li)
}

const navE = document.querySelector("nav")
div_nav.appendChild(ul)

navE.appendChild(div_nav)
body.appendChild(navE)