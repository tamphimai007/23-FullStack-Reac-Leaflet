import React from 'react'
import { GeoJSON } from 'react-leaflet'
import data from '../data/thailand.json'


const Province = () => {
    const styleProvince ={
        color:'red',
        fillColor:'orange',
        fillOpacity:'0',
        weight:'1'
    }


  return (
    <GeoJSON data={data} style={styleProvince}/>
  )
}

export default Province