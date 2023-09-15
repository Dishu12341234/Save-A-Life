const patients = fetch(`${window.location.origin}/get_patients`)
const table = document.createElement('table')
patients.then(r => {
    r.json().then((r) => { THs(r); display(r) })
})

function THs(r) {
    let count = 0
    let tr = document.createElement('tr')
    for (let i in r[0]) {
        const th = document.createElement("th")
        if (i === 'login')
            continue;
        if (i != "Blood_group")
            th.innerText = i
        else    
            th.innerText = "Blood Group"
        tr.appendChild(th)
        ++count;
    }
    table.appendChild(tr)

}
function display(r) {
    let count = 0;
    for (let k in r) {
        count++;

        if (count == 1) {
            let tr = document.createElement('tr')
            tr.innerHTML =
            `
            <td colspan=5>
            <h4>India is saving Global lives</h2>
            <ul>
            <li>Affordable Cost for Transplants</li>
            <li>Best Doctors</li>
            <li>Good Surgons</li>
            <li>Quality Health Care Suppor</li>
            <li>High Accesiablity</li>
            </ul>
            </td>
            <td colspan=5>
            <h4>How to save the planet</h2>
            <ul>
            <li>Suatanable Developement</li>
            <li>Eco-Friendly Porducts</li>
            <li>Organic Fertilizers</li>
            <li>Disposable E-Waste</li>
            <li>Disposable Medical Equipment</li>
            </ul>
            </td>
            `
            table.appendChild(tr) // Append each row to the table individually
            tr = document.createElement('tr')
            tr.innerHTML =
            `
            <td colspan=10>
            <h4>What is this app about</h2>
            <ul>
            <h3>Many people are wating for a Donation</h3>
            <p>This App is built for the people in need</p>
            <h2>How do I Contribute?</h1>
            <li><a href='/login'>Login</a> or <a href='/signUp'> SignUp </a>via E-mail</li>
            <li>Your<a href='/donate'>Donation</a>may <span id='SAL'> Save A Life </span> of someone else.</li>
            <h2>Waiting for A Donation?</h2>
            <li>Need<a href='/patient'>A Donation</a> no worries we at <span id='SAL'> Save A Life </span> are here.</li>
            </ul>
            </td>
            `
            table.appendChild(tr) // Append each row to the table individually
        }

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