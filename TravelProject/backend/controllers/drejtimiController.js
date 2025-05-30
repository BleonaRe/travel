const Universiteti = require('../models/universiteti');
const Drejtimi = require('../models/drejtimi');

//kena me bo me marr te gjitha kontratat mi bo insert dhe update

const getDrejtimet = async (req, res) => {

    try {
    const drejtimet = await Drejtimi.findAll({
        include: [
            {model: Universiteti, attributes: ['universityName', 'city']}
        ]
    });
        res.json(drejtimet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// per mi insertu nje kontrate
const insertDrejtimi = async (req, res) => {
    try {

        const { drejtimiName, duration, universityId } = req.body;
        const drejtimi = await Drejtimi.create({ drejtimiName, duration, universityId });

        const universiteti = await Drejtimi.findByPk(drejtimi.id, {
            include: [
                { model: Universiteti, attributes: ['universityName', 'city'] }
            ]
        })
        res.json(universiteti);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getDrejtimet,
   insertDrejtimi,
   
};



