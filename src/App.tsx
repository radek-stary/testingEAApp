import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Correct way to initialize the state with an array
  const [totalReactPackages, setTotalReactPackages] = useState<any[]>([]);  // Use useState<any[]>([]) for an array of unknown items

  useEffect(() => { 
    fetch('https://impact.gieffektivt.no/api/evaluations')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const evaluations = data.evaluations;
        setTotalReactPackages(evaluations);
      })
      .catch(err => console.log("Error fetching data:", err));
  }, []);  // Empty dependency array ensures the effect runs only once (on mount)

  return (
    <>
      <h1>Lifes saved through your GiveWells donations</h1>
      <div className="card">
        <h1>
          {totalReactPackages && totalReactPackages.length > 0 ? 
            totalReactPackages.map((element, index) => (
              <div key={index}> <br></br>{element.intervention.long_description} <br></br></div>
            )) 
            : 
            ""
          }
        </h1>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
