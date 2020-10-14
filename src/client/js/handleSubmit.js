const baseUrl = 'http://api.geonames.org/searchJSON?q='
const user = '&username=nour_m&maxRows=10'

ClassicEditor
    .create( document.getElementById( 'editor' ) )
    .then(editor => {
        console.log(editor);
     })
        .catch( error => {
         console.log(error);
         });

const search = document.getElementById('search');

search.addEventListener('click', generateInfo)

function generateInfo(e){
    e.preventDefault();
    let city = document.getElementById('location').value
    window.cityGlobal = city;
    getInfo(baseUrl, city, user)
    calculateDays();
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    setTimeout(calculateDays, midnight)
}

const getInfo = async (baseUrl, city, user) => {
    const res = await fetch(baseUrl + city + user);
    try{
      const data = await res.json();
      console.log(data);
      postData('/data',
       {countryName: data.geonames[0].countryName,
        latitude: data.geonames[0].lat,
        longitude: data.geonames[0].lng,
      }).then(res => {
        console.log(res);
        console.log(data)
        document.getElementById('country').innerHTML = 'Country: ' + data.geonames[0].countryName;
        document.getElementById('long').innerHTML = 'Longitude: ' + data.geonames[0].lat;
        document.getElementById('lat').innerHTML = 'Latitude: ' + data.geonames[0].lng;
        Client.generateWeather();
        Client.generateImage();
      })
      return data;
    }catch(error){
      console.log('error', error)
    }
  }


const postData = async ( url = '', data = {})=>{
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),      
    });
  
      try {
        const newData = await response.json();
        return newData
      }catch(error) {
      console.log("error", error);
      }
  }

  function calculateDays(){
    let tripDate = new Date(document.getElementById('startDate').value);
    window.tripDateGlobal = tripDate;
    let todayDate = new Date();
    window.todayDateGlobal = todayDate;
    console.log(todayDate)

    let endDate = new Date(document.getElementById('endDate').value);
    window.endDateGlobal = endDate;

    let countDown = Math.floor((tripDate - todayDate)/86400000)
    window.countDownGlobal = countDown;
    if (countDown < 0){
      alert('You cannot time travel !')
    } else {
      console.log(countDown)
      document.getElementById('daysCount').innerHTML = 'Days until trip: ' + countDown
    }
    
    let tripLength = Math.floor((endDate - tripDate)/86400000);
    window.tripLengthGlobal = tripLength;
    if (tripLength < 0){
      console.log(tripLength)
      alert('Enter a valid End Date')
    }
    else {
      console.log(tripLength)
      document.getElementById('tripLength').innerHTML = 'Trip Length: ' + tripLength + ' days'
    }
  }

  let itemsArray = localStorage.getItem('items') ? 
  JSON.parse(localStorage.getItem('items')) : []

  localStorage.setItem('items', JSON.stringify(itemsArray))
  const data = JSON.parse(localStorage.getItem('items'))
  
  const ul = document.querySelector('ul');

  const liMaker = text => {
    const li = document.createElement('li')
    li.textContent = text
    ul.appendChild(li)
  }

  document.getElementById('save').addEventListener('click', saveTrip) 

  function saveTrip(e){
    e.preventDefault()

    itemsArray.push('Trip Destination: ' + cityGlobal);
    itemsArray.push('Trip Start Date: ' + tripDateGlobal.getMonth() + tripDateGlobal.getDate() + tripDateGlobal.getFullYear());
    itemsArray.push('Trip End Date: ' + endDateGlobal.getMonth() + endDateGlobal.getDate() + endDateGlobal.getFullYear());
    localStorage.setItem('items', JSON.stringify(itemsArray))
    liMaker('Trip Destination: ' + cityGlobal)
    liMaker('Trip Start Date: ' + `${tripDateGlobal.getMonth()}/${tripDateGlobal.getDate()}/${tripDateGlobal.getFullYear()}`)
    liMaker('Trip End Date: ' + `${endDateGlobal.getMonth()}/${endDateGlobal.getDate()}/${endDateGlobal.getFullYear()}`)
  }

  data.forEach(item => {
    liMaker(item)
  })

  document.getElementById('clearTrip').addEventListener('click', function() {
    localStorage.clear()
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild)
    }
  });

  export {
      getInfo,
      generateInfo,
      postData,
  }