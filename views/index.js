fetch(`${window.location.origin}/get_patients`).then(async(e,r)=>{
    let result = await e.json()
    const table = document.querySelector("table")
    for (let k in result)
    {
        const tr      = document.createElement("tr")
        const td      = document.createElement("td")
        const td1     = document.createElement("td")
        const td2     = document.createElement("td")
        const td3     = document.createElement("td")
        td.innerText  = result[k]['UNID']
        td1.innerText = result[k]['Blood_group']
        td2.innerText = result[k]['gender']
        td3.innerText = `${result[k]['Age']}`
        tr.appendChild(td)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        table.appendChild(tr)
    }
    
})