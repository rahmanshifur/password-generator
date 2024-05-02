import React, { useState } from 'react';
import './App.css';
import Result from './components/result';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState({})

  const generatePassword = () => {
    let charset = '';
    if (includeNumbers) charset += '0123456789';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let newError = {};
    let isvalid = true;

    if (!includeLowercase && !includeNumbers && !includeSymbols && !includeUppercase) {
      newError = {
        ...newError,
        general: 'At least one field is required!'
      }
      isvalid = false;
    }
    if (isvalid) {
      let generatedPassword = '';
      for (let i = 0; i < length; i++) {
        generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      setPassword(generatedPassword);
      setError({})
    } else {
      setError(newError)
    }
  };

  const resetForm = () => {
    setPassword('');
    setLength(8);
    setIncludeNumbers(false);
    setIncludeUppercase(false);
    setIncludeLowercase(false);
    setIncludeSymbols(false);
    setError({})
  };

  return (
    <div className="container">
      <h2 className='text-center mb-5'>Password Generator</h2>
      {password && (
        <Result
          password={password}
          copied={copied}
          setCopied={setCopied}
        />
      )}
      {error && error.general && <p className='text-danger h4 text-center mb-5'>{error.general}</p>}
      <div className="form-group">
        <label>Password Length:</label>
        <input
          className='length float-sm-end '
          type="number"
          value={length}
          min="4" max="32"
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Include Numbers:</label>
        <input
          className='float-sm-end'
          type="checkbox"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
      </div>

      <div className="form-group">
        <label>Include Uppercase Letters:</label>
        <input
          className='float-sm-end'
          type="checkbox"
          checked={includeUppercase}
          onChange={() => setIncludeUppercase(!includeUppercase)}
        />
      </div>
      <div className="form-group">
        <label>Include Lowercase Letters:</label>
        <input
          type="checkbox"
          className='float-sm-end'
          checked={includeLowercase}
          onChange={() => setIncludeLowercase(!includeLowercase)}
        />
      </div>
      <div className="form-group">
        <label>Include Symbols:</label>
        <input
          type="checkbox"
          className='float-sm-end'
          checked={includeSymbols}
          onChange={() => setIncludeSymbols(!includeSymbols)}
        />
      </div>
      <div className="form-group ">
        <button
          className='btn btn-primary d-block w-100'
          onClick={generatePassword}> Generate Password </button>
        <button className='btn btn-outline-dark w-100 mt-2'
          onClick={resetForm}>Reset</button>
      </div>

    </div>
  );
}

export default App;