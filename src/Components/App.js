import React, {Component} from 'react';
import './App.css';
import WeatherComponent from './WeatherComponent';

const api = {
  key:'3df22446f8b0ba135cf066f0ba035bf2',
  base:'https://api.openweathermap.org/data/2.5/'
}
class App extends Component {
    state = {
      temperature: '',
      city: 'Poznań',
      background: '',
      date: '',
      humidity: '',
    }
  

  getDate() {
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const currentDate = new Date();
    const day = currentDate.getDay();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    this.setState({
      date:`${days[day-1]}, ${date}-${months[month]}-${year}`,
    })

  }
    
  getWeather(){
    this.getDate();
    fetch(`${api.base}weather?q=${this.state.city}&appid=${api.key}`)
    .then(res => {
      // console.log(res)
      return (res.json())})

    .then(result => {
      // console.log(result)
      if(result.cod !== 200){
        return(alert('There\'s no such city'))
      }
      if(Math.round(result.main.temp-273.15)>10){
        this.setState({
           background: ' warm'
        })
      }else{
        this.setState({
          background: ' cold'
        })
      }
      this.setState({
        temperature: Math.round(result.main.temp - 273.15),
        humidity: result.main.humidity
      })
    })
  }


  componentDidMount(){
    this.getWeather();
  }

  changeHandler(e) {
    this.setState({
      city: e.target.value,
    })
  }

  searchSubmit = (e) => {

    if(e.keyCode === 13){
      this.getWeather();
    }

  }

  render(){
    // console.log(this.state.temperature)
  return (
    
    <div className="App">
      {/* <main className = {'wrapper' + this.state.background}>
          <input type="text" placeholder = 'Search...' className = 'location-search' onChange = {this.changeHandler.bind(this)} onKeyUp = {this.searchSubmit}/>
          <div className="location-info">{this.state.city}</div>
          <div className="date">{this.state.date}</div>
          <div className="weather-data temperature">{this.state.temperature}<sup>o</sup>C</div>
          <div className="weather-data humidity">{this.state.humidity}%</div>
      </main> */}
      <WeatherComponent {...this.state} click = {this.searchSubmit} change = {this.changeHandler.bind(this)} />
    </div>
  );
  }
}

export default App;
