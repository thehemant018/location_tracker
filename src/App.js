import {useState} from 'react'
import './App.css';

function App() {
  const zoom = 16;
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [userAddress, setUserAddress] = useState()

  const [GPSlatitude, setGPSLatitude] = useState()
  const [GPSlongitude, setGPSLongitude] = useState()


  const geo=navigator.geolocation

  //Get User current location
  geo.getCurrentPosition(userCoords)
  function userCoords(position){
    let userLatitude=position.coords.latitude
    let userLongitude=position.coords.longitude
    // console.log('Latitude',userLatitude);
    // console.log('Longitude:', userLongitude);
    setLatitude(userLatitude);
    setLongitude(userLongitude);
  }

  const getUserAddress= async()=>{
    let url=`https://api.opencagedata.com/geocode/v1/json?key=aab7d26cfc134dbcb3e15f855e0668b3&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
    const loc=await fetch(url);
    const data=await loc.json()
    // console.log("User address :",data);
    // console.log("User City :",data.results[0].components.city);
    console.log("User Country :",data.results[0].components.country);
    setUserAddress(data.results[0].formatted)
  }

  const handleGetUserAddress=()=>{
    getUserAddress()
  }

  //Get User current GPS location
  const watchID=geo.watchPosition(userGPSCoords)
  function userGPSCoords(position){
    let userGPSLatitude=position.coords.latitude
    let userGPSLongitude=position.coords.longitude
    // console.log('Latitude',userLatitude);
    // console.log('Longitude:', userGPSLongitude);
    setGPSLatitude(userGPSLatitude);
    setGPSLongitude(userGPSLongitude);
  }

  const stopGPS=()=>{
    geo.clearWatch(watchID)
  }

  return (
    <>
      <h1>Current Location</h1>
      <h3>Latitude : {latitude}</h3>
      <h3>Longitude : {longitude}</h3>
      <h3>User Address: {userAddress}</h3>
      <button onClick={handleGetUserAddress}>Get User Address</button>

      <hr/>
      <h1> GPS TRACKING</h1>
      <h3>GPS Latitude : {GPSlatitude}</h3>
      <h3>GPS Longitude : {GPSlongitude}</h3>

      <iframe
                width="600"
                height="450"
                style={{ border: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"             src={`https://maps.google.com/maps?q=${GPSlatitude},${GPSlongitude}&z=${zoom}&output=embed`}
                title="google map"
            ></iframe>
    </>
  );
}

export default App;
