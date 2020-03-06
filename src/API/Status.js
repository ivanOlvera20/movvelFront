export default class Status {
  constructor() {
    this.loading = {
      status: true,
      message: '',
    };
    this.error = {
      status: false,
      message: '',
    };
    this.success = {
      status: false,
      message: '',
    };
    return this;
  }

  resetValues() {
    Object.keys(this).forEach((value) => {
      console.log(value);
      this[value].status = false;
      this[value].message = '';
    });
  }

  setError(e) {
    this.resetValues();
    this.error = {
      status: true,
      message: e,
    };
    return this;
  }

  setLoading() {
    this.resetValues();
    this.loading.status = true;
    return this;
  }

  setSuccess() {
    this.resetValues();
    this.success.status = true;
  }
}
