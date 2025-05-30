import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Planet() {
    const [planets, setPlanets] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [updateId, setUpdateId] = useState(null);

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getPlanets');
                setPlanets(response.data);
            } catch (error) {
                console.error('Error fetching planets:', error);
            }
        };

        fetchPlanets();
    }, []);

    const handleInsert = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/insertPlanet', { name, type });
            setPlanets([...planets, response.data]);
            setName('');
            setType('');
        } catch (error) {
            console.error('Error inserting planet:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/updatePlanet/${updateId}`, { name, type });
            setPlanets(planets.map(planet => planet.id === updateId ? response.data : planet));
            setName('');
            setType('');
            setUpdateId(null);
        } catch (error) {
            console.error('Error updating planet:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Planets List</h1>
            <ul className="list-disc pl-5 mb-4">
                {planets.map((planet) => (
                    <li key={planet.id} className="mb-2">
                        {planet.name} ({planet.type})
                        <button
                            className="ml-2 text-blue-500 hover:underline"
                            onClick={() => {
                                setName(planet.name);
                                setType(planet.type);
                                setUpdateId(planet.id);
                            }}
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
            <div className="bg-gray-100 p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-2">{updateId ? 'Update Planet' : 'Add Planet'}</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <button
                    onClick={updateId ? handleUpdate : handleInsert}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {updateId ? 'Update' : 'Add'}
                </button>
            </div>
        </div>
    );
}

export default Planet;