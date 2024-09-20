import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Box, Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox
} from '@mui/material';

import * as d3 from 'd3';

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
  const [showChartOptions, setShowChartOptions] = useState(false);
  const [columnsOfInterest, setColumnsOfInterest] = useState({});

  const [selectedChart, setSelectedChart] = useState(null);

  const svgRef = useRef();

  const handleSelectedChartChange = (event) => {
    setSelectedChart(event.target.value);
  };


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

        const { data } = response;
        setAllData(data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }

      setFile(file ? file.name : null);
    }
  };

  const showSummary = () => {
    resetShowOptions()
    setSummary(data.summary); // Assuming the response contains the data to visualize.
  }

  const showTable = () => {
    resetShowOptions()
    setTableData(data.table); // Assuming the response contains the data to visualize.
  }

  const resetShowOptions = () => {
    setSummary(null)
    setTableData(null)
    setShowChartOptions(false);
    setSelectedChart(null);
  }

  const handleColumnsOfInterestChange = (item) => {
    if (columnsOfInterest && item in columnsOfInterest) {
      const columnsOfInterestTemp = { ...columnsOfInterest }
      delete columnsOfInterestTemp[item]
      setColumnsOfInterest({ ...columnsOfInterestTemp })
    } else {
      setColumnsOfInterest({ ...columnsOfInterest, [item]: item })
    }
  }

  const renderChart = () => {
    const selectedData = data.table;
    let indexesOf = Object.keys(columnsOfInterest).map(columnName => Object.keys(selectedData[0])[0].split(";").indexOf(columnName))
    indexesOf = [...indexesOf, 8]
    const restructuredData = selectedData.map(row => {
      const columns = Object.keys(row)[0].split(";").filter((value, index) => indexesOf.includes(index));
      const values = Object.values(row)[0].split(";").filter((value, index) => indexesOf.includes(index));

      const newObject = columns.reduce((previousValue, currentValue, currentIndex) => {
        previousValue[currentValue] = values[currentIndex]
        return previousValue
      }, {})

      return newObject
    })

    if (selectedChart === 'pie') {
      const pieChartData = getPieChartData(restructuredData)
      createPieChart(pieChartData);
    }
  }

  const getPieChartData = data => {
    const newData = Object.keys(columnsOfInterest).map(colum => {
     return countOccurrences(data, colum)
    })
    return Object.keys(newData[0]).map(key => {return {[key]: newData[0][key]}})
  }

  const countOccurrences = (array, key) => {
    return array.reduce((acc, obj) => {
      // Check if the key already exists in the accumulator
      if (acc[obj[key]]) {
        acc[obj[key]] += parseInt(obj['anzahl']); // Increment the count
      } else {
        acc[obj[key]] = parseInt(obj['anzahl']); // Initialize the count
      }
      return acc;
    }, {});
  };

  const createPieChart = (data) => {
    const svg = d3.select(svgRef.current)
      .attr('width', 400)
      .attr('height', 400);

    const radius = Math.min(400, 400) / 2;

    // Create a color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Prepare the pie data
    const pie = d3.pie()
      .value(d => Object.values(d)[0]);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Clear previous content
    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    const arcs = g.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .style('fill', (d) => color(Object.keys(d.data)[0]));

    arcs.append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .text((d) => {
        return Object.keys(d.data)[0]
      });
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

      {data && (

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => showSummary()}
            >
              Show Summary
            </Button>

          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => showTable()}
            >
              Show Table
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="success"
              fullWidth
              onClick={() => { resetShowOptions(); setShowChartOptions(true) }}
            >
              Show chart
            </Button>
          </Grid>
        </Grid>
      )}
      {summary && (
        <div>
          <h3>Summary</h3>
          {summary}
        </div>
      )}
      {tableData && tableData.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(tableData[0])[0].split(";").map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row)[0].split(";").map((value, idx) => (
                    <TableCell key={idx}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {showChartOptions && (
        <>
          <FormControl component="fieldset">
            <RadioGroup value={selectedChart} onChange={handleSelectedChartChange}>
              <FormControlLabel
                value="pie"
                control={<Radio />}
                label="Pie Chart"
              />
              <FormControlLabel
                value="column"
                control={<Radio />}
                label="Column Chart"
              />
              <FormControlLabel
                value="line"
                control={<Radio />}
                label="Line Chart"
              />
            </RadioGroup>
          </FormControl>
          <FormGroup>
            {Object.keys(data.table[0])[0].split(";").map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={columnsOfInterest && Object.keys(columnsOfInterest).includes[item]}
                    onChange={() => handleColumnsOfInterestChange(item)}
                    name={item}
                  />
                }
                label={item}
              />
            ))}
          </FormGroup>
        </>
      )}
      {selectedChart && columnsOfInterest && Object.keys(columnsOfInterest).length > 0 && (
        renderChart()
      )}
      <svg ref={svgRef} ></svg>
    </Container>
  );
}

export default App;