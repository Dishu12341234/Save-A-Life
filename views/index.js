const patients = fetch(`${window.location.origin}/get_patients`)
const table = document.createElement('table')
table.border= '1'
patients.then(r=>{
    r.json().then((r)=>{display(r);THs(r)})
})

function THs(r) {

}

function display(r)
{
    for(let k in r)
    {
        let tr = document.createElement('tr')
        
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