// src/PasteView.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const View = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const response = await fetch(`https://pasteitbe.abhiramreddy.shop/pasteit/${id}`);
        if (!response.ok) {
          throw new Error('Paste not found');
        }
        const data = await response.json();
        setPaste(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPaste();
  }, [id]);

  if (error) return <div>Error: {error}</div>;

  if (!paste) return <div>Loading...</div>;

  // Convert the created_at time to IST by adding 5.5 hours
  const convertToIST = (dateStr) => {
    const date = new Date(dateStr);
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    return date.toLocaleString();
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    const url = `${window.location.origin}/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      console.log('Link copied to clipboard!');
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const url = `${window.location.origin}/${id}`;

  return (
    <div className="flex flex-col font-['Poppins'] min-h-screen bg-gray-100">
      <header className="w-full max-w-2xl mx-auto text-center mt-4">
        <h1 className="text-3xl font-semibold text-gray-800 mt-2 mb-4">PasteIt</h1>
        <p className="text-lg text-gray-600">
          Generate a shareable link for your text. Simple and efficient.
        </p>
      </header>

      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6 mb-6">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <a 
            href={url} 
            className="text-blue-500 underline hover:text-blue-700 bg-gray-100 p-3 border border-gray-300 rounded-lg shadow-sm transition-colors"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {url}
          </a>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Copy Link
          </button>
        </div>

        <ReactMarkdown className="p-4 border markdown border-gray-300 rounded-lg bg-gray-50">
          {paste.content}
        </ReactMarkdown>
        <div className="mt-4">
          <p className="text-gray-600">Views: {paste.views}</p>
          <p className="text-gray-600">Created At: {convertToIST(paste.created_at)}</p>
        </div>
      </div>
    </div>
  );
};

export default View;
