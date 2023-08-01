//rafce
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Marker,Popup,Tooltip } from "react-leaflet";
import L from 'leaflet'


const WeatherLayers = () => {
    const [data, setData] = useState([])

    useEffect(()=>{
        // code
        loadData()
    },[])




const loadData = async()=>{
        const uri = 'https://data.tmd.go.th/api/WeatherToday/V2/?uid=api&ukey=api12345&format=json'
        await axios.get(uri)
        .then((res)=>{
           
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }

  



  const labelIcon = (temp)=>{
    var iconColor ='map-label-content'
    if(temp > 28){
        iconColor +=' red'
    }else if(temp >25){
        iconColor +=' orange'
    }else if(temp >20){
        iconColor += ' yellow'
    }


    return  new L.divIcon({
        className:'map-label',
        html:`<div class="map-label"><div class="map-label ${iconColor}">${temp}</div></div>`
      })  
  }  

  


  return <div>{ 



    data.Stations?.Station.map((item)=>{
      
        return <Marker position={[item.Latitude,item.Longitude]} icon={labelIcon(item.Observation.Temperature)}>
                    <Tooltip>
                        {/* Temperature:{item.Observation.Temperature} */}
                        {Object.entries(item.Observation).map(([key,value])=>{
                            if(typeof value==='object'){
                                return null
                            }else{
                                return <div>
                                    <b>{key}</b>:{value}
                                </div>
                            }
                        } )}
                    </Tooltip>

        </Marker>
    })
    
    
    
    }</div>;
};

export default WeatherLayers;
