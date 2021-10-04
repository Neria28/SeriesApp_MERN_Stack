const Subs = require('../Schemas/subscriptionsModel')

exports.getSubscribers = function(){
    return new Promise((resolve , rejects)=>{
       Subs.find({} , function(err,data){
           err? reject(err) : resolve(data)
       })
    });
}


exports.newSubscriotion = function(obj){
    return new Promise((resolve , rejects)=>{
        let sub = new Subs({
            seriesId : obj.seriesId,
            memberId : obj.memberId,
            date : obj.date,
        });
        sub.save(function(err , data){
            err?rejects(err) : resolve({text : "sub created" , sub : data})
        })
    });
}

