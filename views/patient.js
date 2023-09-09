age = document.getElementById("age")

for (i = 17; i < 100;i++)
{
    option = document.createElement("option")
    option.innerText = i+1+""
    age.appendChild(option)
}
const patients = fetch(`${window.location.origin}/get_patients`)
const table = document.createElement('table')
table.border= '1'
patients.then(r=>{
    r.json().then(display)
})

function display(r)
{   
    for(let k in r)
    {
        const tr = document.createElement('tr')
        for(let l in r[k])
        {
            const td = document.createElement('td')
            td.innerText = r[k][l] 
            if(l != 'login')
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

document.body.appendChild(table)