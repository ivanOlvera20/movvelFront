import { useState, useEffect, useMemo } from 'react';
import FetchAPI from '../FetchAPI';

export default (path) => {
    const [state, setState] = useState();
    const APIcontroller = useMemo(() => new FetchAPI(path), [path]);
    const refetch = () => {
        APIcontroller.getOne()
            .then((res) => {
                setState(res);
            });
    };
    useEffect(() => {
        APIcontroller.getOne()
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
