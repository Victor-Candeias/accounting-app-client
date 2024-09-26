import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainMenu = () => {
    const [data, setData] = useState('');
    const [newData, setNewData] = useState('');
  
    // Fetch data from the backend
    useEffect(() => {
      axios.get('http://localhost:3001/api/data')
        .then(response => {
          setData(response.data.content);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    // Handle form submit to update the text file
    const handleSubmit = (e) => {
      e.preventDefault();
  
      axios.post('http://localhost:3001/api/data', { content: newData })
        .then(response => {
          alert('File updated successfully');
          setData(newData); // Update the displayed content
        })
        .catch(error => {
          console.error('Error updating file:', error);
        });
    };
  
    return (
      <div className="App">
        <h1>Text File as Database</h1>
  
        <h2>Current Data:</h2>
        <p>{data}</p>
  
        <form onSubmit={handleSubmit}>
          <textarea
            value={newData}
            onChange={(e) => setNewData(e.target.value)}
            rows="5"
            cols="50"
            placeholder="Update the file"
          />
          <br />
          <button type="submit">Update File</button>
        </form>
      </div>
    );
}

export default MainMenu;