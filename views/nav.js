const header = document.querySelector("header")
header.innerHTML +=
    `
<input type="checkbox" id="dessert-2" />
<label for="dessert-2">
  <img src="Hicon/Linear/Swap 1.svg" />
</label>
<nav></nav>
`
const nav = document.querySelector("nav")

nav.innerHTML =
`
    <ul>
    <li><a href='/'>Home</a></li>
    <li><a href='/signUp'>Signin</a></li>
    <li><a href='/signOut'>Signout</a></li>
    <li><a href='/Login'>Login</a></li>
    <li><a href='/patient'>Patient</a></li>
    <li><a href='/donate'>Donate</a></li>
    </ul>
`