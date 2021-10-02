import axios from "axios";

const getAll = (url) => {
  return axios.get(url);
};

const getItem = (url, id) => {
  return axios.get(`${url}/${id}`);
};

const post = (url, obj) => {
  return axios.post(url, obj);
};

const deleteItem = (url, id) => {
  return axios.delete(url , id);
};

export default { getAll, getItem, post, deleteItem };
