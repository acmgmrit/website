const router = require('express').Router();


const members = require('../../data/members');

// GET all members
router.get('/', (req, res) => res.json(members));


// GET particular member
// @Route /api/members/:id
router.get('/:id', (req, res) => {
    let id = req.params.id;
    member = members.filter(member => member.acm_id == id || member.jntu_number == id);
    if(member.length === 0){
        res.status(400).send({msg: "Member Not Found"})
    } else {
        res.json(member);
    }
});



module.exports = router ;