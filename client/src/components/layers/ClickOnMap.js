// rafce
import React from 'react'
import { Marker,Popup,useMapEvents } from 'react-leaflet';

import { getLocation } from '../functions/util'



const ClickOnMap = ({setForm,form,setPosition,position}) => {

    const LocationMarker = () => {
        const map = useMapEvents({
          click(e) {
            // console.log(e.latlng);
            map.flyTo(e.latlng, 10);
            setPosition(e.latlng);
    
            getLocation(e.latlng.lat,e.latlng.lng)
            .then((res)=>{
                console.log(res)
                setForm({
                    ...form,
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    province:res.province,
                    district:res.district,
                    subdistrict:res.subdistrict
                  });
            })
            .catch((err)=>console.log(err))



        
          },
        });
    
        return position === null ? null : (
          <Marker position={position}>
            <Popup>Are you here</Popup>
          </Marker>
        );
      };





  return  <LocationMarker />
}

export default ClickOnMap