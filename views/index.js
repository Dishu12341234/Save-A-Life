const patients = fetch(`${window.location.origin}/get_patients`)
const table = document.createElement('table')
table.border = '1'
patients.then(r => {
    r.json().then((r) => { THs(r);display(r) })
})

function THs(r) {
    let count = 0
    let tr = document.createElement('tr')
    for (let i in r[0]) {
        const th = document.createElement("th")
        if(i === 'login')
        continue;
        if(i != "Blood_group")
        th.innerText = i
        else
        th.innerText = "Blood Group"
        tr.appendChild(th)
        ++count;
    }
    table.appendChild(tr)

}
function display(r) {
    for (let k in r) {
        let tr = document.createElement('tr')
        for (let l in r[k]) {
            if (l !== 'login') {
                const td = document.createElement('td')
                td.innerText = r[k][l]
                tr.appendChild(td)
            }
        }
        table.appendChild(tr) // Append each row to the table individually
    }
}


document.body.appendChild(table)
// sha256:6c202fcad693c964e1c01d489645f2ce49a7d804bf61742830c23498536d73e3