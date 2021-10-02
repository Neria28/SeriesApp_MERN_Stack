const Subs = require('../Schemas/subscriptionsModel')
const Members = require('../Schemas/membersModel')

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
            date : obj,memberId,
        });
        sub.save(function(err , data){
            err?rejects(err) : resolve(data)
        })
    });
}

