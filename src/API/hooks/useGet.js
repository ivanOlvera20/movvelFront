import { useState, useEffect, useMemo } from 'react';
import FetchAPI from '../FetchAPI';

export default (path) => {
  const [state, setState] = useState();
  const APIcontroller = useMemo(() => new FetchAPI(path), [path]);
  const refetch = () => {
    APIcontroller.get()
      .then((res) => {
        setState(res);
      });
  };
  useEffect(() => {
    APIcontroller.get()
      .then((res) => {
        setState(res);
      });
  }, [APIcontroller]);
  if (state instanceof Error) {
    return [state];
  }
  // const { data, ...rest } = state;
  return [state, refetch];
};
