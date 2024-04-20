let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const delBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
// 1. Store the delete button in a deleteBtn variable
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

// 2. Listen for double clicks on the delete button (google it!)
// 3. When clicked, clear localStorage, myLeads, and the DOM

inputEl.addEventListener('keyup', function(e){
    if (e.key === 'Enter' || e.keyCode === 13){
        myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads(myLeads)
    }
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads(myLeads)
})

delBtn.addEventListener("dblclick", function() {
    localStorage.setItem("myLeads",null)
    myLeads = []
    renderLeads(myLeads)
})

function renderLeads(myLeads) {
    //<a target='_blank' href='${myLeads[i]}'>
    // ${myLeads[i]}
    // </a>
    let listItems = ""
    let ids = []
    for (let i = 0; i < myLeads.length; i++) {
        console.log(`for element ${myLeads[i]}`)
        listItems += `
            <li>
                
                <div class=sites> 
                <a target='_blank' href='${myLeads[i]}'>
                ${myLeads[i]}
                </a>
                <button class="del" id="delete-btn-${myLeads[i]}">🗑️</button> 
                </div>
            </li>
        `
        let id = `delete-btn-${myLeads[i]}`
        ids.push({"key": id, "value": myLeads[i]})
    }
    ulEl.innerHTML = listItems  
    for (let j = 0; j < ids.length; j++){
        console.log(ids[j].key)
        document.getElementById(ids[j].key).addEventListener("click",function(){
            let val = ids[j].value
            const index = myLeads.indexOf(val);
            if (index > -1) { // only splice myLeads when item is found
              myLeads.splice(index, 1); // 2nd parameter means remove one item only
            }
            renderLeads(myLeads)
        })
    }
}
