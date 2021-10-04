const Members = require('../Schemas/membersModel')
const Subs = require("../Schemas/subscriptionsModel");

exports.getAllMembers = function(){
    return new Promise((resolve , rejcet)=>{
        Members.find({} , function(err , data){
            err? reject(err) : resolve(data)
        })
    })
}


exports.getMember = function(id){
    return new Promise((resolve , rejcet)=>{
        Members.findById(id , function(err , data){
            err? reject(err) : resolve(data)
        })
    })
}


exports.updateMember  = function(id , obj){
    return new Promise((resolve, reject)=>{
        Members.findByIdAndUpdate(id ,{
            fullName : obj.fullName,
            email : obj.email,
            city: obj.city,
        }, function(err){
            err?reject(err) : resolve({text : "Member has been updated" , member : obj})
        })
    })
}

exports.addMember = function(obj){
    return new Promise((resolve , reject)=>{
        let member = new Members({
            fullName : obj.fullName,
            email : obj.email,
            city : obj.city
        });
        member.save(function(err , data){
            err? reject(err) : resolve(data)
        })
    })
}

exports.deleteMember = function (id) {
    return new Promise((resolve, reject) => {
        Members.findByIdAndDelete(id, function (err, data) {
        if (err) {
          reject(err);
        } else {
          Subs.deleteMany({ memberId: id }, (error) => {
            error ? reject(error) : resolve("Member deleted");
          });
        }
      });
    });
  };

