// Data import
members = require('../data/members.json');
sigs = require('../data/sig');

// Config file
const { writeDataToFile } = require('../config');

let sig = (req, res) => {
    members_str_public = members.map( member => {
            delete(member.phone_number);
            delete(member.email);
            return member
        });
        members_str_public = JSON.stringify(members_str_public);
    res.render('sig_form', { members: members_str_public, session: false});
};

let handle_sig = (req, res) => {
    member = members.filter(member => member.acm_id == req.body.id);
    if(member.length == 0) {
        res.status('404').send('Member not found');
        return
    } else {
        members = members.map(member => {
            if(member.acm_id == req.body.id) {
                member.sig = sigs[req.body.sig].name;
            }
            return member
        });
    }
    writeDataToFile('./data/members.json', members)
    res.send('Status Updated');
}


module.exports = {
    sig,
    handle_sig
}