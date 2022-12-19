import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Fivedays from "./Fivedays"
import '../App.css'
import axios from 'axios'
function Current() {
    const history = useHistory()
  const [cityName, setCityName] = useState('')
  const [cities, setCities] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [results, setResults] = useState([]);
  const [openKey, setOpenKey] = useState(false)
  const [appiName, setApiName] = useState('')
  const [apiKey, setApiKey] = useState('6486085a849f33ab16d294ebe45ac73d')
  const [toggle,setToggle] = useState(true)
  const downloadTxtFile = () => {

    console.log(results);
    console.log("*****");
    console.log(cities);
    var exportArray=[];
    results.forEach((element,index)=>{
      var customStr=element[0].city+'=["'+element[0].takss+'","'+element[0].celsius+'","'+element[0].ferinheight+'","'+element[0].winddeg+'","'+element[0].windspeed+'","'+element[0].humidity+'","'+element[1]+'","'+element[2]+'"]\n';
      exportArray.push(customStr);
      console.log(customStr);
    });
    console.log(exportArray);
    // var arr = []
    // var arr2 = []
     const element = document.createElement('a')
    // var b = document.getElementById('result').innerText
    // var a = document.getElementById('L_result').innerText
    // arr = a.split('\n')
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
    //     if (j % 6 === 0) {
    //       endResult = endResult.concat('[')
    //     }
    //     if ((j + 1) % 6 !== 0 || j === 0) {
    //       endResult = endResult.concat('"' + arr2[j] + '",')
    //     } else if ((j + 1) % 6 === 0) {
    //       endResult = endResult.concat('"' + arr2[j] + '"')
    //     } else {
    //       endResult = endResult.concat('"' + arr2[j] + '",')
    //     }
    //     if (j % 5 === 0 && j !== 0 && j < 2) {
    //       endResult = endResult.concat(']\n')
    //       count++
    //       break
    //     }
    //     if (j >= 2 && (j + 1) % 6 === 0 && j !== 0) {
    //       endResult = endResult.concat(']\n')
    //       count++
    //       break
    //     }

    //     count++
    //   }
    // }

    const file = new Blob(exportArray, {
      type: 'text/html',
    })
    element.href = URL.createObjectURL(file)
    element.download = 'myFile.txt'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      var lines = text.split('\n');
      var cityArray=[];
      for(var line = 0; line < lines.length; line++){
        console.log(lines[line]);
        cityArray.push({name:lines[line].replace(/(\r\n|\n|\r)/gm, ""),
      id:Math.random()})
      }
      setCities(cityArray)
      e.target.value = null;
      //alert(text)
    };
    reader.readAsText(e.target.files[0])
  }
  const totalList= async (data)=>{
    
    let promises = []
    let sunrise=""
    let sunset=""
    let weatherResults = []
    let cityWeatherData;
   const a =  axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${data.city}&unit=metrics&appid=bc1301b0b23fe6ef52032a7e5bb70820`)
    .then(async (res) => {
          console.log(res);
          // const sunrise1=res.data.list[0].sunrise;
          var sunriseObject = new Date( (res.data.list[0].sunrise+(res.data.city.timezone))*1000);
          var sunsetObject = new Date( (res.data.list[0].sunset+(res.data.city.timezone))*1000);
          var sunrise=sunriseObject.getUTCHours()+":"+sunriseObject.getUTCMinutes();
          var sunset=sunsetObject.getUTCHours()+":"+sunsetObject.getUTCMinutes();




          // console.log(myDate.getUTCHours()+"<br>"+myDate.getUTCMinutes()+" "+myDate.toLocaleString());
          // console.log(res.data.list[0].sunrise);
          // console.log(res.data.list[0].sunset);
          // const sunset2=res.data.list[0].sunset
        //   const  num1= parseInt(sunrise1)
        //   const  num2= parseInt(sunset2)
        //   const milliseconds1 = num1 * 1000 // 1575909015000
        //   const milliseconds2 = num2 * 1000 // 1575909015000
          
        //   const dateObject1 = new Date(milliseconds1)
        //   const dateObject2 = new Date(milliseconds2)
        //   const time1=dateObject1.getTime()
        //   const time2=dateObject2.getTime()

          
        //   var seconds = Math.floor((time1 / 1000) % 60)
        //   var minutes = Math.floor((time1 / (1000 * 60)) % 60)
        //   var hours = Math.floor((time1 / (1000 * 60 * 60)) % 24);
      
        // hours = (hours < 10) ? "0" + hours : hours;
        // minutes = (minutes < 10) ? "0" + minutes : minutes;
        // seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        // sunrise=hours + ":" + minutes ;

        //   var seconds3 = Math.floor((time2 / 1000) % 60)
        //   var minutes3 = Math.floor((time2 / (1000 * 60)) % 60)
        //   var hours3 = Math.floor((time2 / (1000 * 60 * 60)) % 24);
      
        // hours3= (hours3 < 10) ? "0" + hours3 : hours3;
        // minutes3 = (minutes3 < 10) ? "0" + minutes3 : minutes3;
        // seconds3 = (seconds3 < 10) ? "0" + seconds3 : seconds3;
      
        // sunset=hours3 + ":" + minutes3  ;
        //sunrise = time1.toLocaleString()
        //sunset = time2.toLocaleString()
      //  const efr= await axios.get('http://localhost:3001/data').then(res=>{
      //     console.log(res);
        

      //   },err=>{
      //     console.log(err);
      //   })

      let response = () => {
        return new Promise(function(resolve, reject) {
          axios.post('https://react.weatherengine.online:3001/data/'+data.city, {
            City:data.city
          }).then(response => {
            console.log(response);
            
            resolve(response.data);
          });
        });
      };
      let responseData = await response();
      var a=JSON.parse(responseData);
            console.log(a);
            // setAllCities({
            //   data:[a]
            // });
            // setAllCities({
            //   data:[a]
            // });
            setAllCities(allCities=>[...allCities,a.weather_data[0]])
            console.log(allCities);
      // console.log(responseData);
      // var b=JSON.stringify(a);
      // console.log(b);
      // var c=JSON.parse('['+b+']');
      // console.log(c);
      console.log(responseData);
      cityWeatherData={
        city:a.weather_data[0].region,
        celsius: a.weather_data[0].temp_now,
      ferinheight: (a.weather_data[0].temp_now*9/5) + 32,
        humidity: a.weather_data[0].humidity,
        takss: a.weather_data[0].next_days[0].description,
        winddeg: data.cityWeatherData.winddeg,
        windspeed: a.weather_data[0].wind
      }  
      console.log(data.cityWeatherData);
        //cityWeatherData=data.cityWeatherData
        console.log(cityWeatherData);
        console.log(cityWeatherData);
        return [cityWeatherData,sunrise,sunset];
         
    })
    .catch((e) => {
      console.log("error in fetching weather data",e)  
    })   
    console.log("check",a)
    return a;
    // axios({
    //       method: 'get',
    //       url: `https://api.openweathermap.org/data/2.5/forecast/daily?q=${data.city}&units=metric&appid=bc1301b0b23fe6ef52032a7e5bb70820`,
    //     })
    //   )
    // Promise.all(promises)
    //   .then((response) => {
    //     console.log(response,"Lorra lassan")
    //     sunrise=response[0].data.list[0].sunrise
    //     sunset=response[0].data.list[0].sunset
    //     let cityWeatherData=data.cityWeatherData
    //     return [ cityWeatherData, sunrise,sunset ]
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
      
     }
  const getweather =  (city) => {
    setAllCities([]);
    let promises = []
    cities.map((city) => {
      promises.push(
        axios({
          method: 'get',
          url: `https://api.openweathermap.org/data/2.5/find?q=${city.name}&APPID=${apiKey}&units=metric`,
        })
      )
    })
    Promise.all(promises)
      .then((response) => {
        let weatherResults = []
        response.map( async (res) => {
          const cityWeatherData = TownWeather(res.data)
          let a={
            cityWeatherData,
            city:res.data.list[0].name
          }
          const alpha = await totalList(a)
          console.log('weather results are :', alpha)
          weatherResults.push(alpha)
        setResults([...weatherResults])

        })
        
      })
      .catch((error) => {
        console.log(error)
      })
      
  }
  
    const setter=(res)=>{
      // sunrise=response[0].data.list[0].sunrise
      // sunset=response[0].data.list[0].sunset
    }
  const TownWeather = (data, name) => {
    console.log('data is ', data)
    var takss = data.list[0].weather[0].description
    if (takss === 'few clouds') {
      takss = 'sun clouds'
    }
    if (takss === 'few clouds: 11-25%') {
      takss = 'sun clouds'
    } else if (takss === 'Partly Cloudy') {
      takss = 'sun clouds'
    } else if (takss === 'partly cloudy (night)') {
      takss = 'moon clouds'
    } else if (takss === 'Mostly cloudy (day)') {
      takss = 'heavy clouds sun'
    } else if (takss === 'mostly cloudy (night)') {
      takss = 'heavy clouds moon'
    } else if (takss === 'scattered clouds: 25-50%') {
      takss = 'clouds'
    } else if (takss === 'broken clouds') {
      takss = 'clouds'
    } else if (takss === 'fog') {
      takss = 'clouds'
    } else if (takss === 'overcast clouds') {
      takss = 'clouds'
    } else if (takss === 'scattered clouds') {
      takss = 'clouds'
    } else if (takss === 'broken clouds') {
      takss = 'clouds'
    } else if (takss === 'overcast clouds') {
      takss = 'clouds'
    } else if (takss === 'mist') {
      takss = 'clouds'
    } else if (takss === 'light snow') {
      takss = 'snow'
    } else if (takss === 'Snow') {
      takss = 'snow'
    } else if (takss === 'Snow') {
      takss = 'snow'
    } else if (takss === 'Heavy snow') {
      takss = 'snow'
    } else if (takss === 'Sleet') {
      takss = 'snow'
    } else if (takss === 'Light shower sleet') {
      takss = 'snow'
    } else if (takss === 'Shower sleet') {
      takss = 'snow'
    } else if (takss === 'Light rain and snow') {
      takss = 'snow'
    } else if (takss === 'Rain and snow') {
      takss = 'snow'
    } else if (takss === 'Light shower snow') {
      takss = 'snow'
    } else if (takss === 'Shower snow') {
      takss = 'snow'
    } else if (takss === 'Heavy shower snow') {
      takss = 'snow'
    } else if (takss === 'light intensity drizzle') {
      takss = 'rain'
    } else if (takss === 'drizzle') {
      takss = 'rain'
    } else if (takss === 'heavy intensity drizzle') {
      takss = 'rain'
    } else if (takss === 'light intensity drizzle rain') {
      takss = 'rain'
    } else if (takss === 'drizzle rain') {
      takss = 'rain'
    } else if (takss === 'heavy intensity drizzle rain') {
      takss = 'rain'
    } else if (takss === 'shower rain and drizzlen') {
      takss = 'rain'
    } else if (takss === 'heavy shower rain and drizzle') {
      takss = 'rain'
    } else if (takss === 'shower drizzle') {
      takss = 'rain'
    } else if (takss === 'light rain') {
      takss = 'rain'
    } else if (takss === 'moderate rain') {
      takss = 'rain'
    } else if (takss === 'heavy intensity rain') {
      takss = 'rain'
    } else if (takss === 'very heavy rain') {
      takss = 'rain'
    } else if (takss === 'extreme rain') {
      takss = 'rain'
    } else if (takss === 'freezing rain') {
      takss = 'rain'
    } else if (takss === 'light intensity shower rain') {
      takss = 'rain'
    } else if (takss === 'shower rain') {
      takss = 'rain'
    } else if (takss === 'heavy intensity shower rain') {
      takss = 'rain'
    } else if (takss === 'ragged shower rain	') {
      takss = 'rain'
    } else if (takss === 'shower rain') {
      takss = 'rain'
    } else if (takss === 'Clear') {
      takss = 'sun'
    } else if (takss === 'Clear (night)') {
      takss = 'moon'
    } else if (takss === 'hot') {
      takss = 'sun'
    } else if (takss === 'clear (day)') {
      takss = 'sun'
    } else if (takss === 'clear (night)') {
      takss = 'moon'
    } else if (takss === 'clear sky (night)') {
      takss = 'moon'
    } else if (takss === 'clear sky (day)') {
      takss = 'sun'
    } else if (takss === 'thunderstorm with light rain') {
      takss = 'thunders'
    } else if (takss === 'thunderstorm with rain') {
      takss = 'thunders'
    } else if (takss === 'thunderstorm with heavy rain') {
      takss = 'thunders'
    } else if (takss === 'light thunderstorm') {
      takss = 'thunders'
    } else if (takss === 'thunderstorm') {
      takss = 'thunders'
    } else if (takss === 'heavy thunderstorm') {
      takss = 'thunders'
    } else if (takss === 'ragged thunderstorm') {
      takss = 'thunders'
    } else if (takss === 'thunderstorm with light drizzle') {
      takss = 'thunders'
    } else if (takss === 'tropical storm') {
      takss = 'thunders'
    } else if (takss === 'Severe Thunderstorms') {
      takss = 'thunders'
    } else if (takss === 'thunderstorm with drizzle') {
      takss = 'thunders'
    } else if (takss === 'thunderstorm with heavy drizzle') {
      takss = 'thunders'
    } else if (takss === 'thundershowers') {
      takss = 'thunders'
    } else if (takss === 'isolated thundershowers') {
      takss = 'thunders'
    } else if (takss === 'Undefined') {
      takss = 'clouds'
    } else if (takss === 'Mostly Clear') {
      takss = 'sun clouds'
    } else if (takss === 'Mostly Cloudy') {
      takss = 'heavy clouds sun'
    } else if (takss === 'Sunny') {
      takss = 'sun'
    } else if (takss === 'clear sky') {
      takss = 'sun'
    } else if (takss === 'Breezy') {
      takss = 'clouds'
    } else if (takss === 'Mostly Sunny') {
      takss = 'sun clouds'
    } else if (takss === 'Rain') {
      takss = 'rain'
    }

    // Temp celsius

    var celsius = Math.round(data.list[0].main.temp)

    // Temp ferinheight
    var ferinheight = Math.round(data.list[0].main.temp * 1.8 + 32)

    if (celsius.toString().length < 2) celsius = '0' + celsius
    // humidity
    var humidity = data.list[0].main.humidity
    // windspeed
    var windspeed = data.list[0].wind.speed
    // winddeg
    let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    var winddeg =compassSector[((data.list[0].wind.deg / 22.5)+ 0.5).toFixed(0)];

    return { takss, celsius, windspeed, winddeg, ferinheight, humidity }
  }
  return (
    <div className="main">
      <div className="Header">

      <div  className="thelogo" >
         
          <img src="images/weatherengine.png" alt=" aeweather " width="225" height="auto" />
        </div>


        <div
          className="key"
          style={{ color: 'white' }}
          onClick={() => setOpenKey(!openKey)}
        >
          
          <img src="images/key.png" alt="no-key" width="50" height="50" />
        </div>
        {openKey && (
          <div className="header-input">
            <input
              type="text"
              className="input-box"
              // value={appiName}
              onChange={(e) => setApiName(e.target.value)}
            />
            <img
              src="images/add.png"
              alt="no-add"
              height="40"
              width="40"
              style={{ padding: '10px', verticalAlign: 'middle' }}
              onClick={() => {
                setApiKey(appiName);
                setOpenKey(!openKey)
              }}
            />
          </div>
        )}
      </div>
      <div className="content">
      {toggle &&(
        <div className="result_row" style={{minWidth:"60%"}}>
          <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <img
          src="images/add.png"
          alt="no-add"
          height="40"
          width="40"
          style={{ paddingLeft: '10px' }}
          onClick={() => {
            const city = { name: cityName, id: Math.random() }
            setCities([...cities, city])
          }}
        />
        </div>
      )}
        
        {toggle &&(
        <div className="gallery" onClick={getweather}>
        <img
          src="images/weather.png"
          alt="no-weather"
          height="170"
          width="170"
          className="image"
          />
          
        </div>
        )}
        <br />
        <div className="last-col">
          <button 
          className="red-btn" 
          onClick={()=>{
            setToggle(true)
          }}
          >Current Weather</button>
          <button 
          className="black-btn" 
          onClick={()=>{
            if(allCities.length!==0){
              setToggle(false)
            }
            else{
              window.alert("Enter cities first")
            }
          }}
          >5 Day Forecast</button>
        </div>
      </div>
      {toggle &&(
        <div className="bottom">
        <div className="left" id="Lresult">
          <h2>Cities</h2>
          <hr />
          <div className="city">
            <h3>City name</h3>
            <h3>Actions</h3>
          </div>
          {cities.map((city) => (
            <div className="city">
              <h3>{city.name}</h3>
              <img
                src="images/remove.png"
                alt="no-remove"
                height="40"
                width="40"
                className="actionbtn"
                style={{ paddingLeft: '5px' }}
                style={{ paddingtop: '12px' }}
                onClick={() => {
                  const filteredCities = cities.filter((c) => c.id !== city.id)
                  setCities(filteredCities)
                }}
              />
            </div>
          ))}
        </div>
        <div className="right">
          <h1>Results :</h1>
          <hr />

          <div className="result_row" id="titles">
            <h3 className="single_result" style={{ borderLeft: 'none' }}>
              City
            </h3>
            <h4 className="single_result">Condition</h4>
            <h4 className="single_result">Celsius</h4>
            <h4 className="single_result">Fahrenheight</h4>
            <h4 className="single_result">Wind-Deg</h4>
            <h4 className="single_result">WindSpeed</h4>
            <h4 className="single_result">Humidity</h4>
            <h4 className="single_result">Sunrise</h4>
            <h4 className="single_result">Sunset</h4>
          </div>
          <div className="firstCol" id="L_result">
            {results.map((city) => (
              <div className="result_row" id="weather_row">
                <h3 className="single_result" style={{ borderLeft: 'none' }}>
                {city[0].city}
                </h3>
              </div>
            ))}
          </div>
          <div className="finalCol" id="result">
            {results.map((result) => (
              <div className="result_row" id="weather_row">
               
            
{/*              
                <h3 className="single_result" style={{ borderLeft: 'none' }}>
                {result[0].city}
                </h3> */}
         
     
                {/* <h3 className="single_result">{result[0].city}</h3> */}
                <h3 className="single_result">{result[0].takss}</h3>
                <h3 className="single_result">{result[0].celsius}</h3>
                <h3 className="single_result">{result[0].ferinheight}</h3>
                <h3 className="single_result">{result[0].winddeg}</h3>
                <h3 className="single_result">{result[0].windspeed}</h3>
                <h3 className="single_result">{result[0].humidity}</h3>
                <h3 className="single_result">{result[1]}</h3>
                <h3 className="single_result">{result[2]}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
      {!toggle&&(
        <div>
          <Fivedays info={allCities} />
        </div>
      )}
      
      {toggle &&(
        <div className="buttons">
        <button
          className="btn"
          onClick={() => {
           
            console.log(cities);
            var exportArray=[];
            cities.forEach((element,index)=>{
              var customStr=element.name+'\n';
              exportArray.push(customStr);
              console.log(customStr);
            });
            console.log(exportArray);
           
             const element = document.createElement('a')
            
        
            const file = new Blob(exportArray, {
              type: 'text/html',
            })
            element.href = URL.createObjectURL(file)
            element.download = 'cities.txt'
            document.body.appendChild(element) // Required for this to work in FireFox
            element.click()
          }}
        >
          Save
        </button>
        <input style={{marginLeft:'25px'}} type="file" onChange={(e) => showFile(e)} />
        {/* <button
          className="btn"
          style={{ marginLeft: '5%' }}
          onClick={() => {
            console.log(localStorage.getItem('cities'))
            const savedCities = JSON.parse(localStorage.getItem('cities'))
            if (savedCities) setCities(savedCities)
          }}
        >
          Load
        </button> */}
        <button
          className="btn"
          style={{ marginLeft: '40%', height: '35px' }}
          onClick={downloadTxtFile}
        >
          Export
        </button>
      </div>
      )}
      
    </div>
  )
}

export default Current
