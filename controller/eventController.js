const fetch = require('node-fetch');


let getEventStats = (req, res) => {
    fetch('https://gmritchapter.acm.org/event_info/get_stats.php')
    .then(res => res.json())
    .then(data => {

        let count = 0;
        let branch = {};
        let gender = {};
        let college = {};
        let year = {};



        data.forEach((member) => {
            count += 1;
            
            if(branch[member[5].replace(/ /g, '_')]){
                branch[member[5].replace(/ /g, '_')] += 1;
            } else {
                branch[member[5].replace(/ /g, '_')] = 1;
            };

            if(college[member[4].replace(/ /g, '_')]){
                college[member[4].replace(/ /g, '_')] += 1;
            } else {
                college[member[4].replace(/ /g, '_')] = 1;
            };

            if(gender[member[7]]){
                gender[member[7]] += 1;
            } else {
                gender[member[7]] = 1;
            };

            if(year["_" + member[6]]){
                year["_" + member[6]] += 1;
            } else {
                year["_" + member[6]] = 1;
            };

        });

        branch_labels = [];
        branch_data = [];
        for (let key in branch) {
            branch_labels.push(key);
            branch_data.push(branch[key])
        }

        college_labels = [];
        college_data = [];
        for (let key in college) {
            college_labels.push(key);
            college_data.push(college[key])
        }

        year_labels = [];
        year_data = [];
        for (let key in year) {
            year_labels.push(key);
            year_data.push(year[key])
        }

        gender_data = [];
        for (let key in gender) {
            gender_data.push(gender[key]);
        }
        

        res.render('events_stats', {
            branch_labels,
            branch_data,
            college_labels,
            college_data,
            year_data,
            gender_data,
            count
        });
    })
    .catch(err => console.log(err));
}

let getEvents = (req, res) => {
    res.send('all events');
};

module.exports = {
    getEventStats,
    getEvents
}

