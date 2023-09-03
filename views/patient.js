age = document.getElementById("age")

for (i = 17; i < 100;i++)
{
    option = document.createElement("option")
    option.innerText = i+1+""
    age.appendChild(option)
    console.log(option);
}