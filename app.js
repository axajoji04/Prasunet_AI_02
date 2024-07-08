import React, { useState } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const App = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/analyze', {
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
      setResult(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const data = {
    labels: ['Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive'],
    datasets: [
      {
        label: 'Sentiment Scores',
        data: result ? [
          result.very_negative,
          result.negative,
          result.neutral,
          result.positive,
          result.very_positive
        ] : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <h1>Sentiment Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Enter text here..."
        />
        <br />
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <div className="chart-container">
          <Bar data={data} />
        </div>
      )}
    </div>
  );
};

export default App;
