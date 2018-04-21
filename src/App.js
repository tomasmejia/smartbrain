import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'b8644660adcc4b08b003edd4ed36a31f'
});

const particlesOptions = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 3,
        "color": "#cf8888"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 0,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    // we get the bouding box data
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // inputimage is the img tag that contains our URL
    const image = document.getElementById('inputimage');
    // we set the width and height this way so it updates accordingly
    // in case someone changes the values
    const width = Number(image.width);
    const height = Number(image.height);
    // return an object
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    // the box param is equal to whatever
    // calculateFaceLocation returns
    console.log(box);
    this.setState({ box: box })
  }

  onInputChange = (e) => {
    // receive the value and set it on 'input' state
    // so onButtonSubmit can use it
    this.setState({ input: e.target.value });
  }

  onButtonSubmit = () => {
    // sets the state of imageUrl and also predicts the faces'
    // bounding boxes
    this.setState({ imageUrl: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response =>
        // getting the bounding box data
        this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log("Something went wrong: ", err));
  }

  onRouteChange = (route) => {
    // when the user clicks Sign in display the 'home' route
    this.setState({route: route});
  };

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} />
        { 
          this.state.route === 'signin'
          ? <SignIn onRouteChange={this.onRouteChange} />
          : <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onButtonSubmit={this.onButtonSubmit}
                onInputChange={this.onInputChange} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
        }
      </div>
    );
  }
}

export default App;
