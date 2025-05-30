import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Drejtimi() {
    const [drejtimet, setDrejtimet] = useState([]);
    const [drejtimiName, setDrejtimiName] = useState('');
    const [duration, setDuration] = useState('');
    const [universityId, setUniversityId] = useState('');
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        const fetchDrejtimet = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getDrejtimet');
                setDrejtimet(response.data);
            } catch (error) {
                console.error('Error fetching drejtimet:', error);
            }
        };

        const fetchUniversities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getUniversitetet');
                setUniversities(response.data);
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        };

        fetchDrejtimet();
        fetchUniversities();
    }, []);

    const handleInsert = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/insertDrejtimi', { drejtimiName, duration, universityId });
            setDrejtimet([...drejtimet, response.data]);
            setDrejtimiName('');
            setDuration('');
            setUniversityId('');
        } catch (error) {
            console.error('Error inserting drejtimi:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Drejtimet List</h1>
            <ul className="list-disc pl-5 mb-4">
                {drejtimet.map((drejtimi) => (
                    <li key={drejtimi.id} className="mb-2">
                        {drejtimi.drejtimiName} - {drejtimi.duration} years (University: {drejtimi.Universiteti?.universityName}, {drejtimi.Universiteti?.city})
                    </li>
                ))}
            </ul>
            <div className="bg-gray-100 p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-2">Add Drejtimi</h2>
                <input
                    type="text"
                    placeholder="Drejtimi Name"
                    value={drejtimiName}
                    onChange={(e) => setDrejtimiName(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Duration (years)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <select
                    value={universityId}
                    onChange={(e) => setUniversityId(e.target.value)}
                    className="border p-2 mb-2 w-full"
                >
                    <option value="">Select University</option>
                    {universities.map((university) => (
                        <option key={university.id} value={university.id}>
                            {university.universityName} ({university.city})
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

export default Drejtimi;