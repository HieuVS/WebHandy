import React from "react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import viLocale from "date-fns/locale/vi";

import Main from "./Main";

import { CssBaseline } from '@material-ui/core';
import { Provider } from "react-redux";
import store from "redux/store";

function App() {
  return (
    <div className="App" style={{width:'100%'}} >
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
          <CssBaseline />
          <Main />
        </MuiPickersUtilsProvider>
      </Provider>
    </div>
  );
}

export default App;