import React from "react";
import { useState } from "react";
import { Dialog, Paper, Box, Grid, Typography, SvgIcon, Button, OutlinedInput, InputAdornment, IconButton, CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import clsx from "clsx";
import "../../theme/styles/Main.scss";
import Menu from "../Menu";
import formatDate, { formatDateISO, formatTimePicker } from "utils/formatDate";
import { useSelector } from "react-redux";
import { formatCash } from "utils/formatCash";
import { imageToBase64 } from "utils/imageToBase64";
import store from "redux/store";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

function Schedule({setTab}) {
  const classes = useStyle();
  const inputText = classes.inputText;
  
  const [headCount, setHeadCount] = useState("");
  
  const [selectedDate, setSelectedDate] = useState();
  const [inputDate, setInputDate] = useState('');
  const [selectedTime, setSelectedTime] = useState();
  const [inputTime, setInpuTime] = useState('')
  const [openDate, setOpenDate] = useState(false);
  const [openHour, setOpenHour] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  //console.log('DATE: ', selectedDate);
  //console.log('TIME: ', selectedTime);

  const scheduleItem = useSelector(state => state.schedule).items;
  //console.log('schedule:', scheduleItem);

  const totalAmount = useSelector(state=>state.payment).totalAmount;
  //console.log('totalAmount: ', totalAmount)

  const handleInputCount = (e) => {
    let value = e.target.value;
    if (parseInt(value) > 0 && parseInt(value) < 50) {
      setHeadCount(value.replace(/\D/, ""));
      if (!selectedDate) {
        setInputDate(formatDate(new Date()));
        setSelectedDate(new Date())
      }
    } else if (value === "") {
      setHeadCount("");
    }
  };

  const handleDatePicker = () => {
    setOpenDate(true);
  };

  const handleTimePicker = () => {
    setOpenHour(true);
  };

  const onChangeDate = (date) => {
    console.log('selectedDate', selectedDate)
     setInputDate(formatDate(date))
     setSelectedDate(date);
  };

  const onChangeTime = (time) => {
    setSelectedTime(time);
    setInpuTime(formatTimePicker(time))
  };


  const onContinue = () => {
    store.dispatch({type: 'ADD_TABLE', payload: {table :{
      headCount: headCount,
      startAt: new Date (formatDateISO(selectedDate, selectedTime)),
    }}})
    setTab(2);
  };

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
                Thông tin đặt trước
              </Typography>
              <Typography className={classes.timeSchedule}>
                Chọn thời gian đặt lịch hẹn
              </Typography>
              <Grid item xs={8} className={classes.orderInfo}>
                <OutlinedInput
                  placeholder="Số người lớn *"
                  fullWidth={true}
                  onChange={handleInputCount}
                  value={headCount}
                  className={clsx(classes.inputPeopleCount, classes.inputFont)}
                  required={true}
                  inputProps={{ className: inputText }}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.inputIcon}
                    >
                      <SvgIcon viewBox="0 0 24 24">
                        <circle cx="15.5" cy="9.5" r="1.5"></circle>
                        <circle cx="8.5" cy="9.5" r="1.5"></circle>
                        <path d="M12 16c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2zm-.01-14C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                      </SvgIcon>
                    </InputAdornment>
                  }
                ></OutlinedInput>
                <Box className={classes.boxTime}>
                  <Grid container>
                    <Grid item xs={6}>
                      <OutlinedInput
                        placeholder="Chọn ngày *"
                        className={clsx(classes.chooseTime, classes.chooseDate)}
                        fullWidth={true}
                        required={true}
                        inputProps={{ className: classes.inputTimePicker }}
                        value={inputDate}
                        startAdornment={
                          <InputAdornment
                            position="start"
                            className={classes.iconDate}
                          >
                            <SvgIcon>
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm5.56 10.46l5.93-5.93-1.06-1.06-4.87 4.87-2.11-2.11-1.06 1.06z"></path>
                            </SvgIcon>
                          </InputAdornment>
                        }
                        endAdornment={
                          <IconButton
                            edge="end"
                            className={classes.btnChooseTime}
                            onClick={handleDatePicker}
                          >
                            <SvgIcon>
                              <path d="M7 10l5 5 5-5H7z"></path>
                            </SvgIcon>
                          </IconButton>
                        }
                      ></OutlinedInput>
                    </Grid>
                    <Grid item xs={6}>
                      <OutlinedInput
                        placeholder="Chọn giờ *"
                        className={clsx(classes.chooseTime, classes.chooseDate)}
                        fullWidth={true}
                        required={true}
                        value={inputTime}
                        inputProps={{ className: classes.inputTimePicker }}
                        startAdornment={
                          <InputAdornment
                            position="start"
                            className={classes.iconDate}
                          >
                            <SvgIcon>
                              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                            </SvgIcon>
                          </InputAdornment>
                        }
                        endAdornment={
                          <IconButton
                            edge="end"
                            className={classes.btnChooseTime}
                            onClick={handleTimePicker}
                          >
                            <SvgIcon>
                              <path d="M7 10l5 5 5-5H7z"></path>
                            </SvgIcon>
                          </IconButton>
                        }
                      ></OutlinedInput>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Paper>
            <Paper elevation={1} className={classes.orderPaper} square={false}>
              <Typography className={classes.titleMenu} variant="body1">
                Chọn dịch vụ đi kèm/đặt trước món
              </Typography>
              <Typography className={classes.titleGuide}>
                Nhấn vào nút "Chọn" trong bước này để bắt đầu đặt trước những
                sản phâm và dịch vụ bạn mong muốn. Những sản phẩm và dịch vụ
                được đặt trước có thể sẽ được tính thêm cước phí đặt cọc.
              </Typography>
              <Button
                onClick={() => setOpenMenu(true)}
                classes={{ contained: classes.contained }}
                id="product-select-button"
                className={classes.btnChooseProduct}
                variant="contained"
                color="primary"
              >
                Chọn
              </Button>
              {typeof scheduleItem !== "undefined" &&
              scheduleItem.length > 0 ? (
                <Box style={{ width: "100%", marginTop: "25px" }}>
                  <Box className={classes.orderBoxHeader}>
                    <Box className={classes.orderHeaderIcon}>
                      <SvgIcon>
                        <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z"></path>
                      </SvgIcon>
                    </Box>
                    <Box className={classes.orderHeaderTitle}>
                      <Typography
                        className={classes.orderHeaderText}
                        component="h6"
                        variant="subtitle1"
                      >
                        Đặt trước
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={clsx(classes.orderImg)}>
                    {
                      scheduleItem.map((item, index) => (
                          <Box className={classes.itemPreOrder} key={index}>
                            <SvgIcon
                              className={classes.preOrderClose}
                              //onClick={onClosePreOrder}
                            >
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            </SvgIcon>
                            <Box className={classes.itemImg}>
                              <CardMedia
                                style={{ width: "40px", height: "40px" }}
                                component="img"
                                src={
                                  !item.image
                                    ? ""
                                    : `data:image/png;base64, ${imageToBase64(
                                        item.image.data.data
                                      )}`
                                }
                              ></CardMedia>
                            </Box>
                            <Box className={classes.detailItem}>
                              <Box className={classes.itemTitle}>
                                <Typography
                                  component="h6"
                                  variant="subtitle2"
                                  className={classes.titleFont}
                                >
                                  {item.name}
                                </Typography>
                              </Box>
                              <Box className={classes.itemPrice}>
                                <Box className={classes.change}>
                                  <Typography
                                    variant="body1"
                                    color="primary"
                                    className={classes.regularSmTxt}
                                  >
                                    Chỉnh sửa
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography
                                component="h6"
                                variant="subtitle2"
                                className={classes.countPrice}
                              >
                                {item.quantity} x{formatCash(item.price)}
                              </Typography>
                            </Box>
                          </Box>
                        ))
                      }                       
                  </Box>
                  <Box className={classes.bill}>
                    <Box className={clsx(classes.money, classes.totalMoney)}>
                      <Typography variant="body1">Tổng tiền:</Typography>
                      <Typography
                        variant="body1"
                        className={classes.moneyAmount}
                      >
                        {totalAmount ? formatCash(totalAmount) : ''}
                        đ
                      </Typography>
                    </Box>
                    <Box className={clsx(classes.money, classes.billVAT)}>
                      <Typography variant="body1">VAT:</Typography>
                      <Typography
                        variant="body1"
                        className={classes.moneyAmount}
                      >
                        10%
                      </Typography>
                    </Box>
                    <Box className={classes.line}></Box>
                    <Box className={classes.payment}>
                      <Typography
                        variant="body1"
                        className={classes.paymentText}
                      >
                        Phải thanh toán
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.paymentAmount}
                      >
                        {formatCash(totalAmount*11/10)}
                        đ
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Paper>
            <Paper elevation={1} className={classes.orderPaper} square={false}>
              <Typography variant="body1" className={classes.titleMenu}>
                Ghi chú:
              </Typography>
              <Box style={{ width: "100%", margin: "15px 0 25px 0" }}></Box>
              <Grid item={true} xs={8} style={{ width: "100%" }}>
                <OutlinedInput
                  placeholder="Yêu cầu đặc biệt để chúng tôi phục vụ bạn tốt nhất"
                  rows={5}
                  className={clsx(classes.textArea, classes.textBox)}
                  fullWidth={true}
                  multiline={true}
                  inputProps={{
                    className: clsx(classes.textNote, classes.takeNote),
                  }}
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
                  onClick={onContinue}
                  disabled={selectedDate&&selectedTime ? false : true}
                >
                  Tiếp tục
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Dialog
        open={openDate}
        onClose={() => {
          setOpenDate(false);
        }}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
        PaperProps={{
          style: { top: "203px", left: "138px", transformOrigin: "0px 0px" },
          className: classes.paperDialog,
        }}
      >
        <Box className="boxDate">
          <DatePicker //open={openDate}
            //renderDay={() => {}}
            //format="EEEEEE, dd/MM"
            disableToolbar
            variant="static"
            value={selectedDate}
            onChange={onChangeDate}
            disablePast={true}
            leftArrowButtonProps={{ classes: { root: classes.btnLeftArrow } }}
            rightArrowButtonProps={{ classes: { root: classes.btnRightArrow } }}
          />
        </Box>
      </Dialog>
      <Dialog
        open={openHour}
        onClose={() => {
          setOpenHour(false);
        }}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
        PaperProps={{
          style: { top: "203px", left: "288px", transformOrigin: "0px 0px" },
          className: classes.paperDialog,
        }}
      >
        <Box className="boxDate">
          <TimePicker //open={openDate}
            disableToolbar
            variant="static"
            ampm={false}
            value={selectedTime}
            minutesStep={15}
            onChange={onChangeTime}
            disablePast={true}
            leftArrowButtonProps={{ classes: { root: classes.btnLeftArrow } }}
            rightArrowButtonProps={{ classes: { root: classes.btnRightArrow } }}
          />
        </Box>
      </Dialog>

      <Menu
        onShow={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
      />
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
    background: "#D4D5D8",
    "&:before": {
      borderLeftColor: "#D4D5D8 !important",
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
  },
  titleDetail: {
    width: "100%",
    fontSize: "24px",
    fontWeight: "600",
  },
  timeSchedule: {
    width: "100%",
    margin: "16px 0 36px 0",
    textAlign: "left",
    fontSize: "14px!important",
    fontWeight: "400!important",
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
  },
  inputText: {
    padding: "16px 0 16px 8px",
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
    flexDirection: "column",
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
    paddingLeft: "36px",
    paddingRight: "36px",
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

export default Schedule;
