import React from 'react'
import axios from 'axios'
import './css/fivedays.css';
import '../App.css';
class Fivedays extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        // location:props.info.map(i=>{
        //   return i.name
        // }) ,
        // days: [],
        // dayName:[],
        // fullData:[],
        // daysFull: [],
        // temps: [],
        // minTemps: [],
        // maxTemps: [],
        // weather: [],
        // icons: [],
        // displayIndex: 0
      };
    }
    downloadTxtFile = () => {
    var arr = []
    var arr2 = []
    const element = document.createElement('a')
    // var b = document.getElementById('result').innerText
    // var a = document.getElementById('L_result').innerText
    // let cities = a.split('\n')
    // console.log('a is', a,cities)
    // console.log('b is',this.state.fullData)
    // console.log('days are', this.state.dayName)
    let newResult = ""
    // for(let i=0;i<this.state.fullData.length;i++) {
    //   newResult = newResult.concat(this.state.location[i] + " = [")
    //   const singleDay = this.state.fullData[i]
    //   for(let j=0;j<singleDay.length;j++) {
    //     const row = '"' + this.state.dayName[j]+ '"' + ',"' + singleDay[j].weather[0] + '"' +  ',"' +singleDay[j].minTemps[0] + '"' + ',"'+ singleDay[j].maxTemps[0]+ '"' + ""
    //     newResult = newResult.concat(row)
    //   }
    //   newResult = newResult.concat(" ]\n")
    // }
    for(let i=0;i<this.props.info.length;i++) {
      newResult = newResult.concat(this.props.info[i].region + " = [")
      const singleDay = this.props.info[i].next_days;
      for(let j=0;j<singleDay.length;j++) {
        const row = '"' + singleDay[j].name+ '"' + ',"' + singleDay[j].description + '"' +  ',"' +singleDay[j].min_temperature + '"' + ',"'+ singleDay[j].max_temperature+ '"' + "" + ','
        newResult = newResult.concat(row)
      }
      newResult = newResult.concat(" ]\n")
    }
    console.log("new result is",newResult)
    
    // arr2 = b.split('\n')

    // var i = 1
    // var j = 1
    // var count = 0
    // arr = arr.filter(function (el) {
    //   return el != null
    // })
    // arr2 = arr2.filter(function (el) {
    //   return el != null
    // })

    // var endResult = ''
    // console.log(arr2[12])
    // for (i = 0; i < arr.length; i++) {
    //   endResult = endResult.concat(arr[i] + '=')
    //   for (j = count; j < arr2.length; j++) {
    //     if (j % 5 === 0) {
    //       endResult = endResult.concat('[')
    //     }
    //     if ((j + 1) % 5 !== 0 || j === 0) {
    //       endResult = endResult.concat('"' + arr2[j] + '",')
    //     } else if ((j + 1) % 5 === 0) {
    //       endResult = endResult.concat('"' + arr2[j] + '"')
    //     } else {
    //       endResult = endResult.concat('"' + arr2[j] + '",')
    //     }
    //     if (j % 4 === 0 && j !== 0 && j < 2) {
    //       endResult = endResult.concat(']\n')
    //       count++
    //       break
    //     }
    //     if (j >= 2 && (j + 1) % 5 === 0 && j !== 0) {
    //       endResult = endResult.concat(']\n')
    //       count++
    //       break
    //     }

    //     count++
    //   }
    // }

    const file = new Blob([newResult], {
      type: 'text/html',
    })
    element.href = URL.createObjectURL(file)
    element.download = 'myFile.txt'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }
    // fetchData = () => {
    //   let promises=[]
    //   let arr=[]
    //   this.state.location.map(city=>{
    //     const url = this.buildUrlApi(city)  
    //     promises.push(axios.get(url))
    //   })
    //   Promise.all(promises)
    //   .then(response=>{
    //     console.log("********");
    //     console.log(response);
    //     for(let i=0;i<response.length;i++){
    //       arr.push(response[i])
    //     }
    //     this.setState({
    //       data:arr
    //     },()=>{
    //       const current = this.state.data.map(e=>{
    //         return this.currentData(e);
            
    //       })
    //       console.log("hello1212",current)
    //       const abc= current.map(singleCity =>{
    //         const allWeather = singleCity.map(cityWeather =>  this.getDays(cityWeather))
    //         return allWeather
    //       })
    //       const checkDays=abc[0]
    //       const dayNames=checkDays.map(e=>{
    //         return e.daysFull[0]
    //       })

    //       this.setState({
    //         fullData:abc,
           
    //       })
    //       this.setState({
    //         dayName:dayNames
    //       },()=>{
    //         console.log("state days",this.state.dayName)
    //       })
    //       console.log("abc",abc)
    //       console.log("days",dayNames)
          
          
    //     })
    //   })
    //   .catch(error=>{
    //     console.log(error)
    //   })
      
        

    //     // this.setState({
    //     //   days: [currentDay, ...days.slice(1)],
    //     //   daysFull: [currentDayFull, ...daysFull.slice(1)],
    //     //   temps: [currentTemp, ...temps.slice(1)],
    //     //   minTemps: [currentMinTemp, ...minTemps.slice(1)],
    //     //   maxTemps: [currentMaxTemp, ...maxTemps.slice(1)],
    //     //   weather: [currentWeather, ...weather.slice(1)],
    //     //   icons: [currentIcon, ...icons.slice(1)]
    //     // });
     
    // };
    // getDays=(currentData)=>{
    //   const windDeg=currentData.wind.deg
    //   const windSpeed=currentData.wind.speed
      

    //   const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //     const dayOfWeekFull = [
    //       "Sunday",
    //       "Monday",
    //       "Tuesday",
    //       "Wednesday",
    //       "Thursday",
    //       "Friday",
    //       "Saturday"
    //     ];
    //     const currentDay = "Today";
    //     const currentDayFull =
    //       dayOfWeekFull[new Date(currentData.dt_txt).getDay()];
    //     const currentTemp = Math.round(currentData.main.temp);
    //     const currentMinTemp = Math.round(currentData.main.temp_min);
    //     const currentMaxTemp = Math.round(currentData.main.temp_max);
    //     const currentWeather =
    //       currentData.weather[0].main === "Clouds"
    //         ? "Cloudy"
    //         : currentData.weather[0].main;
    //     const currentIcon = this.convertWeatherIcons(currentData.weather[0].main);
  
    //     const days = [];
    //     const daysFull = [];
    //     const temps = [];
    //     const minTemps = [];
    //     const maxTemps = [];
    //     const weather = [];
    //     const icons = [];
    //     for (let i = 0; i < currentData.length; i++) {
    //       let date = new Date(currentData[i].dt_txt);
    //       let day = dayOfWeek[date.getDay()];
    //       let dayFull = dayOfWeekFull[date.getDay()];
    //       days.push(day);
    //       daysFull.push(dayFull);
    //       temps.push(Math.round(currentData[i].main.temp));
    //       minTemps.push(currentData[i].main.temp_min);
    //       maxTemps.push(currentData[i].main.temp_max);
    //       weather.push(currentData[i].weather[0].main);
    //     }
    //     return {
    //       days: [currentDay, ...days.slice(1)],
    //       daysFull: [currentDayFull, ...daysFull.slice(1)],
    //       temps: [currentTemp, ...temps.slice(1)],
    //       minTemps: [currentMinTemp, ...minTemps.slice(1)],
    //       maxTemps: [currentMaxTemp, ...maxTemps.slice(1)],
    //       weather: [currentWeather, ...weather.slice(1)],
    //       icons: [currentIcon, ...icons.slice(1)],
    //       WindDeg: [windDeg],
    //       WindSpeed: [windSpeed]
    //     }
    // }
  
    // buildUrlApi = (cityName) => {
    //   const location = encodeURIComponent(cityName);
    //   const urlPrefix = "https://api.openweathermap.org/data/2.5/forecast?q=";
    //   const urlSuffix = "&APPID=fb1158dc7dfef5f0967ceac8f71ee3a6&units=metric";
  
    //   return [urlPrefix, location, urlSuffix].join("");
    // };
  
    // currentData = (e) => {
    //   console.log(new Date(e.data.list[0].dt_txt).getDate());
    //   const list = e.data.list;
    //   var min=100;
    //   var max=0;
    //   var  newData=[];
    //   e.data.list.forEach((element,index) => {
    //     if(element.main.temp_min<min)
    //     {
    //       min=element.main.temp_min;
    //     }
    //    if(element.main.temp_max>max){
    //       max=element.main.temp_max;
    //     }
    //     if((index+1)%7===0 && index!==0)
    //     {
    //       newData.push({
    //         min:min,
    //         max:max
    //       });
    //       min=100;
    //       max=0;
    //     }
    //       console.log(element);        
    //   });
    //   console.log(newData);
    //   const data = e.data.list.filter((single, index) => index!== e.data.list.length-1 && (new Date(single.dt_txt).getDate() !== new Date(e.data.list[index+1].dt_txt).getDate()))
    //   console.log('data is', data);
    //   data.forEach((element,index) => {
    //     element.main.temp_min=newData[index].min;
    //     element.main.temp_max=newData[index].max;
    //   });
    //   console.log("latest");
    //     console.log(data)
    //   return data
    // };
  
    // computeNearestHr = () => {
    //   const currentTimeInHrs = new Date().getHours();
    //   const constHrs = [0, 3, 6, 9, 12, 15, 18, 21];
    //   const differences = constHrs.map(e => Math.abs(e - currentTimeInHrs));
    //   const indexofLowestDiff = differences.indexOf(Math.min(...differences));
  
    //   return constHrs[indexofLowestDiff];
    // };
  
    // convertWeatherIcons = weather => {
    //   switch (weather) {
    //     case "Clear":
    //       return "circle-outline";
    //     case "Clouds":
    //       return "weather-cloudy";
    //     case "Snow":
    //       return "weather-snowy";
    //     case "Rain":
    //       return "weather-pouring";
    //     case "Drizzle":
    //       return "weather-pouring";
    //     case "Thunderstorm":
    //       return "weather-lightning-rainy";
    //     default:
    //       return "weather-cloudy";
    //   }
    // };
  
    // componentDidMount() {
    //   // let a=[]
    //   // this.props.info.map(city=>{
    //   //     a.push(city.name)
    //   // })
    //   // this.setState(
    //   //   {
    //   //     location: a
    //   //   })
    //   //   console.log(this.state.location)
    //   this.fetchData();

    // }
  
    // handleFocus = e => {
    //   e.target.select();
    // }
    
    // changeLocation = e => {
    //   e.preventDefault();
    //   const inputLocation = this.locationInput.value;
    //   this.setState(
    //     {
    //       location: inputLocation
    //     },
    //     () => {
    //       this.fetchData();
    //     }
    //   );
    // };
  
    // setIndex = index => {
    //   this.setState({
    //     displayIndex: index
    //   });
    // };
  
    render() {
      const {
        location,
        days,
        daysFull,
        temps,
        maxTemps,
        minTemps,
        weather,
        icons,
        displayIndex
      } = this.state;
        console.log(this.props);
      // let background = "";
      // switch (weather[displayIndex]) {
      //   case "Clear":
      //     background = "clear";
      //     break;
      //   case "Cloudy":
      //     background = "cloudy";
      //     break;
      //   case "Snow":
      //     background = "snow";
      //     break;
      //   case "Rain":
      //     background = "rain";
      //     break;
      //   case "Drizzle":
      //     background = "rain";
      //     break;
      //   case "Thunderstorm":
      //     background = "thunderstorm";
      //     break;
      //   default:
      //     background = "cloudy";
      // }
  
      return (
        <div >
          <div className="result_row" style={{justifyContent:"center"}}>
          {this.props.info[0].next_days.map((day, index)=>
           <h3 className="single_result" onClick={()=> this.setState({displayIndex: index})}>
             {day.name}
           </h3>
           
          )}
            
          </div>
          
          <div className="tbl">
          <h3>Results :</h3>
          <hr />

          <div className="result_row" id="titles" style={{overflowY:'scroll',width:'1950px'}}>
            <h3 className="single_result" style={{ borderLeft: 'none' }}>
              City
            </h3>
            <h3 className="single_result">Weather</h3>
            <h3 className="single_result">Max Temp</h3>
            <h3 className="single_result">Min Temp</h3>
            <h3 className="single_result">Weather</h3>
            <h3 className="single_result">Max Temp</h3>
            <h3 className="single_result">Min Temp</h3>
            <h3 className="single_result">Weather</h3>
            <h3 className="single_result">Max Temp</h3>
            <h3 className="single_result">Min Temp</h3>
            <h3 className="single_result">Weather</h3>
            <h3 className="single_result">Max Temp</h3>
            <h3 className="single_result">Min Temp</h3>
            <h3 className="single_result">Weather</h3>
            <h3 className="single_result">Max Temp</h3>
            <h3 className="single_result">Min Temp</h3>
            <h3 className="single_result">Weather</h3>
            <h3 className="single_result">Max Temp</h3>
            <h3 className="single_result">Min Temp</h3>
            <h3 className="single_result">Weather</h3>
            <h3 className="single_result">Max Temp</h3>
            <h3 className="single_result">Min Temp</h3>
            
          </div>
          {/* <div className="firstCol" id="L_result" >
            {location.map((city) => (
              
            ))}
          </div> */}
          
          {this.props.info.map((weather_data,i) => (
            
            <div className="finalCol" id="result" >
              <div className="result_row " id="weather_row" style={{display:'inline-block'}}>
                <h6 className="single_result">
                  <div className="result_row" id="weather_row">
                
              </div>
                  <div><tr>
                    <td><h3 className="single_result" style={{ borderLeft: 'none' }}>
                  {weather_data.region}
                </h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[0].description}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[0].max_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[0].min_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[1].description}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[1].max_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[1].min_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[2].description}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[2].max_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[2].min_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[3].description}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[3].max_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[3].min_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[4].description}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[4].max_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[4].min_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[5].description}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[5].max_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[5].min_temperature}</h3></td>

                    <td><h3 className="single_result">{weather_data.next_days[6].description}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[6].max_temperature}</h3></td>
                    <td><h3 className="single_result">{weather_data.next_days[6].min_temperature}</h3></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <div></div>
                  
                    
                  </div>
                
                  
                </h6>
                
              </div>
              </div>
            ))}
          </div>
       
        <br/>
        <button
          className="btn"
          style={{ marginLeft: '40%', height: '35px' }}
          onClick={this.downloadTxtFile}
        >
          Export
        </button>
        </div>
      );
    }
  }
  
  export default Fivedays