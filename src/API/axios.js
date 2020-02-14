import Axios from 'axios';

export default Axios.create({
  baseURL: 'https://movvel-olveraconsultores.herokuapp.com/api',
  timeout: 15000,
});
