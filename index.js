import { ContextHandler, ContextStore} from "./src/Contexts.js"


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

inputEl.addEventListener('keyup', function(e){
    if (e.key === 'Enter' || e.keyCode === 13){
        contextStore.pushValue(inputEl.value, inputEl.value)
        inputEl.value = ""
        contextStore.render()
    }
})

curTab.addEventListener('click',function(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
        contextStore.pushValue(tabs[0].title, tabs[0].url)
        contextStore.render()
    })
    
})

allTab.addEventListener('click',function(){
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        for (let i = 0; i < tabs.length ; i++){
            contextStore.pushValue(tabs[i].title, tabs[i].url)
        }
        contextStore.render()
    })
    
})

inputBtn.addEventListener("click", function() {
    contextStore.pushValue(inputEl.value, inputEl.value)
    inputEl.value = ""
    contextStore.render()
})

delBtn.addEventListener("dblclick", function() {
    contextStore.clear()
    contextStore.render()
})
