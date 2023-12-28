import Model from "./models/TaskModel.js";
import Controller from "./controllers/TaskController.js";
import View from "./views/TaskListView.js"

const model = new Model();
const view = new View();
const controller = new Controller(model,view);

// Načte či uloží list (local storage)
if (typeof document !== 'undefined') {
    window.onload = loadOnStart;
    window.onbeforeunload = function () {
        saveOnExit();
        return null;
    }
}

// Načtení při startu
function loadOnStart(){
    model.remember();
    model.showAll();
}

// Uložení při exit
function saveOnExit(){
    model.saveToLocal();
}
