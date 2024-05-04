
class ContextHandler {
    constructor() {
        if (localStorage.getItem("context-list") === null){
            localStorage.setItem("context-list", JSON.stringify(["general"]))
            this.list = ["general"]
        } else {
            this.list = JSON.parse(localStorage.getItem("context-list"))
        }
    }

    addContext(name){
        this.list.push(name)
        localStorage.setItem("context-list", JSON.stringify(this.list))
    }

    getContexts(){
        return this.list
    }
}

class ContextStore {
    constructor(name, element) {
        if (localStorage.getItem(name) === null){
            localStorage.setItem(name, JSON.stringify([""]))
            this.list = []
            this.current = name
        } else {
            this.list = JSON.parse(localStorage.getItem(name))
            this.current = name
        }
        this.element = element
    }

    changeContext(name){
        if (localStorage.getItem(name) === null){
            localStorage.setItem(name, JSON.stringify([""]))
            this.list = []
            this.current = name
        } else {
            this.list = JSON.parse(localStorage.getItem(name))
            this.current = name
        }
    }

    setNewList(list){
        localStorage.setItem(this.current, JSON.stringify(list))
    }

    render(){
    let listItems = ""
    let ids = []
    for (let i = 0; i < this.list.length; i++) {
        // console.log(`for element ${Object.values(this.list[i])}`)
        listItems += `
            <li>
                
                <div class=sites> 
                <a target='_blank' href='${this.list[i].href}'>
                ${this.list[i].name}
                </a>
                <button class="del" id="delete-btn-${this.list[i].name}">Del</button> 
                </div>
            </li>
        `
        let id = `delete-btn-${this.list[i].name}`
        ids.push({"key": id, "value": this.list[i].name})
    }
    this.element.innerHTML = listItems  
    for (let j = 0; j < ids.length; j++){
        // console.log(ids[j].key)
        const ctx = new ContextStore(this.current, this.element)
        document.getElementById(ids[j].key).addEventListener("click",function(){
            let val = ids[j]
            // console.log(`deleting ${val.value} `)
            let index = -1
            for (let i = 0; i < ctx.list.length; i++) {
                // console.log(`checking ${val.value} == ${ctx.list[i].name}`)
                if (ctx.list[i].name == val.value ) {
                    index = i
                }
            }
            if (index > -1) { // only splice this.list when item is found
                ctx.list.splice(index, 1); // 2nd parameter means remove one item only
            }
            // console.log(`deleted ${index}`)
            ctx.setNewList(ctx.list)
            ctx.render()
        })
    }
    }

    pushValue(nameOfHref,hrefValue){
        this.list.push({name:nameOfHref, href:hrefValue})
        localStorage.setItem(this.current, JSON.stringify(this.list))
    }

    setCurrent(name){
        this.current = name
    }

    getValues(){
        return this.list
    }
}

export {
    ContextHandler,
    ContextStore,
  }