const towns = [
  'berlin',
  'paris',
  'omsukchan',
  'mould bay',
  'oslo',
  'berlin',
  'Le Caire',
  'london',
  'Chicago'
]

class App extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      towns.map((t, i) =>
        React.createElement(WeatherByCity, { city: t, key: i })
      )
    )
  }
}

class WeatherByCity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: false,
      fetched: true,
      town: null
    }
  }

  componentDidMount() {
    this.setState({ isFetching: true, fetched: false, town: null })

    let a = `https://api.openweathermap.org/data/2.5/find?q=${this.props.city}&APPID=6486085a849f33ab16d294ebe45ac73d&units=metric` // json
    fetch(a)
      .then(res => res.json())
      .then(payload => {
        this.setState({ isFetching: false, fetched: true, town: payload })
      })
      .catch(err => {
        console.log('api error', err)
        console.log(err)
      })
  }

  render() {
    const { isFetching, fetched, town } = this.state
    return React.createElement(
      'div',
      null,
      isFetching ? 'loading...' : null,
      town === null
        ? null
        : React.createElement(TownWeather, {
            data: town,
            name: this.props.city
          })
    )
  }
}

const TownWeather = ({ data, name }) => {
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
  var winddeg = data.list[0].wind.deg

  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      ' ',
      name,
      ' = ["',
      takss,
      '","',
      celsius,
      '","',
      ferinheight,
      '","',
      humidity,
      '","',
      windspeed,
      '","',
      winddeg,
      '"]',
      ' '
    ),
    ' ',
    React.createElement('br', null)
  )
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'))
