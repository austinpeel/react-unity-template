import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import './App.css';

// const unityContent = new UnityContent(
//   'DefaultApp/Build/DefaultApp.json',
//   'DefaultApp/Build/UnityLoader.js'
// );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0, isLoading: true, x: 0.0, y: 0.0 };

    this.unityContent = new UnityContent(
      'DefaultApp/Build/DefaultApp.json',
      'DefaultApp/Build/UnityLoader.js'
    );

    this.unityContent.on('progress', (progress) => {
      this.setState({ progress: progress });
    });

    this.unityContent.on('loaded', () => {
      this.setState({ isLoading: false });
    });

    this.unityContent.on('OnMoveX', (x) => {
      this.setState({ x: x });
    });
  }

  handleReset() {
    this.unityContent.send('Cube', 'Reset');
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const unityElement = document.getElementById('unity');
    const width = parseFloat(window.getComputedStyle(unityElement).width);

    unityElement.setAttribute(
      'style',
      'height: ' + (width / 16) * 10 + 'px !important'
    );
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 style={{ fontSize: 30 }}>
            Template for Unity apps embedded in React webpages
          </h1>
        </header>
        <div className='Unity-player'>
          <p style={{ textAlign: 'left' }}>
            Use the arrow keys to move the cube.
          </p>
          {this.state.isLoading === true && (
            <p style={{ textAlign: 'left' }}>Loading...</p>
          )}
          <div id='unity'>
            <Unity unityContent={this.unityContent} />
          </div>
        </div>
        <div>
          <p>
            (x, y) = ({this.state.x.toFixed(2)}, {this.state.y.toFixed(2)})
          </p>
          <button onClick={this.handleReset.bind(this)}>Reset</button>
        </div>
      </div>
    );
  }
}

export default App;
