/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './Upload.css'
import { BE_URL } from '../../config';

// eslint-disable-next-line react/prop-types
const Upload = ({ setPage }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
        } else {
            alert('Please upload a CSV file');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please upload a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${BE_URL}/api/v1/csv/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('File uploaded successfully');
                setFile(null); // Reset file state
                setPage("list");
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading file');
        }
    };

    return (
        <div className="container">
            <div className="upload-container">
                <label htmlFor="csv-upload" className="upload-button">
                    Select CSV
                </label>
                <input
                    className='upload-button'
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                />
                <button className='upload-button' onClick={handleUpload} disabled={!file}>Upload</button>
            </div>
            {file && (
                <div className="file-info">
                    <p>Uploaded File: {file.name}</p>
                </div>
            )}
        </div>
    );
}

export default Upload