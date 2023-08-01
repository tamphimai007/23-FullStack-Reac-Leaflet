import axios from 'axios'


export const getLocation = async(lat,lng)=>{
    const uri =`https://api.sphere.gistda.or.th/services/geo/address?lon=${lng}&lat=${lat}&local=t&key=${process.env.REACT_APP_SPHERE}`

    const res = await axios.get(uri)
    return res.data
}