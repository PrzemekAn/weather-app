import React, {Component} from 'react';
import './App.css';

const api = {
  key:'3df22446f8b0ba135cf066f0ba035bf2',
  base:'https://api.openweathermap.org/data/2.5/'
}
class App extends Component {
    state = {
      temperature: '',
      city: 'Poznan',
      background: '',
    }
  
  getWeather(){
    
    fetch(`${api.base}weather?q=${this.state.city}&appid=${api.key}`)
    .then(res => res.json())
    .then(result => {

      if(Math.round(result.main.temp-273.15)>10){
        this.setState({
           background: ' warm'
        })
      }else{
        this.setState({
          background: ' cold'
        })
      }
      this.setState({temperature: Math.round(result.main.temp - 273.15)})
    })
  }


  
  componentDidMount(){
    this.getWeather();

    // if(this.state.temperature > 10){
    //   this.setState({
    //     background: ' cold',
    //   })
    // }
    // else{
    //   this.setState({
    //     background: ' warm',
    //   })
    // }

  }

  render(){
    console.log(this.state.temperature)
  return (
    
    <div className="App">
      <main className = {'wrapper' + this.state.background}>
          <input type="text" placeholder = 'Search...' className = 'location-search'/>
          <div className="location-info">Poznań</div>
          <div className="date">07.02.2021</div>
          <div className="weather-data">{this.state.temperature}<sup>o</sup>C</div>
      </main>
    </div>
  );
  }
}

export default App;
