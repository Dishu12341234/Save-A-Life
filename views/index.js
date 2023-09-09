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
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    document.body.appendChild(table)
}
