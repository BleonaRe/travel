import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contract() {
    const [contracts, setContracts] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [employeId, setEmployeId] = useState('');

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getCont');
                setContracts(response.data);
            } catch (error) {
                console.error('Error fetching contracts:', error);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getEmp');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchContracts();
        fetchEmployees();
    }, []);

    const handleInsert = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/insertCont', { title, description, employeId });
            setContracts([...contracts, response.data]);
            setTitle('');
            setDescription('');
            setEmployeId('');
        } catch (error) {
            console.error('Error inserting contract:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteCont/${id}`);
            setContracts(contracts.filter(contract => contract.id !== id));
        } catch (error) {
            console.error('Error deleting contract:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Contracts List</h1>
            <ul className="list-disc pl-5 mb-4">
                {contracts.map((contract) => (
                    <li key={contract.id} className="mb-2">
                        {contract.title} - {contract.description} (Employee: {contract.Employe.name} {contract.Employe.surname})
                        <button
                            className="ml-2 text-red-500 hover:underline"
                            onClick={() => handleDelete(contract.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div className="bg-gray-100 p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-2">Add Contract</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <select
                    value={employeId}
                    onChange={(e) => setEmployeId(e.target.value)}
                    className="border p-2 mb-2 w-full"
                >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name} {employee.surname}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleInsert}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default Contract;