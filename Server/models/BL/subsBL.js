const Subs = require('../Schemas/subscriptionsModel')


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