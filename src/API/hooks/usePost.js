import FetchAPI from '../FetchAPI';

export default (path) => {
  const APIcontroller = new FetchAPI(path);
  return [APIcontroller.post.bind(APIcontroller)];
};
