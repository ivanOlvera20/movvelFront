import Axios from 'axios';

export default Axios.create({
  baseURL: 'http://localhost:8080/api/'/* 'https://movvel-olveraconsultores.herokuapp.com/api' */,
  timeout: 15000,
});
