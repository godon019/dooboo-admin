import React, { useState } from 'react';

interface Context {
  show: boolean;
  setShow: (show: boolean) => any;
}

const Context = React.createContext<Context | null>(null);
interface Props {
  showInit?: boolean;
}
const Provider: React.FC<Props> = (props) => {
  const [show, setShow] = useState(props.showInit ? props.showInit : false);

  const contexts: Context = {
    show,
    setShow,
  };
  return <Context.Provider value={contexts}>{props.children}</Context.Provider>;
};

export { Provider as LoggerProvider, Context as LoggerContext };
