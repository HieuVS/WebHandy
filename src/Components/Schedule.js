import React from "react";
import { useState } from "react";
import { Dialog, Paper, Box, Grid, Typography, SvgIcon, Button, OutlinedInput, InputAdornment, IconButton, CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import clsx from "clsx";
import "../theme/styles/Main.scss";
import Menu from "../Components/Menu";
import format from "date-fns/format";
import viLocale from "date-fns/locale/vi";

function Schedule() {
  const classes = useStyle();
  const inputText = classes.inputText;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState();
  const [openDate, setOpenDate] = useState(false);
  const [openHour, setOpenHour] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [countValue, setCountValue] = useState("");
  const [preOrderItem, setPreOrderItem] = useState([]);

  const formatDate = (date) => {
    const getDay = viLocale.localize.day(date.getDay());
    console.log(getDay);
    let formattedDate = format(date, "cccccc, dd/MM");
    console.log(formattedDate);
    return formattedDate;
  };

  const handleInputCount = (e) => {
    let value = e.target.value;
    let date = new Date();
    if (parseInt(value) > 0 && parseInt(value) < 1001) {
      console.log("State hien tai", countValue);
      setCountValue(value.replace(/\D/, ""));
      setSelectedDate(formatDate(date));
    } else if (value === "") {
      setCountValue("");
    }
    //setSelectedDate(weekday[date.getDay()]);
  };

  const handleDatePicker = () => {
    setOpenDate(true);
    console.log("clicked");
  };

  const handleTimePicker = () => {
    setOpenHour(true);
  };

  const onChangeDate = (date) => {
    if (selectedDate !== "") setSelectedDate(formatDate(date));
  };
  const handleTimeChange = () => {};

  const onOpenMenu = () => {
    setOpenMenu(true);
  };

  const onPreOrder = (item) => {
    setPreOrderItem(item);
    setOpenMenu(false);
  };

  const onContinue = () => {};

  return (
    <React.Fragment>
      <Box role="tabpanel" id="detail-tabpanel-0">
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
              <Paper
                elevation={1}
                className={classes.orderPaper}
                square={false}
              >
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
                    value={countValue}
                    className={clsx(
                      classes.inputPeopleCount,
                      classes.inputFont
                    )}
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
                  <OutlinedInput
                    placeholder="Số trẻ em"
                    fullWidth={true}
                    className={clsx(
                      classes.inputPeopleCount,
                      classes.inputFont
                    )}
                    inputProps={{ className: inputText }}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        className={classes.inputIcon}
                      >
                        <SvgIcon viewBox="0 0 24 24">
                          <circle cx="14.5" cy="10.5" r="1.25"></circle>
                          <circle cx="9.5" cy="10.5" r="1.25"></circle>
                          <path d="M22.94 11.34c-.25-1.51-1.36-2.74-2.81-3.17-.53-1.12-1.28-2.1-2.19-2.91C16.36 3.85 14.28 3 12 3s-4.36.85-5.94 2.26c-.92.81-1.67 1.8-2.19 2.91-1.45.43-2.56 1.65-2.81 3.17-.04.21-.06.43-.06.66 0 .23.02.45.06.66.25 1.51 1.36 2.74 2.81 3.17.52 1.11 1.27 2.09 2.17 2.89C7.62 20.14 9.71 21 12 21s4.38-.86 5.97-2.28c.9-.8 1.65-1.79 2.17-2.89 1.44-.43 2.55-1.65 2.8-3.17.04-.21.06-.43.06-.66 0-.23-.02-.45-.06-.66zM19 14c-.1 0-.19-.02-.29-.03-.2.67-.49 1.29-.86 1.86C16.6 17.74 14.45 19 12 19s-4.6-1.26-5.85-3.17c-.37-.57-.66-1.19-.86-1.86-.1.01-.19.03-.29.03-1.1 0-2-.9-2-2s.9-2 2-2c.1 0 .19.02.29.03.2-.67.49-1.29.86-1.86C7.4 6.26 9.55 5 12 5s4.6 1.26 5.85 3.17c.37.57.66 1.19.86 1.86.1-.01.19-.03.29-.03 1.1 0 2 .9 2 2s-.9 2-2 2zm-7 3c2.01 0 3.74-1.23 4.5-3h-9c.76 1.77 2.49 3 4.5 3z"></path>
                        </SvgIcon>
                      </InputAdornment>
                    }
                  ></OutlinedInput>
                  <Box className={classes.boxTime}>
                    <Grid container>
                      <Grid item xs={6}>
                        <OutlinedInput
                          placeholder="Chọn ngày *"
                          className={clsx(
                            classes.chooseTime,
                            classes.chooseDate
                          )}
                          fullWidth={true}
                          required={true}
                          inputProps={{ className: classes.inputTimePicker }}
                          value={selectedDate}
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
                          className={clsx(
                            classes.chooseTime,
                            classes.chooseDate
                          )}
                          fullWidth={true}
                          required={true}
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
              <Paper
                elevation={1}
                className={classes.orderPaper}
                square={false}
              >
                <Typography className={classes.titleMenu} variant="body1">
                  Chọn dịch vụ đi kèm/đặt trước món
                </Typography>
                <Typography className={classes.titleGuide}>
                  Nhấn vào nút "Chọn" trong bước này để bắt đầu đặt trước những
                  sản phâm và dịch vụ bạn mong muốn. Những sản phẩm và dịch vụ
                  được đặt trước có thể sẽ được tính thêm cước phí đặt cọc.
                </Typography>
                <Button
                  onClick={onOpenMenu}
                  classes={{ contained: classes.contained }}
                  id="product-select-button"
                  className={classes.btnChooseProduct}
                  variant="contained"
                  color="primary"
                >
                  Chọn
                </Button>
                {typeof preOrderItem !== "undefined" &&
                preOrderItem.length > 0 ? (
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
                      <Box className={classes.itemPreOrder}>
                        {console.log(preOrderItem)}
                        <SvgIcon className={classes.preOrderClose}>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </SvgIcon>
                        <Box className={classes.itemImg}>
                          <CardMedia
                            style={{ width: "40px", height: "40px" }}
                            component="img"
                            src="https://api.gboss.ml/attachment/image/2/1640316229641-20210623_185840.JPG"
                          ></CardMedia>
                        </Box>
                        <Box className={classes.detailItem}>
                          <Box className={classes.itemTitle}>
                            <Typography
                              component="h6"
                              variant="subtitle2"
                              className={classes.titleFont}
                            >
                              {preOrderItem[0].name}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            className={classes.itemList}
                          >
                            {preOrderItem[0].attachedItem}
                          </Typography>
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
                            {preOrderItem[0].count} x{preOrderItem[0].amount}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classes.bill}>
                      <Box className={clsx(classes.money, classes.totalMoney)}>
                        <Typography variant="body1">Tổng tiền:</Typography>
                        <Typography
                          variant="body1"
                          className={classes.moneyAmount}
                        >
                          {typeof preOrderItem !== "undefined" &&
                          preOrderItem.length > 0
                            ? preOrderItem[0].priceBill
                            : 0}
                          đ
                        </Typography>
                      </Box>
                      <Box className={clsx(classes.money, classes.billVAT)}>
                        <Typography variant="body1">VAT:</Typography>
                        <Typography
                          variant="body1"
                          className={classes.moneyAmount}
                        >
                          {typeof preOrderItem !== "undefined" &&
                          preOrderItem.length > 0
                            ? preOrderItem[0].vat
                            : 0}
                          đ
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
                          {typeof preOrderItem !== "undefined" &&
                          preOrderItem.length > 0
                            ? preOrderItem[0].payment
                            : 0}
                          đ
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ) : null}
              </Paper>
              <Paper
                elevation={1}
                className={classes.orderPaper}
                square={false}
              >
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
                  >
                    Tiếp tục
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
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
          style: { top: "203px", left: "288px", "transform-origin": "0px 0px" },
          className: classes.paperDialog,
        }}
      >
        <Box className="boxDate">
          <TimePicker //open={openDate}
            disableToolbar
            variant="static"
            value={selectedTime}
            onChange={handleTimeChange}
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
        onPreOrder={onPreOrder}
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
