let ProjectModule = (function(){
    
    let instance,
        participants = [],
        pricing = {},
        isBusy = false;

    let init = function(participants, pricing) {
        if(Array.isArray(participants)){
            if(participants.length == 0 || participants.every((item) => 'seniorityLevel' in item)) {
                this.participants = participants;
            }
        }
        if(typeof pricing == 'object' && pricing != null) this.pricing = pricing;
    }

    let findParticipant = function(functor, callbackFunction) {
        // if(this.isBusy == true) return false;
        this.isBusy = true;
        setTimeout(() => {
            let participant = this.participants.find(functor);
            if(participant != undefined){
                callbackFunction (participant);
            }else{
                callbackFunction (null);
            }
            this.isBusy = false;
        }, 10);
    }

    let findParticipants = function (functor, callbackFunction) {
        // if(this.isBusy == true) return false;
        this.isBusy = true;
        setTimeout(() => {
            let participantsArray = this.participants.filter(functor);
            callbackFunction (participantsArray);      
            this.isBusy = false;
        }, 10);
    }

    let addParticipant = function(participantObject, callbackFunction) {
        // if(this.isBusy == true) return false;
        this.isBusy = true;
        setTimeout(() => {
            try{
                if(typeof participantObject == 'object' && 'seniorityLevel' in participantObject){
                    this.participants.push(participantObject);
                    callbackFunction();     
                }else{
                   throw new Error('Wrong Data!');
                }
            }catch(err){
                callbackFunction(err);   
            }
            this.isBusy = false;
        }, 10);
    }

    let removeParticipant = function(participantObject, callbackFunction) {
        // if(this.isBusy == true) return false;
        this.isBusy = true;
        setTimeout(() => {
            let removedParticipant = null;
            for (let i = 0; i < this.participants.length; i++){
                if(this.participants[i] == participantObject){
                    removedParticipant = this.participants.splice(i, 1)[0];
                    break;
                    }                        
                }
            callbackFunction(removedParticipant);        
            this.isBusy = false;
        }, 10);
    }

    let setPricing = function(participantPriceObject, callbackFunction) {
        // if(this.isBusy == true) return false;
        this.isBusy = true;
        setTimeout(() => {
           Object.assign(this.pricing, participantPriceObject);
           callbackFunction();
           this.isBusy = false;
        }, 10);
    }

    let calculateSalary = function(periodInDays) {
        try{
            const workDayDuration = 8;
            let overallSalary = 0;
            let workedHours = periodInDays*workDayDuration;
            for (let participant of this.participants){
                let key = participant.seniorityLevel;   
                overallSalary += this.pricing[key]*workedHours;            
            }
            if(!isNaN(overallSalary)){
                return overallSalary;
            }else{
                throw new Error('Wrong Data!')
            }
        }catch(err){
            throw err;
        }
    }

    let createInstance = function(){
        return {
            participants: participants,
            pricing: pricing,
            isBusy: isBusy,
            init: init,
            findParticipant: findParticipant,
            findParticipants: findParticipants,
            addParticipant: addParticipant,
            removeParticipant: removeParticipant,
            setPricing: setPricing,
            calculateSalary: calculateSalary
        }
    }

    return{
        getInstance: function(){
            return instance || (instance = createInstance())
        }
    }
})();

module.exports = {
    firstName: 'Vitaliy',
    lastName: 'Malets',
    task: ProjectModule.getInstance()
}