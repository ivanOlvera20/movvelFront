import Axios from 'axios';

export default Axios.create({
  baseURL: 'http://localhost:9000/api/'/* 'https://movvel-olveraconsultores.herokuapp.com/api' */,
  timeout: 15000,
});
