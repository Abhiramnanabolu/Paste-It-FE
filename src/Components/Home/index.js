import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Home = () => {
  const [text, setText] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [activeSection, setActiveSection] = useState('text');
  const [pasteUrl, setPasteUrl] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handlePreview = () => {
    setPreviewText(text);
    setActiveSection('preview');
  };

  const handleHow = () => {
    setActiveSection('how');
  };

  const handleText = () => {
    setActiveSection('text');
  };

  const handleGo = async () => {
    try {
      const response = await fetch('https://pasteitbe.abhiramreddy.shop/pasteit/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const url = `${window.location.origin}/${data.id}`;
      setPasteUrl(url);
      setActiveSection('text');
      
      // Redirect to the new URL
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const markdownExample = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

**Bold Text**

*Italic Text*

***Bold and Italic Text***

[Link Text](https://example.com)

![Alt Text](https://via.placeholder.com/150)

> Blockquote

\`\`\`javascript
console.log('Code block');
\`\`\`

\`Inline code\`

- List Item 1
- List Item 2
  - Sub-item

1. First item
2. Second item
3. Third item

Horizontal Rule:

---

Task List:

- [x] Task 1 (completed)
- [ ] Task 2 (incomplete)
`;

  return (
    <div className="flex flex-col font-['Poppins'] min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="w-full max-w-2xl mx-auto text-center mt-4">
        <h1 className="text-3xl font-semibold font-['Noto+Serif] text-gray-800 mb-4">PasteIt</h1>
        <p className="text-lg text-gray-600">
          Generate a shareable link for your text. Simple and efficient.
        </p>
      </header>

      {/* Tabs Section */}
      <div className="w-full max-w-2xl mx-auto flex bg-white rounded-t-lg shadow-lg border-b-2 border-gray-200 mt-6">
        <button
          onClick={handleText}
          className={`flex-1 py-2 text-center font-semibold ${activeSection === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} border-r-2 border-gray-200`}
        >
          Text
        </button>
        <button
          onClick={handlePreview}
          className={`flex-1 py-2 text-center font-semibold ${activeSection === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} border-r-2 border-gray-200`}
        >
          Preview
        </button>
        <button
          onClick={handleHow}
          className={`flex-1 py-2 text-center font-semibold ${activeSection === 'how' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          How
        </button>
      </div>

      {/* Content Sections */}
      <div className="flex-1 w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg mt-0 flex flex-col p-6 mb-6">
        {activeSection === 'text' && (
          <section className="flex-1 flex flex-col">
            <textarea
              value={text}
              onChange={handleChange}
              className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none"
              placeholder="Paste or type your text here..."
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleGo}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
              >
                Go
              </button>
            </div>
            {pasteUrl && (
              <div className="mt-4">
                <p className="text-gray-800">Your paste is available at:</p>
                <a href={pasteUrl} className="text-blue-500">{pasteUrl}</a>
              </div>
            )}
          </section>
        )}

        {activeSection === 'preview' && (
          <section className="flex-1 flex flex-col">
            <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-auto">
              <ReactMarkdown className="markdown" children={previewText} />
            </div>
          </section>
        )}

        {activeSection === 'how' && (
          <section className="flex-1 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">How</h2>
            <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Example Text : </h3>
              <pre className="bg-gray-100 p-4 border border-gray-300 rounded-lg whitespace-pre-wrap">
                {markdownExample}
              </pre>
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Rendered View : </h3>
              <ReactMarkdown className="bg-gray-100 p-4 markdown border border-gray-300 rounded-lg" children={markdownExample} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
