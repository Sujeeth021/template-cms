import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/templates');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Available Templates</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {templates.map((template) => (
          <div
            key={template._id || template.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col md:flex-row gap-6"
          >
            <img
              src={template.thumbnail}
              alt={template.title}
              className="w-full md:w-40 h-40 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{template.title}</h2>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex gap-4">
                <a
                  href={template.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Preview
                </a>
                <a
                  href={template.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
