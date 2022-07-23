import React from "react";
//import { useState } from "react";
import {  Paper, Box, Grid, Typography, Button, OutlinedInput, InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import clsx from "clsx";
import "../../theme/styles/Main.scss";
import { useSelector } from "react-redux";
import store from "redux/store";
import { postSchedule } from "api/scheduleApi";
import createUUID from '../../utils/createUUID'

function AddInfo({ setTab }) {
  const classes = useStyle();
  const inputText = classes.inputText;
  const info = useSelector(state => state.info);
  console.log('info',info)

  const scheduleItem = useSelector(state => state.schedule).items;
  console.log('schedule:', scheduleItem);

  const totalAmount = useSelector(state=>state.payment).totalAmount;
  console.log('totalAmount: ', totalAmount)

  const table = useSelector(state => state.table).table
  console.log('table: ', table)
  

  const uuid = createUUID();
  
  
  const onSubmit = async () => {
    let itemScheduleList = scheduleItem.map(item=> {
      delete item.image
      return item
    });
    const scheduleForm = {
      table: table.table,
      items: itemScheduleList,
      tax: 0.1,
      customer: info.customer,
      isTakeAway: false,
      totalAmount: totalAmount*11/10,
      tableId: uuid
    }
    try {
      const response = await postSchedule(scheduleForm);
      if(!response) {
        console.log("LOI R")
      }
      else {
        localStorage.setItem('Schedule', JSON.stringify(scheduleForm))
        setTab(3);
      }
      } catch (error) {
      console.log('ERROR: ', error)
    }

  };

  const onBack = () => {
    setTab(1);
  };

  const onChangeForm = (event) => {
    store.dispatch({type: 'ADD_INFO', payload: {...info.customer, [event.target.name]: event.target.value}} )
  }

  return (
    <React.Fragment>
      <Box className={classes.scheduleBox}>
        <Box className={classes.scheduleHeaderBox}>
          <Box className={classes.innerBox}>
            <Box
              className={clsx(
                classes.appointmentBox,
                classes.title,
                classes.boxFirst
              )}
            >
              <Typography variant="body1" className={classes.titleText}>
                1. Lịch hẹn
              </Typography>
            </Box>
            <Box
              className={clsx(
                classes.contactBox,
                classes.title,
                classes.boxSecond
              )}
            >
              <Typography variant="body1" className={classes.titleText}>
                2. Liên hệ
              </Typography>
            </Box>
            <Box
              className={clsx(
                classes.confirmBox,
                classes.title,
                classes.boxThird
              )}
            >
              <Typography variant="body1" className={classes.titleText}>
                3. Xác nhận
              </Typography>
            </Box>
          </Box>
        </Box>
        <form>
          <Grid container spacing={2} className={classes.gridForm}>
            <Paper elevation={1} className={classes.orderPaper} square={false}>
              <Typography className={classes.titleDetail}>
                Thông tin liên hệ
              </Typography>
              <Grid item xs={8} className={classes.orderInfo}>
                <OutlinedInput
                  placeholder="Họ và tên *"
                  fullWidth={true}
                  onChange={onChangeForm}
                  name="name"
                  value={info.name}
                  className={clsx(classes.inputPeopleCount, classes.inputFont)}
                  required={true}
                  inputProps={{ className: inputText }}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.inputIcon}
                    >
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  }
                ></OutlinedInput>
                <OutlinedInput
                  placeholder="Số điện thoại *"
                  fullWidth={true}
                  required={true}
                  type="number"
                  onChange={onChangeForm}
                  name="phone"
                  value={info.phone}
                  className={clsx(classes.inputPeopleCount, classes.inputFont)}
                  inputProps={{ className: inputText }}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.inputIcon}
                    >
                      <PhoneInTalkOutlinedIcon />
                    </InputAdornment>
                  }
                ></OutlinedInput>
                <OutlinedInput
                  placeholder="Địa chỉ"
                  fullWidth={true}
                  onChange={onChangeForm}
                  value={info.address}
                  name="address"
                  className={clsx(classes.inputPeopleCount, classes.inputFont)}
                  inputProps={{ className: inputText }}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.inputIcon}
                    >
                      <HomeOutlinedIcon />
                    </InputAdornment>
                  }
                ></OutlinedInput>
              </Grid>
            </Paper>
            <Grid item={true} xs={12}>
              <Box className={classes.btnBoxContinue}>
                <Button
                  className={classes.btnContinue}
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={onBack}
                >
                  Quay lại
                </Button>
                <Button
                  className={classes.btnContinue}
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={onSubmit}
                >
                  Xác nhận
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </React.Fragment>
  );
}

const useStyle = makeStyles((theme) => ({
  scheduleBox: {
    width: "100%",
    margin: "0 auto",
    display: "flex",
    position: "relative",
    borderRadius: "unset",
    flexDirection: "column",
  },
  // @media (max-width: 1289.95px) {
  //     jss472: {
  //         padding: '0 6px'
  //     }
  // }
  scheduleHeaderBox: {
    width: "100%",
    marginBottom: "25px",
  },
  innerBox: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(20px, 1fr))",
  },
  title: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  appointmentBox: {
    height: "40px",
    zIndex: 5,
    position: "relative",
    borderRight: "1px solid inherit",
    marginRight: "5px",
    "&::before": {
      right: "-25px",
      width: 0,
      bottom: 0,
      height: 0,
      content: '""',
      position: "absolute",
      borderTop: "20px solid transparent",
      borderLeft: "25px solid",
      borderBottom: "20px solid transparent",
    },
    "&::after": {
      left: 0,
      width: 0,
      bottom: 0,
      height: 0,
      content: '""',
      position: "absolute",
      borderTop: "20px solid transparent",
      borderLeft: "0px solid white",
      borderBottom: "20px solid transparent",
    },
  },
  contactBox: {
    height: "40px",
    zIndex: 4,
    position: "relative",
    borderRight: "1px solid inherit",
    marginRight: "5px",
    paddingLeft: "20px",
    "&::before": {
      right: "-25px",
      width: 0,
      bottom: 0,
      height: 0,
      content: '""',
      position: "absolute",
      borderTop: "20px solid transparent",
      borderLeft: "25px solid",
      borderBottom: "20px solid transparent",
    },
    "&::after": {
      left: 0,
      width: 0,
      bottom: 0,
      height: 0,
      content: '""',
      position: "absolute",
      borderTop: "20px solid transparent",
      borderLeft: "25px solid white",
      borderBottom: "20px solid transparent",
    },
  },
  confirmBox: {
    height: "40px",
    zIndex: 3,
    position: "relative",
    borderRight: "1px solid inherit",
    paddingLeft: "20px",
    "&::before": {
      right: "-25px",
      width: 0,
      bottom: 0,
      height: 0,
      content: '""',
      position: "absolute",
      borderTop: "20px solid transparent",
      borderLeft: "0px solid",
      borderBottom: "20px solid transparent",
    },
    "&::after": {
      left: 0,
      width: 0,
      bottom: 0,
      height: 0,
      content: '""',
      position: "absolute",
      borderTop: "20px solid transparent",
      borderLeft: "25px solid white",
      borderBottom: "20px solid transparent",
    },
  },
  boxFirst: {
    cursor: "pointer",
    background: "#6C7078",
    "&::before": {
      borderLeftColor: "#6C7078 !important",
    },
  },
  boxSecond: {
    background: "#6C7078",
    "&:before": {
      borderLeftColor: "#6C7078 !important",
    },
  },
  boxThird: {
    background: "#D4D5D8",
  },
  titleText: {
    color: "#fff",
    // fontSize: 'inherit',
    // fontWeight: 'inherit',
    fontSize: "12px!important",
    fontWeight: "600!important",
  },
  gridForm: {
    width: "100%",
    margin: 0,
    justifyContent: "center",
  },
  orderPaper: {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "24px 95px",
    position: "relative",
    boxShadow: "1px 0 4px 0 rgb(0 0 0 / 16%)",
    alignItems: "center",
    marginBottom: "15px",
    flexDirection: "column",
    paddingBottom: "35px",
    //backgroundImage: `url(${info})`,
    //position: "absolute",
    //zIndex: -1,
    // backgroundSize: "80%",
    // backgroundPosition: "center",
    //backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(${info})`,
  },
  titleDetail: {
    width: "100%",
    fontSize: "24px",
    fontWeight: "600",
  },
  orderInfo: {
    width: "454px",
  },
  inputFont: {
    fontSize: "16px",
    fontWeight: 600,
  },
  inputPeopleCount: {
    marginTop: "8px",
    paddingLeft: 0,
    borderRadius: "unset",
    marginBottom: "8px",
    height: "51px",
    //border: '2px solid'
  },
  inputIcon: {
    width: "50px",
    height: "100%",
    minWidth: "50px",
    background: "#ebeced",
    maxHeight: "100%",
    minHeight: "50px",
    borderRight: "solid 0.5px #cecfd2",
    marginRight: 0,
    justifyContent: "center",
    //border: '2px solid'

  },
  inputText: {
    padding: "16px 0 16px 8px",
    color: '#000'
  },
  boxTime: {
    "&>div": {
      "&>:first-child": {
        paddingRight: "7px",
      },
      "&>:nth-child(2)": {
        paddingLeft: "7px",
      },
    },
  },
  gridTime: {
    height: "100%",
    padding: 0,
  },
  chooseTime: {
    marginTop: "8px",
    paddingLeft: 0,
    borderRadius: "unset",
    marginBottom: "8px",
  },
  chooseDate: {
    marginBottom: 0,
  },
  inputTimePicker: {
    cursor: "pointer",
    padding: "16px 0 16px 8px",
  },
  iconDate: {
    width: "50px",
    height: "100%",
    minWidth: "50px",
    background: "#ebeced",
    maxHeight: "100%",
    minHeight: "50px",
    borderRight: "solid 0.5px #cecfd2",
    marginRight: 0,
    justifyContent: "center",
  },
  btnChooseTime: {
    color: "#979AA1",
    padding: "4px",
  },
  titleMenu: {
    width: "100%",
    fontSize: "24px",
    fontWeight: 600,
  },
  titleGuide: {
    width: "100%",
    margin: "16px 0 36px 0",
    textAlign: "left",
    fontSize: "14px!important",
    fontWeight: "400!important",
  },
  btnChooseProduct: {
    width: "70px",
    height: "30px",
    minHeight: "unset",
    borderRadius: "2px",
    textTransform: "none",
    fontSize: "14px!important",
    fontWeight: "600!important",
  },
  textArea: {
    padding: "12px",
    minHeight: "100px",
  },
  textBox: {
    borderRadius: "unset",
    marginBottom: 0,
  },
  takeNote: {
    color: "#4B4D53",
    height: "20px",
    padding: "10px",
    fontSize: "14px",
    fontFamily: "Inter,Roboto,Arial,sans-serif",
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  textNote: {
    height: "auto",
    padding: "4px",
    color: "#4B4D53",
    // height: '20px',
    // padding: '10px',
    // fontSize: '14px',
    // fontFamily: 'Inter,Roboto,Arial,sans-serif',
    // fontWeight: 400,
    // lineHeight: 'normal',
    // letterSpacing: 'normal',
  },
  btnBoxContinue: {
    display: "flex",
    marginTop: "30px",
    marginBottom: "60px",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContinue: {
    fontSize: "16px",
    fontWeight: 600,
    borderRadius: "4px",
    textTransform: "none",
    minHeight: "46px",
    paddingTop: "9px",
    marginLeft: "10px",
    //paddingRight: "36px",
    paddingBottom: "9px",
  },
  // root: {
  //     btnLeftArrow: {
  //         width: '24px',
  //         height: '24px',
  //         padding: 0,
  //         justifyContent: 'flex-start',
  //     }
  // }
  btnLeftArrow: {
    width: "24px",
    height: "24px",
    padding: 0,
    justifyContent: "flex-start",
    "&>*:first-child": {
      width: "24px",
      height: "24px",
    },
  },
  btnRightArrow: {
    width: "24px",
    height: "24px",
    padding: 0,
    justifyContent: "flex-start",
    "&>*:first-child": {
      width: "24px",
      height: "24px",
    },
  },
  paperDialog: {
    display: "flex",
    borderRadius: "6px",
    backgroundColor: "#ef5845",
  },
  orderBoxHeader: {
    width: "100%",
    height: "48px",
    display: "flex",
    padding: "6px 16px",
    boxShadow: "1px 0 4px 0 rgb(0 0 0 / 16%)",
    backgroundColor: "rgba(62, 64, 69, 0.1)",
  },
  orderHeaderIcon: {
    color: "#6c7078",
    width: "36px",
    height: "36px",
    padding: "6px",
    marginRight: "16px",
    borderRadius: "50%",
    backgroundColor: "white",
  },
  orderHeaderTitle: {
    width: "100%",
    height: "24px",
    margin: "6px 0",
    display: "flex",
  },
  orderHeaderText: {
    color: "#3e4045",
    display: "flex",
    alignItems: "center",
    fontWeight: "600",
    lineHeight: 1.5,
  },
  orderImg: {
    display: "flex",
    overflow: "auto",
    position: "relative",
    background: "#FAFAFB",
    maxHeight: "580px",
    minHeight: "420px",
    flexDirection: "column",
  },
  Image: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemPreOrder: {
    width: "95%",
    display: "flex",
    position: "relative",
    alignSelf: "center",
    background: "#fff",
    boxShadow: "0 2px 2px 0 rgb(0 0 0 / 15%)",
    marginTop: "8px",
  },
  preOrderClose: {
    top: "8px",
    color: "#4B4D53",
    right: "19px",
    width: "18px",
    cursor: "pointer",
    height: "18px",
    position: "absolute",
  },
  itemImg: {
    display: "flex",
    padding: "12px 9px 0",
    justifyContent: "space-between",
  },
  detailItem: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  itemTitle: {
    width: "85%",
    padding: "9px 0",
    paddingBottom: 0,
    "-webkit-line-clamp": 2,
  },
  titleFont: {
    display: "inline",
    lineHeight: "1.57",
    paddingRight: "3px",
  },
  itemList: {
    color: "#6C7078",
    width: "85%",
    display: "inline",
  },
  itemPrice: {
    padding: "9px 16px 12px 0",
    minWidth: "106px",
  },
  change: {
    display: "flex",
    justifyContent: "space-between",
    "&>p": {
      width: "fit-content",
      cursor: "pointer",
    },
  },
  regularSmTxt: {
    fontSize: "12px!important",
    fontWeight: "400!important",
  },
  countPrice: {
    color: "#3e4045",
    height: "22px",
    textAlign: "right",
    lineHeight: "1.57",
  },
  imgOrder: {
    width: "160px",
    height: "160px",
    position: "absolute",
  },
  bill: {
    width: "100%",
    display: "flex",
    background: "rgba(239,88,69,0.1)",
    boxShadow: "1px 0 4px 0 rgb(0 0 0 / 16%)",
    marginTop: "10px",
    paddingTop: "12px",
    flexDirection: "column",
    justifyContent: "center",
  },
  money: {
    height: "100%",
    display: "flex",
    paddingLeft: "12px",
    marginBottom: "10px",
    paddingRight: "12px",
  },
  line: {
    width: "auto",
    height: "1px",
    backgroundColor: "#CECFD2",
  },
  payment: {
    display: "flex",
    padding: "26px 12px",
  },
  moneyAmount: {
    color: "#08080A",
    lineHeight: "1.5",
    marginLeft: "auto",
  },
  paymentText: {
    color: "#3e4045",
    fontWeight: "600",
    lineHeight: "1.5",
    fontSize: "20px",
  },
  paymentAmount: {
    color: "#EF5845",
    marginLeft: "auto",
  },
}));

export default AddInfo;
