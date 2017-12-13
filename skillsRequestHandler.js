
var skillsModel;

exports.deleteSkill = function(res, sk, list){
    skillsModel.remove({skill : sk, skillType : list}, function(err, sk){
           console.log("Error occured:" + err);
    });
};

exports.addSkill = function(res, sk, list){
    skillsModel.create({skill : sk, skillType : list}, function(err, sk){
           console.log("Error occured:" + err);
    });
};



exports.listSkill = function(res){
    var skillsHave = [], skillsNeed = [];

    skillsModel.find({skillType:'Need'}, function(err, skills){
        if(skills){
            skills.forEach(function (skill) {   
                skillsNeed.push(skill.skill);       
            })
        }
        skillsModel.find({skillType:'Have'}, function(err, skills){
            if(skills){
                skills.forEach(function (skill) {
                    skillsHave.push(skill.skill);       
                })
            }
            var data = new Object;
            data.skillsHave = skillsHave;
            data.skillsNeed = skillsNeed;
            res.write(JSON.stringify(data));
            res.end();
        })

     })
};

exports.setModel = function(model){
  skillsModel = model;
};
