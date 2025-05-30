import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Universiteti() {
    const [universities, setUniversities] = useState([]);
    const [universityName, setUniversityName] = useState('');
    const [city, setCity] = useState('');
    const [updateId, setUpdateId] = useState(null);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getUniversitetet');
                setUniversities(response.data);
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        };

        fetchUniversities();
    }, []);

    const handleInsert = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/insertUniversity', { universityName, city });
            setUniversities([...universities, response.data]);
            setUniversityName('');
            setCity('');
        } catch (error) {
            console.error('Error inserting university:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/updateUniversity/${updateId}`, { universityName, city });
            setUniversities(universities.map(university => university.id === updateId ? response.data : university));
            setUniversityName('');
            setCity('');
            setUpdateId(null);
        } catch (error) {
            console.error('Error updating university:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteUniversity/${id}`);
            setUniversities(universities.filter(university => university.id !== id));
        } catch (error) {
            console.error('Error deleting university:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Universities List</h1>
            <ul className="list-disc pl-5 mb-4">
                {universities.map((university) => (
                    <li key={university.id} className="mb-2">
                        {university.universityName} - {university.city}
                        <button
                            className="ml-2 text-blue-500 hover:underline"
                            onClick={() => {
                                setUniversityName(university.universityName);
                                setCity(university.city);
                                setUpdateId(university.id);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="ml-2 text-red-500 hover:underline"
                            onClick={() => handleDelete(university.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div className="bg-gray-100 p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-2">{updateId ? 'Update University' : 'Add University'}</h2>
                <input
                    type="text"
                    placeholder="University Name"
                    value={universityName}
                    onChange={(e) => setUniversityName(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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

export default Universiteti;