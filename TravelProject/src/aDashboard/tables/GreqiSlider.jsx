import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import Menu from '../Menu';

function GreqiSlider() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ title: '', file: null });
  const [message, setMessage] = useState('');

  // Fetch all images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/greqi-images', {
          withCredentials: true,
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setMessage('There was an error fetching images.');
      }
    };
    fetchImages();
  }, []);

  // Delete image
  const deleteGreqiImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/greqi-image-delete/${id}`, {
        withCredentials: true,
      });
      setImages((prevImages) => prevImages.filter((image) => image.id !== id));
      setMessage('Image deleted successfully.');
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage('Error deleting image.');
    }
  };

  // Handle title input change
  const handleInputChange = (e) => {
    setNewImage({ ...newImage, title: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setNewImage({ ...newImage, file: e.target.files[0] });
  };

  // Add new image
  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImage.file) {
      setMessage('Please select a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result.split(',')[1];
      try {
        await axios.post('http://localhost:5000/api/add-greqi-image', {
          imageBase64: base64String,
          title: newImage.title,
        });
        setMessage('Image added successfully.');
        setNewImage({ title: '', file: null });
      } catch (error) {
        console.error('Error adding image:', error);
        setMessage('Error adding image.');
      }
    };
    reader.readAsDataURL(newImage.file);
  };

  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Images</h2>
        {message && (
          <p
            className={`mb-4 ${
              message.includes('successfully') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}

        {/* Add new image form (inline) */}
        <form onSubmit={handleAddImage} className="mb-4 flex items-center">
          <input
            type="text"
            name="title"
            value={newImage.title}
            onChange={handleInputChange}
            placeholder="Image Title"
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Add Image
          </button>
        </form>

        {/* Images table */}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {images.map((image) => (
              <tr key={image.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{image.id}</td>
                <td className="py-3 px-6 text-left">{image.title}</td>
                <td className="py-3 px-6 text-left">
                  <img
                    src={`data:image/jpeg;base64,${image.imageBase64}`}
                    alt={image.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <Modal onConfirm={() => deleteGreqiImage(image.id)}>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Fshi
                    </button>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Menu */}
      <Menu />
    </div>
  );
}

export default GreqiSlider;
