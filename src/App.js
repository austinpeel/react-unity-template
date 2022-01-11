import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import './App.css';

function App() {
  const unityContent = new UnityContent(
    'DefaultApp/Build/DefaultApp.json',
    'DefaultApp/Build/UnityLoader.js'
  );

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 style={{ 'font-size': '30px' }}>
          Template for Unity apps embedded in React webpages
        </h1>
      </header>
      <div className='Unity-player'>
        <p style={{ 'text-align': 'left' }}>
          Use the arrow keys to move the cube.
        </p>
        <Unity unityContent={unityContent} />
      </div>
    </div>
  );
}

export default App;
