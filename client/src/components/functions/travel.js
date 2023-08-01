import axios from "axios";

export const create = async (data) =>
  await axios.post(process.env.REACT_APP_API + "/travel", data);

export const list = async () => {
  return await axios.get(process.env.REACT_APP_API + "/travel");
};

export const remove = async (id) =>
  await axios.delete(process.env.REACT_APP_API + "/travel/" + id);

export const read = async (id) =>
  await axios.get(process.env.REACT_APP_API + "/travel/" + id);

export const update = async (id, data) =>
  await axios.put(process.env.REACT_APP_API + "/travel/" + id, data);
