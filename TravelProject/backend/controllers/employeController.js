const Employe = require('../models/employe');

//kena me bo me marr te gjitha employet mi bo insert dhe update


//per mi marr krejt puntort
const getEmployes = async (req, res) => {
    try {
        const employes = await Employe.findAll();
        res.json(employes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//

// per mi insertu nje puntetor

const insertEmploye = async (req, res) => {
    try {
        const { name, surname } = req.body;
        const employe = await Employe.create({ name, surname });
        res.json(employe);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//per mi update nje puntetor
const updateEmploye = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname } = req.body;
        const employe = await Employe.findOne({ where: { id } });
        if (!employe) {
            return res.status(404).json({ error: 'Employe not found' });
        }
        employe.name = name;
        employe.surname = surname;
        await employe.save();
        res.json(employe);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getEmployes,
    insertEmploye,
    updateEmploye
};




