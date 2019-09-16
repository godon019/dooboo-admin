import React, { useEffect, useState } from 'react';

import { LoadingOverlay } from '../components/shared/Loading/Loading';

interface Context {
  // obj: { [name: string]: boolean };
  setLoadingObject: (name: string, value: boolean) => void;
  // loading: boolean;
}

const Context = React.createContext<Context | null>(null);

interface Props {
  showInit?: boolean;
}
const Provider: React.FC<Props> = (props) => {
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(false);

  const setLoadingObject = (name: string, value: boolean) => {
    setObj({ ...obj, [name]: value });
  };

  useEffect(() => {
    let tmp = false;
    for (var key in obj) {
      if (obj[key] === true) tmp = true;
    }
    setLoading(tmp);
  }, [obj]);

  const contexts: Context = {
    // obj,
    setLoadingObject,
    // loading,
  };
  return (
    <>
      <LoadingOverlay show={loading} fetchingStatusObj={obj} />
      <Context.Provider value={contexts}>{props.children}</Context.Provider>;
    </>
  );
};

export { Provider as LoadingProvider, Context as LoadingContext };
