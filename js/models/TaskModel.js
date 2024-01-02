import Event from "../controllers/event.js"

//MODEL - Obsahuje data a zastupuje bussines logiku
export default function Model(){
    this.list = [];
    this.listModifiedEvent = new Event(this);
}

Model.prototype = {
    // Přidá task do listu
    addItem: function (item){
        this.list.push(item);
        this.listModifiedEvent.notify(this.list);
    },

    // Odebere task z listu
    removeItem: function (id){
        this.list.splice(id,1);
        this.listModifiedEvent.notify(this.list);
    },

    // Zaškrtne splnění tasku
    completeItem: function (id){
        const item = this.list[id];
        item.isActive= !item.isActive;
        this.listModifiedEvent.notify(this.list);
    },

    // Edituje text tasku
    editItem: function (id,input){
        const item = this.list[id];
        item.item=input;
        this.listModifiedEvent.notify(this.list);
    },

    // Vypíše všechny tasky
    showAll: function(){
        for (let i=0; i<this.list.length; i++){
            this.list[i].visible=true;
        }
        this.listModifiedEvent.notify(this.list);
    },

    // Vypíše pouze aktivní tasky
    showActive: function(){
        for (let i=0; i<this.list.length; i++){
            const item = this.list[i];
            item.visible = !!item.isActive;
        }
        this.listModifiedEvent.notify(this.list);
    },

    // Vypíše pouze dokončené tasky
    showComplete: function(){
        for (let i=0; i<this.list.length; i++){
            const item = this.list[i];
            item.visible = !item.isActive;
        }
        this.listModifiedEvent.notify(this.list);
    },

    // Smaže celý list
    clear: function(){
        this.list.length = 0;
        this.listModifiedEvent.notify(this.list);
    },

    // Ukládá list do local storage
    saveToLocal: function(){
        console.log("save: " + JSON.stringify(this.list));
        localStorage.setItem("todoItemsList", JSON.stringify(this.list));
    },

    // Načítá list z local storage
    remember: function(){
        const localStore = localStorage.getItem("todoItemsList");
        if (localStore){
            this.list = JSON.parse(localStore);
        }
    }

}

// Objektová reprezentace tasku
export function Task(item){
    this.item = item;
    this.isActive = true;
    this.visible = true;
}

