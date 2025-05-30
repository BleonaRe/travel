const Contract = require('../models/contract');
const Employe = require('../models/employe');

//kena me bo me marr te gjitha kontratat mi bo insert dhe update

const getContracts = async (req, res) => {

    try {
    const contracts = await Contract.findAll({
        include: [
            {model: Employe, attributes: ['name', 'surname']}
        ]
    });
        res.json(contracts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// per mi insertu nje kontrate
const createContract = async (req, res) => {
    try {

        const { title, description, employeId } = req.body;
        const contract = await Contract.create({ title, description, employeId });

        const employe = await Contract.findByPk(contract.id, {
            include: [
                { model: Employe, attributes: ['name', 'surname'] }
            ]
        })
        res.json(employe);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// per mi delete contract

const deleteContract = async (req, res) => {
    try {
        const id = req.params.id;
        await Contract.destroy({ where: { id } });
        res.json({ message: 'Contract deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getContracts,
    createContract,
    deleteContract
};



