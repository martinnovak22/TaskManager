import Event from "../controllers/event.js";

// VIEW - Obsahuje zobrazovací logiku a přijímá input
function View(){
    const context = this;

    // Interakce uživatele
    this.listButtonEvent = new Event(this);

    if (typeof document !== 'undefined') {
        const bodyElement = document.body;

        // List modifikující události (add/delete/complete/show lists)
        // Odchytává button události na celém body elementu
        bodyElement.addEventListener('click', function (event) {
            // Element způsobující událost
            const el = event.target;

            let input = null;
            if (el.nodeName === "BUTTON") {
                if (el.name === "add") {
                    input = context.userInput();
                }
                else if(el.name==="edit") {
                    el.disabled=true;
                    const textElement = el.parentElement.parentElement.querySelector("p");
                    const text = textElement.innerHTML;

                    const inputElement = document.createElement('input');
                    inputElement.type = 'text';
                    inputElement.value = text;
                    inputElement.className="editInput";

                    textElement.innerHTML="";

                    textElement.appendChild(inputElement);
                    textElement.addEventListener(("change"), (event)=>{
                        context.listButtonEvent.notify(el, event.target.value);
                        el.disabled=false;
                    })
                }
                context.listButtonEvent.notify(el, input);
            }
        });

        // Funkce získávající value z inputu
        this.userInput = function () {
            return document.getElementById("input").value;
        }

    }
}

// Metoda renderující view
View.prototype.render = function(list){

    const ul = document.querySelector("#mainList");
    ul.innerHTML = "";

    for (let i=0; i<list.length; i++){

        // Stavba elementu každého tasku
        const listItem = list[i];

        if (listItem.visible){
            const value = listItem.item;
            const li = document.createElement("li");
            li.innerHTML = "<p>"+value+"</p>" + "<div class='buttonBox'><button name='complete' id=" + i + ">✅</button>" + "<button name='remove' class='removeButton' id=" + i + ">❌</button><button name='edit' class='editButton' id=" + i + ">✏️</button></div>";

            // Vyškrnutí tasku
            if (!listItem.isActive){
                li.style.setProperty("color", "rgba(0, 0, 0, 0.25)");
                li.style.setProperty("background-color", "#DAF7A6");
            }


            ul.appendChild(li);
        }
    }
}

export default View;
