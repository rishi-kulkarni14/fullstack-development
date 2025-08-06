// Import necessary dependencies from React and other libraries
import React, { useState } from 'react';         // Import React and useState hook
import axios from 'axios';                       // Import axios for making HTTP requests
import { 
  TextField,                                    // Import Material-UI components
  Button, 
  Container, 
  Paper, 
  Typography 
} from '@mui/material';

// Define the main App component
function App() {
  // Define state variables using useState hook
  const [number1, setNumber1] = useState('');    // State for first number input
  const [number2, setNumber2] = useState('');    // State for second number input
  const [result, setResult] = useState('');      // State for calculation result

  // Function to handle the calculation and database storage
  const handleCalculate = async () => {
    try {
      // Convert string inputs to integers
      const num1 = parseInt(number1);
      const num2 = parseInt(number2);
      // Calculate the result
      const multiplicationResult = num1 * num2;
      // Update the result in state
      setResult(multiplicationResult);

      // Make POST request to backend API
      const response = await axios.post('http://localhost:5000/api/multiply', {
        number1: num1,
        number2: num2,
        result: multiplicationResult
      });

      // Log successful database save
      console.log('Saved to database:', response.data);
    } catch (error) {
      // Handle and log any errors
      console.error('Error:', error);
      alert('Error saving to database');
    }
  };

  // Render the component's UI
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Multiplication Calculator
        </Typography>

        <TextField
          fullWidth
          label="First Number"
          type="number"
          value={number1}
          onChange={(e) => setNumber1(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Second Number"
          type="number"
          value={number2}
          onChange={(e) => setNumber2(e.target.value)}
          margin="normal"
        />

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCalculate}
          fullWidth 
          style={{ marginTop: '20px' }}
        >
          Calculate
        </Button>

        {result && (
          <Typography variant="h5" style={{ marginTop: '20px' }}>
            Result: {result}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default App;