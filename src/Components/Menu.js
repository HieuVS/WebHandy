import React from "react";
import { useState, forwardRef } from "react";
import { Dialog, Box, Tabs, Typography, SvgIcon, Button, Tab, makeStyles, IconButton, CardMedia } from "@material-ui/core";
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { formatCash } from "utils/formatCash";
import { useSelector } from 'react-redux'
import ItemList from "./ItemList";
import { imageToBase64 } from "utils/imageToBase64";
import cart from '../theme/images/cart.png'
import store from "redux/store";

const TabScrollButton = forwardRef((props, ref) => {
    const { direction } = props;
    const classes = useStyle();
    return (
        <IconButton
            ref={ref}
            disabled={true}
            className={classes.btnScroll}
        >
            {direction === "left" ?
                (<SvgIcon className={classes.btnArrow}><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path></SvgIcon>) :
                (<SvgIcon className={classes.btnArrow}><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"></path></SvgIcon>)
            }


        </IconButton>
    );
});


function Menu(props) {
  const { onShow, onClose } = props;
  const classes = useStyle();
  
  const [value, setValue] = useState(0);
  //const [item, setItem] = useState();
  const [hasPreOrder, setHasPreOrder] = useState(false);

  const scheduleItem = useSelector(state => state.schedule).items;
  console.log('schedule:', scheduleItem);

  const onClosePreOrder = () => {
    setHasPreOrder(false);
  };

  
  var sum = 0;
  for(let i= 0; i< scheduleItem.length; i++ ) {
    sum += scheduleItem[i].amount
  }
  //console.log("SUMMMMMMM: ", sum);

  const onGetBill = () => {
    store.dispatch({type: 'ADD_PAYMENT', payload: sum});
    onClose();
  };




  return (
    <Dialog open={onShow} onClose={onClose} fullScreen={true} maxWidth="sm">
      <Box className={classes.menuContaniner}>
        <Box className={classes.closeBox}>
          <IconButton onClick={onClose} className={classes.closeBtn}>
            <SvgIcon component={CloseIcon} viewBox="0 0 24 24" />
          </IconButton>
        </Box>
        <Box className={classes.headerMenu}>
          <Box className={classes.titleHeader}>
            <Typography
              component="h3"
              variant="h3"
              className={classes.textHeader}
            >
              Menu
            </Typography>
          </Box>
        </Box>
        <Box className={classes.contentMenu}>
          <Box className={classes.productMenu}>
            <Tabs
              value={value}
              variant="scrollable"
              className={classes.category}
              orientation="horizontal"
              scrollButtons="on"
              ScrollButtonComponent={TabScrollButton}
            >
              <Tab
                label="Danh mục 1"
                className={clsx(classes.btnCategory, classes.titleTab)}
              />
            </Tabs>
            <ItemList />
          </Box>
          <Box className={classes.orderMenu}>
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
            <Box
              className={clsx(
                classes.orderImg,
                !hasPreOrder ? classes.Image : null
              )}
            >
              {typeof scheduleItem !== "undefined" &&
              scheduleItem.length > 0 ? scheduleItem.map((item,index) => 
                <Box className={classes.itemPreOrder} key={index}>
                  <SvgIcon
                    className={classes.preOrderClose}
                    onClick={onClosePreOrder}
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                  </SvgIcon>
                  <Box className={classes.itemImg}>
                    <CardMedia
                      style={{ width: "40px", height: "40px" }}
                      component="img"
                      src={!item.image ? '' : `data:image/png;base64, ${imageToBase64(item.image.data.data)}`}
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
              ) : (
                <CardMedia
                  className={classes.imgOrder}
                  component="img"
                  src={`${cart}`}
                ></CardMedia>
              )}
            </Box>
            <Box className={classes.bill}>
              <Box className={clsx(classes.money, classes.totalMoney)}>
                <Typography variant="body1">Tổng tiền:</Typography>
                <Typography variant="body1" className={classes.moneyAmount}>
                  {typeof scheduleItem !== "undefined" &&
                  scheduleItem.length > 0
                    ? formatCash(sum)
                    : 0}
                  đ
                </Typography>
              </Box>
              <Box className={clsx(classes.money, classes.billVAT)}>
                <Typography variant="body1">VAT:</Typography>
                <Typography variant="body1" className={classes.moneyAmount}>
                  {typeof scheduleItem !== "undefined" &&
                  scheduleItem.length > 0
                    ? '10%'
                    : 0}
                </Typography>
              </Box>
              <Box className={classes.line}></Box>
              <Box className={classes.payment}>
                <Typography variant="body1" className={classes.paymentText}>
                  Phải thanh toán
                </Typography>
                <Typography variant="body1" className={classes.paymentAmount}>
                  {typeof scheduleItem !== "undefined" &&
                  scheduleItem.length > 0
                    ? formatCash(sum*11/10)
                    : 0}
                  đ
                </Typography>
              </Box>
            </Box>
            <Button className={classes.btnOrder} onClick={onGetBill}>
              Đặt trước
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

const useStyle = makeStyles((theme) => ({
  menuContaniner: {
    height: "100%",
    padding: "28px 36px 0",
  },
  closeBox: {
    right: "17px",
    width: "22px",
    height: "22px",
    margin: "8px 0",
    position: "absolute",
    textAlign: "right",
  },
  closeBtn: {
    width: "22px",
    height: "22px",
    padding: "0",
  },
  headerMenu: {
    display: "flex",
    alignItems: "center",
    marginBottom: "54px",
    justifyContent: "center",
  },
  titleHeader: {
    height: "auto",
    textAlign: "center",
  },
  textHeader: {
    color: "#000000",
    height: "inherit",
    lineHeight: "1.5",
  },
  contentMenu: {
    width: "100%",
    height: "calc(100% - 138px)",
    display: "flex",
    padding: "0 40px",
  },
  productMenu: {
    [theme.breakpoints.up("md")]: {
      width: "66.6%",
    },
  },
  orderMenu: {
    width: "33.4%",
    height: "100%",
    display: "flex",
    paddingLeft: "24px",
    flexDirection: "column",
  },
  category: {
    boxShadow: "0 2px 8px 0 rgb(0 0 0 / 10%)",
    marginBottom: "8px",
  },
  btnScroll: {
    width: "48px",
    height: "48px",
  },
  btnArrow: {
    color: "#7F838C",
    width: "16px",
    height: "16px",
  },
  btnCategory: {
    padding: "6px 16px",
    minWidth: "unset",
    textTransform: "unset",
  },
  titleTab: {
    color: "#3e4045",
    opacity: 1,
    //fontWeight: '600,
    fontSize: "16px!important",
    fontWeight: "600!important",
    "&.Mui-selected": {
      color: "#EF5845",
    },
  },
  productCategory: {
    height: "100%",
    padding: "24px 0",
    minHeight: "700px",
    "&>div": {
      height: "100%",
    },
  },
  boxCategory: {},
  innerCategory: {
    width: "100%",
    height: "calc(99% - 36px)",
    padding: "0 24px",
    overflow: "auto",
  },
  inputSearch: {
    border: "1px solid #D4D5D8",
    padding: 0,
    borderRadius: "unset",
  },
  inputFilter: {
    width: "100%",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  inputIcon: {
    width: "40px",
    height: "100%",
    minWidth: "40px",
    maxHeight: "100%",
    minHeight: "30px",
    marginRight: 0,
    justifyContent: "center",
  },
  svgIcon: {
    color: "#979AA1",
    fontSize: "24px",
  },
  inputTextSearch: {
    color: "#3E4045",
    height: "unset",
    padding: "0 20px 0 0",
    fontSize: "14px!important",
    fontWeight: "500!important",
  },
  titleCategory: {
    color: "#3E4045",
    lineHeight: 1.5,
    marginBottom: "24px",
    fontWeight: 600,
    fontSize: "28px",
  },
  listProduct: {
    display: "grid",
    gridRowGap: "8px",
    gridColumnGap: "8px",
    gridTemplateColumns: "repeat(auto-fill ,minmax(260px, 1fr))",
  },
  productItem: {
    minWidth: "260px",
    marginTop: "16px",
    width: "100%",
    height: "fit-content",
  },
  itemsImage: {
    height: "100%",
    display: "flex",
    padding: "12px",
    background: "#fff",
    boxShadow: "0 2px 2px 0 rgb(0 0 0 / 5%)",
    marginBottom: "8px",
    justifyContent: "space-between",
  },
  imgItem: {
    height: "170px",
    maxWidth: "100%",
    minHeight: "127px",
    objectFit: "fill",
  },
  infoItem: {
    height: "fit-content",
    padding: "16px 16px 0px",
  },
  titleInfo: {
    width: "fit-content",
  },
  orderInfo: {},
  boxPrice: {
    height: "38px",
    display: "flex",
    padding: "16px 0 2px",
    justifyContent: "space-between",
  },
  blueBox: {
    color: "#447AFF",
    display: "flex",
    alignItems: "flex-start",
  },

  titleItem: {
    color: "#3e4045",
    width: "fit-content",
    cursor: "pointer",
    display: "-webkit-box",
    overflow: "hidden",
    lineHeight: "22px",
    textOverflow: "ellipsis",
    "-webkitBoxOrient": "vertical",
    "-webkitLineClamp": 2,
    fontSize: "14px",
    fontWeight: "600",
  },
  ratingBox: {
    color: "#3B404C",
    width: "fit-content",
    margin: "4px",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  iconRate: {
    color: "#FEBA40",
    fontSize: "16px",
    marginRight: "4px",
  },
  iconPoint: {
    color: "#3B404C",
    minWidth: "max-content",
  },
  point: {
    fontSize: "12px",
    fontWeight: 400,
  },
  partition: {
    width: "1px",
    height: "14px",
    marginLeft: "6px",
    backgroundColor: "#3B404C",
  },
  btnRoot: {
    // color: '#3E4045',
    // fontSize: '14px',
    // minWidth: '64px',
    // boxSizing: 'border-box',
    // transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    // fontFamily: 'Inter,Roboto,Arial,sans-serif',
    // fontWeight: '700,
    // lineHeight: 'normal',
    // borderRadius: '4px',
    // letterSpacing: '0.4px',
    // textTransform: 'uppercase',
    minWidth: "max-content",
    textTransform: "none",
    justifyContent: "flex-start",
  },
  btnRate: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#3B404C",
    flexGrow: 1,
  },
  price: {
    color: "#3E4045",
    fontSize: "16px!important",
    fontWeight: "600!important",
  },
  btnAddItem: {
    color: "#FFFFFF",
    height: "30px",
    padding: 0,
    fontSize: "14px",
    minWidth: "69px",
    fontWeight: 600,
    borderRadius: "2px",
    textTransform: "none",
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
    //justifyContent: "center",
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
  btnOrder: {
    color: "#FFFFFF",
    width: "132px",
    height: "40px",
    fontSize: "16px",
    alignSelf: "center",
    marginTop: "16px",
    fontWeight: "600",
    borderRadius: "2px",
    textTransform: "inherit",
    backgroundColor: "#EF5845",
  },
  boxImg: {
    cursor: "pointer",
    display: "flex",
    position: "relative",
    textAlign: "center",
    justifyContent: "center",
  },

  btnPickBox: {
    height: "56px",
    padding: "16px",
    textAlign: "center",
  },
}));
export default Menu;

