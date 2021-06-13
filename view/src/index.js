import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Queries from "./conv/queries";
import User from "./conv/User";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new User(),
        queries: new Queries()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);