import React from "react";
import { useState } from "react";
import { Tab, Button, Box, Dialog, DialogTitle, IconButton, Typography, SvgIcon, DialogContent, Grid, LinearProgress, Tabs, } from "@material-ui/core";
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';


function RateDialog(props) {
  const { onShow, onClose } = props;
  const classes = useStyle();

  const [value, setValue] = useState(0);

  const handleTabs = (event, value) => {
    setValue(value);
  };

  return (
    <React.Fragment>
      <Dialog
        open={onShow}
        onClose={onClose}
        maxWidth="lg"
        PaperProps={{ className: classes.rateDialog }}
      >
        <DialogTitle>
          <Box className={classes.boxDialog}>
            <Typography className={classes.titleDialog}>Handyres</Typography>
            <IconButton onClick={onClose}>
              <SvgIcon component={CloseIcon} viewBox="0 0 24 24" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <div>
            <Grid container={true} spacing={2}>
              <Grid item={true} container xs={5} direction="column">
                <Box className={classes.containerBox}>
                  <Box className={classes.infoBox}>
                    <Typography className={classes.ratingPoint}>0.0</Typography>
                    <Box className={classes.rateBox}>
                      <Rating readOnly={true} defaultValue={0}></Rating>
                      <Typography>0 Đánh giá </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Grid
                      classes={{ item: classes.item }}
                      className={classes.rateLine}
                      container={true}
                    >
                      <Grid xs={2} item={true}>
                        <Box className={classes.rateStar}>
                          <Typography variant="body2">5</Typography>
                          <SvgIcon focusable="false" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                          </SvgIcon>
                        </Box>
                      </Grid>
                      <Grid xs={8} item={true}>
                        <LinearProgress
                          value={0}
                          classes={{ barColorPrimary: classes.barColorPrimary }}
                          color={"primary"}
                          variant={"determinate"}
                          className={classes.progress}
                        ></LinearProgress>
                      </Grid>
                      <Grid xs={2} item={true}>
                        <Typography className={classes.amountRate}>
                          0
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid className={classes.rateLine} container={true}>
                      <Grid xs={2} item={true} className={classes.rateLine}>
                        <Box className={classes.rateStar}>
                          <Typography variant="body2">4</Typography>
                          <SvgIcon focusable="false" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                          </SvgIcon>
                        </Box>
                      </Grid>
                      <Grid xs={8} item={true}>
                        <LinearProgress
                          value={0}
                          classes={{ barColorPrimary: classes.barColorPrimary }}
                          color={"primary"}
                          variant={"determinate"}
                          className={classes.progress}
                        ></LinearProgress>
                      </Grid>
                      <Grid xs={2} item={true}>
                        <Typography className={classes.amountRate}>
                          0
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid className={classes.rateLine} container={true}>
                      <Grid xs={2} item={true}>
                        <Box className={classes.rateStar}>
                          <Typography variant="body2">3</Typography>
                          <SvgIcon focusable="false" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                          </SvgIcon>
                        </Box>
                      </Grid>
                      <Grid xs={8} item={true}>
                        <LinearProgress
                          value={0}
                          classes={{ barColorPrimary: classes.barColorPrimary }}
                          color={"primary"}
                          variant={"determinate"}
                          className={classes.progress}
                        ></LinearProgress>
                      </Grid>
                      <Grid xs={2} item={true}>
                        <Typography className={classes.amountRate}>
                          0
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid className={classes.rateLine} container={true}>
                      <Grid xs={2} item={true}>
                        <Box className={classes.rateStar}>
                          <Typography variant="body2">2</Typography>
                          <SvgIcon focusable="false" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                          </SvgIcon>
                        </Box>
                      </Grid>
                      <Grid xs={8} item={true}>
                        <LinearProgress
                          value={0}
                          classes={{ barColorPrimary: classes.barColorPrimary }}
                          color={"primary"}
                          variant={"determinate"}
                          className={classes.progress}
                        ></LinearProgress>
                      </Grid>
                      <Grid xs={2} item={true}>
                        <Typography className={classes.amountRate}>
                          0
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid className={classes.rateLine} container={true}>
                      <Grid xs={2} item={true}>
                        <Box className={classes.rateStar}>
                          <Typography variant="body2">1</Typography>
                          <SvgIcon focusable="false" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                          </SvgIcon>
                        </Box>
                      </Grid>
                      <Grid xs={8} item={true}>
                        <LinearProgress
                          value={0}
                          classes={{ barColorPrimary: classes.barColorPrimary }}
                          color={"primary"}
                          variant={"determinate"}
                          className={classes.progress}
                        ></LinearProgress>
                      </Grid>
                      <Grid xs={2} item={true}>
                        <Typography className={classes.amountRate}>
                          0
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Button className={classes.btnRate}>Viết đánh giá</Button>
                </Box>
              </Grid>
              <Grid item={true} xs={7}>
                <Box className={classes.commentBox}>
                  <Box className={classes.commentHeader}>
                    <Tabs
                      value={value}
                      onChange={handleTabs}
                      TabIndicatorProps={{ className: classes.indicator }}
                    >
                      <Tab
                        classes={{ root: classes.root }}
                        className={classes.tabWidth}
                        label="TẤT CẢ"
                      ></Tab>
                      <Tab
                        classes={{ root: classes.root }}
                        className={classes.tabWidth}
                        label="5 SAO"
                      ></Tab>
                      <Tab
                        classes={{ root: classes.root }}
                        className={classes.tabWidth}
                        label="4 SAO"
                      ></Tab>
                      <Tab
                        classes={{ root: classes.root }}
                        className={classes.tabWidth}
                        label="3 SAO"
                      ></Tab>
                      <Tab
                        classes={{ root: classes.root }}
                        className={classes.tabWidth}
                        label="2 SAO"
                      ></Tab>
                      <Tab
                        classes={{ root: classes.root }}
                        className={classes.tabWidth}
                        label="1 SAO"
                      ></Tab>
                    </Tabs>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

const useStyle = makeStyles({
  barColorPrimary: {
    borderRadius: "10px",
    backgroundColor: "#FEBA40",
  },
  root: {
    //color: '#FFFFFF',
    padding: "6px 12px",
    overflow: "hidden",
    position: "relative",
    fontSize: "14px",
    // maxWidth: '264px',
    // minWidth: '72px',
    boxSizing: "border-box",
    minHeight: "48px",
    textAlign: "center",
    flexShrink: 0,
    fontFamily: "Inter,Roboto,Arial,sans-serif",
    fontWeight: 700,
    lineHeight: "normal",
    whiteSpace: "normal",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  },
  indicator: {
    backgroundColor: "#65B39D",
    bottom: 0,
    height: "2px",
    position: "absolute",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  item: {
    // display: flex;
    // align-items: center;
    height: "17.5px",
  },
  rateDialog: {
    width: "100%",
    height: "100%",
    boxShadow: "0 1px 6px 0 rgb(0 0 0 / 10%)",
    objectFit: "contain",
    overflowY: "hidden",
    borderRadius: "5px",
    backgroundColor: "#FFFFFF",
  },
  boxDialog: {
    width: "100%",
    display: "flex",
  },
  titleDialog: {
    color: "#08080A",
    width: "95%",
    fontSize: "24px",
    marginTop: "7px",
  },
  containerBox: {
    width: "100%",
    display: "flex",
    marginTop: "10px",
    flexDirection: "column",
  },
  infoBox: {
    display: "flex",
  },
  ratingPoint: {
    width: "64px",
    height: "50px",
    fontSize: "40px",
    marginRight: "1rem",
  },
  rateBox: {
    textAlign: "left",
  },
  rateLine: {
    display: "flex",
    alignItems: "center",
    height: "17.5px",
  },
  rateStar: {
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    marginLeft: "10px",
    "&>svg": {
      color: "#FEBA40",
      fontSize: "15px",
    },
  },
  progress: {
    height: "8px",
    margin: "0 8px",
    borderRadius: "10px",
    backgroundColor: "#D4D5D8",
  },
  amountRate: {
    fontSize: "12px",
    minWidth: "maxContent",
  },
  btnRate: {
    border: "1px solid #EF5845",
    height: "40px",
    background: "#FFFFFF",
    marginTop: "40px",
    borderRadius: "4px",
    textTransform: "none",
  },
  commentBox: {
    width: "100%",
    margin: "16px 0",
    padding: "16px",
  },
  commentHeader: {
    width: "100%",
    borderBottom: "1px solid #EBECED !important",
  },
  tabWidth: {
    minWidth: "16.6%",
  },
});

export default RateDialog;