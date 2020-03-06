import FetchAPI from '../FetchAPI';

export default (url) => {
  const APIcontroller = new FetchAPI(url);

  return [APIcontroller.delete.bind(APIcontroller)];
};
