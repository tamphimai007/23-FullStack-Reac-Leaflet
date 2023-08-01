// rafce
import React, { useEffect } from "react";

import { read } from "../functions/travel";

const FormEdit = ({ handleCancel, id, form, setForm,handleOnChange,handleSubmitEdit,setFileOld }) => {
  useEffect(() => {
    //code
    loadData(id);
  }, [id]);

  const loadData = (id) => {
    read(id)
      .then((res) => {
        console.log(res);
        setForm(res.data);
        setFileOld(res.data.file)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="col-md-2">
      Form Edit
      <form 
      onSubmit={(e)=>handleSubmitEdit(e)}
      enctype="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Titile</label>
          <input
            name="name"
            onChange={(e) => handleOnChange(e)}
            value={form.name}
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
            value={form.detail}
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
        <button onClick={() => handleCancel()}>Cancel</button>
      </form>
    </div>
  );
};

export default FormEdit;
