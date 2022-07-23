import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Schedule from "./Schedule/Schedule";
import AddInfo from "./Schedule/AddInfo";
import ConfirmSchedule from "./Schedule/ConfirmSchedule";


const TabSchedule = (props) => {
  const { children, value, index, ...other } = props;
  const classes = useStyle();
  const [tab, setTab] = useState(1);

  return (
    <Grid
      id={`tabpanel-${index}`}
      //className={classes.scheduleGrid}
      item={true}
      hidden={value !== index}
      role="tabpanel"
      aria-labelledby={`tabpanel-${index}`}
      {...other}
    >  
      {
        {
            1: <Schedule setTab={setTab}/>,
            2: <AddInfo setTab={setTab}/>,
            3: <ConfirmSchedule setTab={setTab}/>
        }[tab]
      }

    </Grid>
  );
};


const useStyle = makeStyles({

});

export default TabSchedule;