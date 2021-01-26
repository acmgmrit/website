// Modules
const members = require('../data/members');


let getStats = (req, res) => {
    let branch = {};
    let gender = {};
    let period = {};
    let batch = {
        _2020: 0,
        _2019: 0,
        _2018: 0,
        _2017: 0
    };


    members.forEach((member) => {
        if(member.acm_id != "") {

            if(branch[member.department]){
                branch[member.department] += 1;
            } else {
                branch[member.department] = 1;
            };

            if(gender[member.gender]){
                gender[member.gender] += 1;
            } else {
                gender[member.gender] = 1;
            };

            if(period["_" + member.no_of_years]) {
                period["_" + member.no_of_years] += 1;
            } else {
                period["_" + member.no_of_years] = 1;
            };

            switch (member.jntu_number.substring(0,5)) {
                case '20341':
                    batch._2020 +=1;
                    break;
                case '19341':
                    batch._2019 += 1;
                    break;
                case '18341':
                    batch._2018 +=1;
                    break;
                case '19345':
                    batch._2018 +=1;
                    break;
                case '18345':
                    batch._2017 +=1;
                    break;
                case '17341':
                    batch._2017 +=1;
                    break;
            };

        }
    });

    branch_labels = [];
    branch_data = [];
    for (let key in branch) {
        branch_labels.push(key);
        branch_data.push(branch[key])
    }

    gender_data = [];
    for (let key in gender) {
        gender_data.push(gender[key]);
    }
    
    batch_labels = [];
    batch_data = [];
    for (let key in batch) {
        batch_labels.push(key);
        batch_data.push(batch[key])
    }

    period_data = [];
    for (let key in period) {
        period_data.push(period[key]);
    }

    res.render('members_stats', {
        branch_labels,
        branch_data,
        gender_data,
        batch_data,
        batch_labels,
        period_data
    });
};


let getMembers = (req, res) => {
    // ADD SESSIONS HERE ----------------------------->
    session = false;
    if(session) {
        members_str_private = JSON.stringify(members);
        res.render('members_details', {members: members_str_private, session});
    } else {  
        members_str_public = members;
        members_str_public = members_str_public.map( member => {
            delete(member.phone_number);
            delete(member.email);
            return member
        });
        members_str_public = JSON.stringify(members_str_public);
        res.render('members_details', {members: members_str_public, session});
    }
};

let getMember = (req, res, id) => {
    member = members.filter(member => member.acm_id == id);
    if(member.length === 0){
        res.status(400).send({msg: "Member Not Found"})
    } else {
        member = JSON.stringify(member[0])
        res.render('member_details', {member});
    }
};

module.exports = {
    getStats,
    getMembers,
    getMember
};