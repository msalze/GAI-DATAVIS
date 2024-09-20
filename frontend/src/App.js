import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';

// Custom styling for the file input
const Input = styled('input')({
  display: 'none',
});

function App() {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [data, setAllData] = useState(null);
  const [summary, setSummary] = useState(null);

  const [isShowSummary, setIsShowSummary] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
    
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        'method': 'POST',  
      headers: {
          'Content-Type': 'multipart/form-data',
          
        },
        withCredentials: true  // In case you need to handle cookies/session data

      });

      const {data} = response;
      setAllData(data);
      setTableData(data.table); // Assuming the response contains the data to visualize.
      setSummary(data.summary); // Assuming the response contains the data to visualize.
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    
    setFile(file ? file.name : null);
  }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
    Population Data Web App
    <Typography variant="h4" gutterBottom>
      
    </Typography>
{/* Upload Section */}
<Box mb={4}>
        <label htmlFor="file-upload">
          <Input
            accept=".csv,.xlsx,.json"
            id="file-upload"
            type="file"
            onChange={handleSubmit}
          />
          <Button
            variant="contained"
            component="span"
    
            style={{ backgroundColor: '#1976d2', color: 'white' }}
          >
            Upload File
          </Button>
        </label>
      </Box>

      {/* Action Buttons */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setIsShowSummary(true)}
          >
            Show Summary
          </Button>
          
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => console.log('Action 2 button clicked')}
          >
            Action 2
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={() => console.log('Action 3 button clicked')}
          >
            Action 3
          </Button>
        </Grid>
      </Grid>
      {summary && (
        <div>
          <h3>Summary</h3>
    {summary}
        </div>
      )}
    </Container>
  );
}

export default App;