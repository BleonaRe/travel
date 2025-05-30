const Universiteti = require('../models/universiteti');


const getUniversitetet = async (req, res) => {
    try {
        const universitetet = await Universiteti.findAll();
        res.json(universitetet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//


// per mi insertu nje universitet


const insertUniversity = async (req, res) => {
    try {
        const { universityName, city } = req.body;
        const universiteti = await Universiteti.create({ universityName, city });
        res.json(universiteti);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//per mi update nje puntetor
const updateUniversity = async (req, res) => {
    try {
        const { id } = req.params;
        const { universityName, city } = req.body;
        const universiteti = await Universiteti.findOne({ where: { id } });
        if (!universiteti) {
            return res.status(404).json({ error: 'Universiteti not found' });
        }
        universiteti.universityName = universityName;
        universiteti.city = city;
        await universiteti.save();
        res.json(universiteti);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// per mi delete contract

const deleteUniversity = async (req, res) => {
    try {
        const id = req.params.id;
        await Universiteti.destroy({ where: { id } });
        res.json({ message: 'University deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUniversitetet,
    insertUniversity,
    updateUniversity,
     deleteUniversity,
};




