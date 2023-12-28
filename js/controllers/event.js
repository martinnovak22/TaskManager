// Event Dispatcher
// Používá se pro komunikaci mezi view a model
function Event(notifier){
    this.notifier = notifier;
    this.listeners = [];
}

// Metody pro attach a notify listenerů
Event.prototype = {
    attach: function(listener){this.listeners.push(listener);
    },
    notify: function(val1,val2){
        for (let i=0; i<this.listeners.length; i++){
            (this.listeners[i])(val1,val2);}
    }
}

export default Event;

