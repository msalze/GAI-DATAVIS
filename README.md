# GAI-DATAVIS

## Web-App for Population Demographics: Requirements and Overview

GAI-DATAVIS is a web application that provides an intuitive interface for users to select, process, and visualize local population demographic data. Built with React for the frontend and Flask for the backend, the application allows users to upload various data formats, apply filters, and generate insightful visualizations with ease.

---

![Sample Mockup](https://github.com/user-attachments/assets/4f1415b2-7bbd-49e5-ade8-a99a4f5bd3b3)


## Table of Contents

1. [Datasource](#datasource)
2. [Features](#features)
   - [User Interface (UI) Design](#user-interface-ui-design)
     - [File Upload Section](#file-upload-section)
     - [Processing Options](#processing-options)
     - [Output & Preview Section](#output--preview-section)
   - [File Processing Pipeline](#file-processing-pipeline)
   - [Visualization Ideas for Demographic Data](#visualization-ideas-for-demographic-data)
   - [Optional Advanced Features](#optional-advanced-features)
3. [Tech Stack](#tech-stack)
   - [Frontend](#frontend)
   - [Backend](#backend)
4. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Setup](#setup)
5. [Usage](#usage)
6. [Example Workflow](#example-workflow)
7. [Contributing](#contributing)
8. [License](#license)

---

## Datasource

Data utilized in this application is sourced from [Open Data Switzerland](https://opendata.swiss/de/dataset/wohnbevolkerung-nach-monat-altersklasse-geschlecht-staatsangehorigkeit-und-quartiergruppe-2008).

---

## Features

### User Interface (UI) Design

#### File Upload Section
- **Supported File Types**: CSV, Excel, JSON.
- **Features**:
  - Drag-and-drop file upload.
  - Display file metadata (name, type, size).
  - Preview the first few rows of tabular data.

#### Processing Options
- **Options Based on File Type/Content**:
  - Data aggregation (e.g., sum or average by year, gender, or age group).
  - Filtering by criteria (e.g., date range, age group, gender, nationality).
  - Visualization choices (e.g., bar chart, line graph, pie chart, heatmap).

#### Output & Preview Section
- **Display Processed Data**: Show tables, key metrics, or visualizations.
- **Download Options**: Provide the ability to download processed data or visualizations.

### File Processing Pipeline

The backend processes uploaded files, returning insights based on the file type:

#### CSV/Excel Files
- **Data Parsing**:
  - Convert files to a DataFrame using Pandas in Python.
  - Validate fields (e.g., `Monat`, `Altersklasse`, `Geschlecht`, `Quartiergruppe`).
- **Operations**:
  - **Data Filtering**: Filter by month, year, gender, age group, and nationality.
  - **Summarization**: Analyze trends such as population growth, age distribution, or gender balance.
  - **Visualizations**: Use Plotly to generate interactive charts:
    - **Line Chart**: Population trends over time.
    - **Bar Chart**: Compare population distributions across different demographics.
    - **Heatmap**: Visualize population density by location.
    - **Pie Chart**: Show distribution by gender or nationality.

#### JSON Files
- **Data Handling**: Convert hierarchical JSON into tabular format.
- **Operations**:
  - Aggregations similar to CSV/Excel.
  - Generate visualizations based on user selection.

#### Custom Data Formats
- **Field Mapping**: Allow users to map custom fields to expected fields (e.g., mapping "age" to "Altersklasse").
- **Validation**: Ensure the file structure adheres to the required format.

### Visualization Ideas for Demographic Data

A variety of visualizations can be implemented depending on user-selected data:

- **Population Growth Trends (Line Chart)**: Show changes over time by demographic group.
  - **User Input**: Select a time range and group (e.g., compare male vs. female growth from 2010-2020).
- **Age Distribution (Bar Chart/Histogram)**: Visualize the distribution of age groups.
  - **User Input**: Choose specific years or months to view.
- **Gender/Nationality Breakdown (Pie/Donut Chart)**: Visualize demographic breakdowns.
  - **User Input**: Filter by location or time period.
- **Quartier-based Population Heatmap**: Display population density in different quartiers.
  - **User Input**: Select specific demographic groups for visualization.

### Optional Advanced Features
- **Time-lapse Visualizations**: Animate trends to show population changes dynamically over time.
- **Comparison Mode**: Compare two datasets side-by-side (e.g., population in 2008 vs 2020).
- **Downloadable Reports**: Allow users to export data and visualizations as PDFs or Excel reports.

---

## Tech Stack

### Frontend
- **Framework**: React.js
- **UI Components**: Material-UI or Ant Design (optional for enhanced UI)
- **Visualizations**: Plotly.js
- **State Management**: Redux or Context API
- **Routing**: React Router

### Backend
- **Framework**: Flask (Python)
- **Data Handling**: Pandas for CSV/Excel, `json` module for JSON
- **Visualization Libraries**: Plotly for generating interactive charts
- **API**: RESTful API endpoints for data processing and retrieval
- **CORS**: Flask-CORS for handling Cross-Origin Resource Sharing

---

## Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **pip**

### Setup

#### Frontend (React)
1. **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3. **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

#### Backend (Flask)
1. **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2. **Create a virtual environment:**
    ```bash
    python3 -m venv venv
    ```
3. **Activate the virtual environment:**
    - **On macOS/Linux:**
      ```bash
      source venv/bin/activate
      ```
    - **On Windows:**
      ```bash
      venv\Scripts\activate
      ```
4. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
5. **Run the Flask server:**
    ```bash
    flask run
    ```
    The backend will be available at `http://localhost:5000`.

---

## Usage

1. **Access the Web Application:**
   Open your browser and navigate to `http://localhost:3000` (or the port specified by your React development server).

2. **Upload Data:**
   - Drag and drop your CSV, Excel, or JSON file into the upload section.
   - Alternatively, click to browse and select a file from your computer.

3. **Process Data:**
   - Apply filters such as date range, gender, age group, or nationality.
   - Choose aggregation methods like sum or average based on your analysis needs.

4. **Visualize Data:**
   - Select your preferred visualization type (e.g., bar chart, line graph, pie chart, heatmap).
   - View the interactive charts generated based on your selections.

5. **Download Results:**
   - Export the processed data or visualizations in your desired format (e.g., CSV, Excel, PDF).

---

## Example Workflow

1. **File Upload:**
   - Users upload a CSV file containing demographic data from the datasource.

2. **Processing Options:**
   - Users select to filter the data by the year 2020, gender "Female", and age group "25-34".

3. **Visualization:**
   - Users choose to generate a bar chart to compare the population distribution across different quartiers.

4. **Output:**
   - The application displays the filtered data in a table and the corresponding bar chart.

5. **Download:**
   - Users export the visualization as a PNG image and the filtered data as a CSV file.

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**
2. **Create a Feature Branch**
    ```bash
    git checkout -b feature/YourFeature
    ```
3. **Commit Your Changes**
    ```bash
    git commit -m "Add your message"
    ```
4. **Push to the Branch**
    ```bash
    git push origin feature/YourFeature
    ```
5. **Open a Pull Request**

Please ensure your code follows the project's coding standards and includes appropriate tests.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any questions or suggestions, please open an issue or contact the maintainer at [your-email@example.com](mailto:your-email@example.com).

---

## Acknowledgements

- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Plotly.js](https://plotly.com/javascript/)
- [Pandas](https://pandas.pydata.org/)
- [Open Data Switzerland](https://opendata.swiss/)

