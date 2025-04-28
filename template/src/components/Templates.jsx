import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('https://your-strapi-cms.com/api/templates');
        setTemplates(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching templates:', error);
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading templates...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {templates.map((template) => (
        <div key={template.id} className="border rounded-lg p-4 shadow hover:shadow-lg">
          <img
            src={`https://your-strapi-cms.com${template.attributes.thumbnail.data.attributes.url}`}
            alt={template.attributes.title}
            className="rounded mb-4 w-full h-48 object-cover"
          />
          <h2 className="text-xl font-bold mb-2">{template.attributes.title}</h2>
          <p className="text-gray-600 mb-4">{template.attributes.description}</p>
          <div className="flex gap-4">
            <a
              href={template.attributes.previewLink}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview
            </a>
            <a
              href={template.attributes.downloadLink}
              className="text-green-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Templates;
