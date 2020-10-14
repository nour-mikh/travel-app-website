function generateWeather(){
    const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city='
    const key = '&key=4ac4ac143cb44b149e3a1e81e409d58b';
    let city = document.getElementById('location').value
    getTheWeather(apiUrl, city, key)
    return
}

const getTheWeather = async (apiUrl, city, key) => {
    const res = await fetch(apiUrl + city + key);
    try{
      const weather = await res.json();
      console.log(weather);
      Client.postData('/weather',
       {day1: weather.data[0].temp,
        day2: weather.data[1].temp,
        day3: weather.data[2].temp,
        day4: weather.data[3].temp,
        day5: weather.data[4].temp,
      }).then(res => {
        console.log(res);
        document.getElementById('day1').innerHTML = weather.data[0].temp;
        document.getElementById('day2').innerHTML = weather.data[1].temp;
        document.getElementById('day3').innerHTML = weather.data[2].temp;
        document.getElementById('day4').innerHTML = weather.data[3].temp;
        document.getElementById('day5').innerHTML = weather.data[4].temp;
      })
      return weather;
    }catch(error){
      console.log('error', error)
    }
  }


export {
    generateWeather,
    getTheWeather,
}