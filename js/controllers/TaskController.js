import {Task} from "../models/TaskModel.js"


// CONTROLLER - Obsahuje aplikační logiku
function Controller(model,view){
    // Zpracovává list buttonů pro jednotlivé události (delete/complete/show lists)
    this.processListButtonEvent =
        function(el,input){
            const buttonName = el.name;
            // Pokud je input validní (non-null), vytvoří objekt Task a přidá ho do modelu
            if (buttonName==="add"){
                if(input){
                    model.addItem(new Task(input));
                }
            }

            // Odebere Task z listu
            else if (buttonName==="remove")model.removeItem(el.id);

            // Označí task jako hotový
            else if (buttonName==="complete"){
                model.completeItem(el.id);}

            // Vypíše celý list
            else if (buttonName==="list"){
                model.showAll();
            }

            // Vypíše list aktivních tasku
            else if (buttonName==="activeList"){
                model.showActive();
            }

            // Vypíše list hotových tasku
            else if (buttonName==="completeList"){
                model.showComplete();
            }

            // Vyčistí list
            else if (buttonName==="reset"){
                model.clear();
            }
            else if(buttonName==="edit"){
                if(input){
                    model.editItem(el.id,input);
                }

            }
        }


    // Pokud je model změněn -> update view
    this.listModified =
        function(list){
            view.render(list);
        }



    // Propojení button událostí se zpracováním událostí
    view.listButtonEvent.attach(this.processListButtonEvent);

    // Propojení změn s view
    model.listModifiedEvent.attach(this.listModified);
}

export default Controller;
