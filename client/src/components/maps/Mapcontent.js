// rafce
import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.css";

import { create, list, remove,update } from "../functions/travel";

import icon from "leaflet/dist/images/marker-icon.png";
import editicon from "leaflet/dist/images/edit-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { FloatButton, Avatar } from "antd";
import {
  ZoomInOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import FormEdit from "../form/FormEdit";
import ConbineLayers from "../layers/ConbineLayers";
import ClickOnMap from "../layers/ClickOnMap";


// function
import { getLocation } from '../functions/util'



let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

let EditIcon = L.icon({
  iconUrl: editicon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;


const initialState = {
  lat: 0,
  lng: 0,
}


const Mapcontent = () => {
  const [position, setPosition] = useState(null);
  const [data, setData] = useState([]);
  const [form, setForm] = useState(initialState);
  const [fileold, setFileOld] = useState(null)



  const [showTable, setShowTable] = useState(false);
  const [slideAnimation, setSlideAnimation] = useState(false);

  // Edit
  const [id, setId] = useState(null);
  const [drag, setDrag] = useState(false);
  const [edit, setEdit] = useState(false);

  const mapRef = useRef(null);

  function toggleTable() {
    setShowTable(!showTable);
    setSlideAnimation(true);
  }

  useEffect(() => {
    // code
    loadData();
  }, []);
  const loadData = () => {
    list()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  
  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.files[0]);
    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);


    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    create(formData)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));


  };
  const flyto = (id,lat, lng) => {
    setId(id)
    console.log(lat, lng);
    mapRef.current.flyTo([lat, lng], 8);
  };
  const handleRemove = (id) => {
    console.log(id);
    remove(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id, lat, lng) => {
    flyto(id,lat, lng);
    setId(id);
    setDrag(true);

    setEdit(true);
  };
  const handleDragend = (e) => {
    const newLat = e.target.getLatLng().lat;
    const newLng = e.target.getLatLng().lng;
    console.log(newLat, newLng);

    getLocation(newLat,newLng)
    .then((res)=>{
        console.log(res)
        setForm({
            ...form,
            lat: newLat,
            lng: newLng,
            province:res.province,
            district:res.district,
            subdistrict:res.subdistrict
          });
    })
    .catch((err)=>console.log(err))

    updateArrayData(id, newLat, newLng);
  };

  const updateArrayData = (id, lat, lng) => {
    setData((prevData) =>
      prevData.map((item) => (item._id === id ? { ...item, lat, lng } : item))
    );
  };

  const handleCancel = () => {
    setEdit(false);
    setId(null);
    setDrag(false);
    setForm(initialState)
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log('form',form)
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
      formData.append('fileold',fileold)
    update(id,formData)
      .then((res) => {
        console.log(res);
        loadData();
        setForm(initialState)
        setEdit(false);
        setId(null);
        setDrag(!drag);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      <div className="col-md-10">
        <MapContainer
          ref={mapRef}
          center={[13, 100]}
          zoom={5}
          style={{ height: "100vh", zIndex: 1 }}
        >

          <ConbineLayers />

          {/* Events */}
         <ClickOnMap 
         setPosition={setPosition}
         position={position}
         form={form}
         setForm={setForm}
         />

          {/* Data */}
          {data
            ? data.map((item, index) => (
                <Marker
                  eventHandlers={{
                    click: () => flyto(item._Id,item.lat, item.lng),
                    dragend: (e) => handleDragend(e),
                  }}
                  position={[item.lat, item.lng]}
                  key={index}
                  draggable={id === item._id ? drag : false}
                  icon={id === item._id ? EditIcon : DefaultIcon}
                >
                  <Popup>
                    {item.name} <br />
                    {item.detail}
                    <img src={process.env.REACT_APP_IMG + "/" + item.file} />
                  </Popup>
                </Marker>
              ))
            : null}
        </MapContainer>
      </div>
      {edit ? (
        <FormEdit
          handleCancel={handleCancel}
          id={id}
          form={form}
          setForm={setForm}
          handleOnChange={handleOnChange}
          handleSubmitEdit={handleSubmitEdit}
          setFileOld={setFileOld}
        />
      ) : (
        <div className="col-md-2">
          Form
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Titile</label>
              <input
                name="name"
                onChange={(e) => handleOnChange(e)}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="title"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Detail</label>
              <input
                name="detail"
                onChange={(e) => handleOnChange(e)}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="title"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Latitude</label>
              <input
                name="lat"
                value={form.lat}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Longitude</label>
              <input
                name="lng"
                value={form.lng}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Province</label>
              <input
                name="province"
                value={form.province}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">District</label>
              <input
                name="province"
                value={form.district}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="title"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">subdistrict</label>
              <input
                name="province"
                value={form.subdistrict}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">File</label>
              <input
                name="file"
                type="file"
                onChange={(e) => handleOnChange(e)}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="title"
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      <div>
        <FloatButton onClick={toggleTable} className="float-button" />
      </div>

      <div
        className={`content-table ${showTable ? "visible" : ""} ${
          slideAnimation ? "slide-up" : ""
        }`}
      >
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">detail</th>
              <th scope="col">picture</th>
              <th scope="col">lat</th>
              <th scope="col">lng</th>
              <th scope="col">จังหวัด</th>
              <th scope="col">อำเภอ</th>
              <th scope="col">ตำบล</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.detail}</td>

                <td>
                  <Avatar
                    size={50}
                    src={process.env.REACT_APP_IMG + "/" + item.file}
                  />
                </td>

                <td>{item.lat}</td>
                <td>{item.lng}</td>
                <td>{item.province}</td>
                <td>{item.district}</td>
                <td>{item.subdistrict}</td>
                <td>
                  <ZoomInOutlined
                    onClick={() => flyto(item._id,item.lat, item.lng)}
                    style={{ cursor: "pointer" }}
                  />
                  {"     "}
                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={() => handleRemove(item._id)}
                  />

                  {"     "}
                  <EditOutlined
                    onClick={() => handleEdit(item._id, item.lat, item.lng)}
                    style={{ color: "blue", cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mapcontent;
