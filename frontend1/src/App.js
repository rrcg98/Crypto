import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, BarController } from 'chart.js'; // Import BarElement and BarController
Chart.register(CategoryScale, LinearScale, BarElement, BarController); // Register BarElement and BarController
//dummy//
const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setError('Failed to fetch data. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Spent Transaction</h1>

            {/* Display loading message */}
            {loading && <p>Loading...</p>}

            {/* Display error message */}
            {error && <p>{error}</p>}

            {/* Display bar graph */}
            {data.length > 0 && (
                <div>
                    <h2>Bar Graph</h2>
                    <Bar
                        data={{
                            labels: data.map(item => item.txid),
                            datasets: [{
                                label: 'Transaction Values',
                                data: data.map(item => item.vout.reduce((total, output) => total + output.value, 0)),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }]
                        }}
                        options={{
                            scales: {
                                x: {
                                    type: 'category'
                                },
                                y: {
                                    type: 'linear',
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            )}

            {/* Display histogram */}
            {data.length > 0 && (
                <div>
                    <h2>Histogram</h2>
                    <Bar
                        data={{
                            labels: data.map(item => item.txid),
                            datasets: [{
                                label: 'Number of Outputs per Transaction',
                                data: data.map(item => item.vout.length),
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            }]
                        }}
                        options={{
                            scales: {
                                x: {
                                    type: 'category'
                                },
                                y: {
                                    type: 'linear',
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            )}

            {/* Display table */}
            <div>
                <h2>Transaction Data Table</h2>
                <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>TxID</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Version</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Locktime</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>VIN Count</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>VIN TXID</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>VOUT Count</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>VOUT ScriptPubKey</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Size</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Weight</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>SigOps</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Fee</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Block Height</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Block Hash</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Block Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.txid}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.version}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.locktime}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.vin.length}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.vin[0].txid}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.vout.length}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.vout[0].scriptpubkey}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.size}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.weight}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.sigops}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.fee}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.status.block_height}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.status.block_hash}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.status.block_time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
