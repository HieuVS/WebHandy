import React from "react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import viLocale from "date-fns/locale/vi";

import Main from "./Main";

import { CssBaseline } from '@material-ui/core';

function App() {
  return (
    <div className="App" style={{width:'100%'}} >
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
        <CssBaseline />
        <Main />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;