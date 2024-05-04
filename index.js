import { ContextHandler, ContextStore} from "./src/Contexts.js"

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const delBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const curTab = document.getElementById("add-current")
const allTab = document.getElementById("add-all")
// 1. Store the delete button in a deleteBtn variable
const contextHandler = new ContextHandler()
let groupName = contextHandler.getContexts()[0]
let contextStore = new ContextStore(groupName, ulEl)
// let leadsFromLocalStorage = JSON.parse( localStorage.getItem(groupName) )

// if (leadsFromLocalStorage) {
//     myLeads = leadsFromLocalStorage
//     renderLeads(myLeads)
// }

// 2. Listen for double clicks on the delete button (google it!)
// 3. When clicked, clear localStorage, myLeads, and the DOM

inputEl.addEventListener('keyup', function(e){
    if (e.key === 'Enter' || e.keyCode === 13){
        // myLeads.push({name:inputEl.value, href:inputEl.value})
        contextStore.pushValue(inputEl.value, inputEl.value)
        inputEl.value = ""
        // localStorage.setItem(groupName, JSON.stringify(myLeads) )
        // renderLeads(myLeads)
        contextStore.render()
    }
})

curTab.addEventListener('click',function(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
        // console.log(tabs)
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        myLeads.push({name:tabs[0].title, href:tabs[0].url})
        localStorage.setItem(groupName, JSON.stringify(myLeads) )
        renderLeads(myLeads)
    })
    
})

allTab.addEventListener('click',function(){
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        // console.log(tabs)
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        for (let i = 0; i < tabs.length ; i++){
            myLeads.push({name:tabs[i].title, href:tabs[i].url})
        }
        localStorage.setItem(groupName, JSON.stringify(myLeads) )
        renderLeads(myLeads)
    })
    
})

inputBtn.addEventListener("click", function() {
    myLeads.push({name:inputEl.value, href:inputEl.value})
    inputEl.value = ""
    localStorage.setItem(groupName, JSON.stringify(myLeads) )
    renderLeads(myLeads)
})

delBtn.addEventListener("dblclick", function() {
    localStorage.setItem(groupName,null)
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
                <a target='_blank' href='${myLeads[i].href}'>
                ${myLeads[i].name}
                </a>
                <button class="del" id="delete-btn-${myLeads[i]}">Del</button> 
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
