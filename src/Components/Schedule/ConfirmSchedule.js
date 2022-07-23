import React from "react";
import { useState } from "react";
import { Box, Typography, List, ListItem, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatCash } from "utils/formatCash";
import clsx from "clsx";
import "../../theme/styles/Main.scss";
import { formatDateConfirm } from "utils/formatDate";

function ConfirmSchedule({ setTab }) {
  const classes = useStyle();
  const myData = JSON.parse(localStorage.getItem('Schedule'));
  console.log(myData)

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
        <Box className={classes.boxAddItem}>
          <Box className={classes.titlePay}>
            <Typography variant="h6">Danh sách sản phẩm</Typography>
          </Box>
          <List className={classes.listItem}>
            <ListItem>
              <Grid container spacing={2} style={{ padding: "8px" }}>
                <Grid item md={4}>
                  <Typography>Tên sản phẩm</Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography>Số lượng</Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography>Giá tiền</Typography>
                </Grid>
              </Grid>
            </ListItem>
            {myData.items.map((item, index) => (
                  <ListItem key={index}>
                    <Grid className={classes.itemList} container spacing={2}>
                      <Grid item md={4}>
                        <Typography>{item.name}</Typography>
                      </Grid>
                      <Grid item md={4} className={classes.amountBox}>
                        <Typography className={classes.inputAmount}>
                          {item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <Typography>{formatCash(item.amount)}đ</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))
              }
            <Box className={classes.boxAmount}>
              <Typography variant="h6">Tạm tính</Typography>              
              <Typography variant="h6">{formatCash(myData.totalAmount*10/11)}đ</Typography>
            </Box>
            {
              <Box>
                <Box className={classes.boxAmount}>
                  <Typography variant="h6">Thuế</Typography>
                  <Typography variant="h6">10%</Typography>
                </Box>
                <Box className={classes.boxAmount}>
                  <Typography variant="h6">Thành Tiền</Typography>
                  <Typography variant="h6">{formatCash(myData.totalAmount)}đ</Typography>
                </Box>     
                <Box className={classes.boxAmount}>
                  <Typography variant="h6">Tổng tiền cần thanh toán</Typography>
                  <Typography variant="h6">{formatCash(myData.totalAmount)}đ</Typography>
                </Box>
              </Box>
            }
          </List>
          <Box className={classes.timeSchedule}>
            <Box className={classes.titlePay}>
              <Typography variant="h6">Thời gian đặt bàn</Typography>
            </Box>
            <Box className={classes.titlePay}>
              <Typography variant="h6">{formatDateConfirm(myData.table.startAt)}</Typography>
            </Box>
          </Box>
          <Box className={classes.timeSchedule}>
            <Box className={classes.titlePay}>
              <Typography variant="h4" className={classes.thankyou}>Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

const useStyle = makeStyles(() => ({
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
    background: "#6C7078",
  },
  titleText: {
    color: "#fff",
    // fontSize: 'inherit',
    // fontWeight: 'inherit',
    fontSize: "12px!important",
    fontWeight: "600!important",
  },
  boxAddItem: {
    padding: "16px",
    minHeight: '700px'
  },
  dialogTitle: {
    backgroundColor: "#20B2AA",
    display: "flex",
    justifyContent: "center",
  },
  titlePay: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: ' flex',
    justifyContent: 'center',
    marginTop: '10px'
  },
  listItem: {
    paddingLeft: '15%'
  },
  itemList: {
    paddingLeft: '8px',
    paddingRight: '8px'
  },
  boxAmount: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '15px',
    marginLeft: '18px',
    justifyContent: 'space-between',
    maxWidth: '75%'
  },
  timeSchedule: {
    marginTop: '20px',
    width: '100%'
  },
  thankyou: {
    textAlign: 'center'
  }
}));

export default ConfirmSchedule;
