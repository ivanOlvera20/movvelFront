import axios from './axios';

export default class FetchAPI {
  constructor(path) {
    this.path = path;
  }

  async get() {
    try {
      const response = await axios.get(this.path);
      return response;
    } catch (e) {
      return e;
    }
  }

  async post(props) {
    try {
      const response = await axios.post(this.path, props);
      return response;
    } catch (e) {
      return e;
    }
  }

  async put(id, props) {
    try {
      const response = await axios.put(`${this.path}/${id}`, props);
      return response;
    } catch (e) {
      return e;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.path}/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  async getOne(id) {
    try {
      const response = await axios.get(`${this.path}/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }
  
}
