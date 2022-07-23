import React from "react";
import { forwardRef, useState } from "react";
import {  Box, Tabs, Typography, SvgIcon, Tab, InputAdornment, IconButton, OutlinedInput, CardMedia, Button, Avatar, Paper, Grid } from "@material-ui/core";
import {  makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import OrderDialog from "./OrderDialog";
import RateDialog from "./RateDialog";
import IconArrowLeft from "theme/Icon/IconArrowLeft";
import IconArrowRight from "theme/Icon/IconArrowRight";
import { useSelector } from "react-redux";
import { formatCash } from "utils/formatCash";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import store from "redux/store";
import { postOrder } from '../api/orderApi';

const TabScrollButton = forwardRef((props, ref) => {
    const { direction, ...other } = props;
    const classes = useStyle();
    return (
      <IconButton
        ref={ref}
        disabled={true}
        className={classes.btnScroll}
      >
        { direction === "left" ? ( <IconArrowLeft /> ) : ( <IconArrowRight /> ) }
      </IconButton>
    );
});


function Order() {
  const classes = useStyle();
  const inputText = classes.inputText;
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [openInfo, setOpenInfo] = useState(true);
  const [submitted, setSubmitted] = useState(false)
  const items = useSelector(state => state.item)
  const { items: itemList } = items;
  //console.log('itemList: ', itemList);

  const itemOrder = useSelector(state => state.order).items;
  console.log('itemOrder: ', itemOrder);
  

  const appetizer = itemList ? itemList.filter((items)=> items.category==="62d101d59bec899dad2a626a") : [];
  const mainCourse = itemList ? itemList.filter((items)=> items.category==="62d101c59bec899dad2a6269") : [];
  const dessert = itemList ? itemList.filter((items)=> items.category==="62d101e09bec899dad2a626b") : [];
  const drinkItem = itemList ? itemList.filter((items)=> items.category==="62d101ed9bec899dad2a626c") : [];

  const [openOrderDialog, setOpenOrderDialog] = useState({});

  const info = useSelector(state => state.inputOrder);
  
  console.log('info',info)

  const onFillInfo = () => {
    setOpenInfo(true)
  }

  
  const onSubmit = async () => {
    let itemOrderList = itemOrder.map(item=> {
      delete item.image
      return item
    });

    const orderForm = {
      items: itemOrderList,
      phone: info.customer.phone,
      name: info.customer.name,
      address: info.customer.address,
      isTakeAway: true,
    }
    try {
      const response = await postOrder(orderForm);
      if(!response) {
        console.log("LOI R")
      }
      else {
        localStorage.setItem('Order', JSON.stringify(orderForm))
      }
      } catch (error) {
      console.log('ERROR: ', error)
    }

  };

  const onChangeForm = (event) => {
    store.dispatch({type: 'ADD_INFO_ORDER', payload: {...info.customer, [event.target.name]: event.target.value}} )
  }
  return (
    <React.Fragment>
      <Box id="detail-tabpanel-1">
        <Box className={classes.orderBox}>
          <Box className={classes.orderHeaderBox}>
            <Box className={classes.innerTitleBox}>
              <Box
                onClick={()=>setOpenInfo(false)}
                className={clsx(
                  classes.productBox,
                  classes.title,
                  classes.firstBox
                )}
              >
                <Typography variant="body1" className={classes.titleText}>
                  1. Sản phẩm
                </Typography>
              </Box>
              <Box
                className={clsx(
                  classes.infoBox,
                  classes.title,
                  classes.secondBox
                )}
                style={{background: !openInfo ? "#D4D5D8" : "#6C7078"}}
              >
                <Typography variant="body1" className={classes.titleText}>
                  2. Thông tin
                </Typography>
              </Box>
            </Box>
          </Box>
          {!openInfo ? (
            <Box style={{ width: "100%" }}>
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
              <Box className={classes.productCategory}>
                <Box
                  className={clsx(classes.boxCategory, classes.innerCategory)}
                  id="product_menu_root"
                >
                  <OutlinedInput
                    placeholder="Tìm kiếm"
                    className={clsx(classes.inputSearch, classes.inputFilter)}
                    inputProps={{ className: classes.inputTextSearch }}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        className={classes.inputIcon}
                      >
                        <SvgIcon viewBox="0 0 24 24" className={classes.svgIcon}>
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                        </SvgIcon>
                      </InputAdornment>
                    }
                  ></OutlinedInput>
                  <Box style={{ marginTop: "unset" }}>
                    {/* <Box className={classes.listProduct}> */}
                    <Box className={classes.mealContainer}>
                      <Box className={classes.mealTitle}>
                        <Typography  variant="h4">Khai vị</Typography>
                      </Box>
                      <Box className={classes.listProduct}>
                        {
                          appetizer.map(item => {
                            const base64String = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                              return data + String.fromCharCode(byte);
                            }, ''));
                            //console.log("Re-render");
                            return (
                              <Box className={classes.productItem} key={item._id}> 
                              <Box className={classes.boxImg}>
                                <CardMedia
                                  className={classes.imgItem}
                                  component="img"
                                  src={`data:image/png;base64,${base64String}`}
                                ></CardMedia>
                              </Box>
                              <Box className={classes.infoItem}>
                                <Box className={classes.titleInfo}>
                                  <Typography
                                    variant="body1"
                                    className={classes.titleItem}
                                  >
                                    {item.name}
                                  </Typography>
                                </Box>
                                <Box className={classes.ratingBox}>
                                  <SvgIcon
                                    className={classes.iconRate}
                                    focusable={false}
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                  </SvgIcon>
                                  <Typography
                                    className={clsx(classes.iconPoint, classes.point)}
                                  >
                                    0
                                  </Typography>
                                  <Box className={classes.partition}></Box>
                                  <Button onClick={()=>setShowModal(true)}
                                    label="true"
                                    className={clsx(classes.btnRate, classes.btnRoot)}
                                  >
                                    0 đánh giá
                                  </Button>
                                </Box>
                                <Box>
                                  <Box className={classes.boxPrice}>                                  
                                    <Box className={classes.btnPickBox}>
                                      <Button
                                        onClick={() => setOpenOrderDialog({[item._id]:true})}
                                        className={classes.btnAddItem}
                                      >
                                        <SvgIcon>
                                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                        </SvgIcon>
                                      </Button>
                                    </Box>
                                    <Typography
                                      variant="body1"
                                      className={classes.price}
                                    >
                                      {formatCash(item.price)}đ
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <OrderDialog
                                onOpen={openOrderDialog[item._id] ? true : false}
                                product={item}
                                type='order'
                                onClose={() => 
                                setOpenOrderDialog({[item._id]: false})
                                }
                              />
                            </Box>
                            )
                          })
                        }            
                      </Box>
                    </Box>
                    <Box className={classes.mealContainer}>
                      <Box className={classes.mealTitle}>
                        <Typography  variant="h4">Món chính</Typography>
                      </Box>
                      <Box className={classes.listProduct}>
                        {
                          mainCourse.map(item => {
                            const base64String = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                              return data + String.fromCharCode(byte);
                            }, ''));
                            //console.log("Re-render");
                            return (
                              <Box className={classes.productItem} key={item._id}> 
                              <Box className={classes.boxImg}>
                                <CardMedia
                                  className={classes.imgItem}
                                  component="img"
                                  src={`data:image/png;base64,${base64String}`}
                                ></CardMedia>
                              </Box>
                              <Box className={classes.infoItem}>
                                <Box className={classes.titleInfo}>
                                  <Typography
                                    variant="body1"
                                    className={classes.titleItem}
                                  >
                                    {item.name}
                                  </Typography>
                                </Box>
                                <Box className={classes.ratingBox}>
                                  <SvgIcon
                                    className={classes.iconRate}
                                    focusable={false}
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                  </SvgIcon>
                                  <Typography
                                    className={clsx(classes.iconPoint, classes.point)}
                                  >
                                    0
                                  </Typography>
                                  <Box className={classes.partition}></Box>
                                  <Button onClick={()=>setShowModal(true)}
                                    label="true"
                                    className={clsx(classes.btnRate, classes.btnRoot)}
                                  >
                                    0 đánh giá
                                  </Button>
                                </Box>
                                <Box>
                                  <Box className={classes.boxPrice}>
                                    <Box className={classes.btnPickBox}>
                                      <Button
                                        onClick={() => setOpenOrderDialog({[item._id]:true})}
                                        className={classes.btnAddItem}
                                      >
                                        <SvgIcon>
                                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                        </SvgIcon>
                                      </Button>
                                    </Box>
                                    <Typography
                                      variant="body1"
                                      className={classes.price}
                                    >
                                      {formatCash(item.price)}đ
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <OrderDialog
                                onOpen={openOrderDialog[item._id] ? true : false}
                                product={item}
                                type='order'
                                onClose={() => 
                                setOpenOrderDialog({[item._id]: false})
                                }
                              />
                            </Box>
                            )
                          })
                        }            
                      </Box>
                    </Box>
                    <Box className={classes.mealContainer}>
                      <Box className={classes.mealTitle}>
                        <Typography  variant="h4">Tráng miệng</Typography>
                      </Box>
                      <Box className={classes.listProduct}>
                        {
                          dessert.map(item => {
                            const base64String = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                              return data + String.fromCharCode(byte);
                            }, ''));
                            //console.log("Re-render");
                            return (
                              <Box className={classes.productItem} key={item._id}> 
                              <Box className={classes.boxImg}>
                                <CardMedia
                                  className={classes.imgItem}
                                  component="img"
                                  src={`data:image/png;base64,${base64String}`}
                                ></CardMedia>
                              </Box>
                              <Box className={classes.infoItem}>
                                <Box className={classes.titleInfo}>
                                  <Typography
                                    variant="body1"
                                    className={classes.titleItem}
                                  >
                                    {item.name}
                                  </Typography>
                                </Box>
                                <Box className={classes.ratingBox}>
                                  <SvgIcon
                                    className={classes.iconRate}
                                    focusable={false}
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                  </SvgIcon>
                                  <Typography
                                    className={clsx(classes.iconPoint, classes.point)}
                                  >
                                    0
                                  </Typography>
                                  <Box className={classes.partition}></Box>
                                  <Button onClick={()=>setShowModal(true)}
                                    label="true"
                                    className={clsx(classes.btnRate, classes.btnRoot)}
                                  >
                                    0 đánh giá
                                  </Button>
                                </Box>
                                <Box>
                                  <Box className={classes.boxPrice}>
                                    <Box className={classes.btnPickBox}>
                                      <Button
                                        onClick={() => setOpenOrderDialog({[item._id]:true})}
                                        className={classes.btnAddItem}
                                      >
                                        <SvgIcon>
                                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                        </SvgIcon>
                                      </Button>
                                    </Box>
                                    <Typography
                                      variant="body1"
                                      className={classes.price}
                                    >
                                      {formatCash(item.price)}đ
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <OrderDialog
                                onOpen={openOrderDialog[item._id] ? true : false}
                                product={item}
                                type='order'
                                onClose={() => 
                                setOpenOrderDialog({[item._id]: false})
                                }
                              />
                            </Box>
                            )
                          })
                        }            
                      </Box>
                    </Box>
                    <Box className={classes.mealContainer}>
                      <Box className={classes.mealTitle}>
                        <Typography  variant="h4">Đồ uống</Typography>
                      </Box>
                      <Box className={classes.listProduct}>
                        {
                          drinkItem.map(item => {
                            const base64String = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                              return data + String.fromCharCode(byte);
                            }, ''));
                            //console.log("Re-render");
                            return (
                              <Box className={classes.productItem} key={item._id}> 
                              <Box className={classes.boxImg}>
                                <CardMedia
                                  className={classes.imgItem}
                                  component="img"
                                  src={`data:image/png;base64,${base64String}`}
                                ></CardMedia>
                              </Box>
                              <Box className={classes.infoItem}>
                                <Box className={classes.titleInfo}>
                                  <Typography
                                    variant="body1"
                                    className={classes.titleItem}
                                  >
                                    {item.name}
                                  </Typography>
                                </Box>
                                <Box className={classes.ratingBox}>
                                  <SvgIcon
                                    className={classes.iconRate}
                                    focusable={false}
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                  </SvgIcon>
                                  <Typography
                                    className={clsx(classes.iconPoint, classes.point)}
                                  >
                                    0
                                  </Typography>
                                  <Box className={classes.partition}></Box>
                                  <Button onClick={()=>setShowModal(true)}
                                    label="true"
                                    className={clsx(classes.btnRate, classes.btnRoot)}
                                  >
                                    0 đánh giá
                                  </Button>
                                </Box>
                                <Box>
                                  <Box className={classes.boxPrice}>
                                    <Box className={classes.btnPickBox}>
                                      <Button
                                        onClick={() => setOpenOrderDialog({[item._id]:true})}
                                        className={classes.btnAddItem}
                                      >
                                        <SvgIcon>
                                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                        </SvgIcon>
                                      </Button>
                                    </Box>
                                    <Typography
                                      variant="body1"
                                      className={classes.price}
                                    >
                                      {formatCash(item.price)}đ
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <OrderDialog
                                onOpen={openOrderDialog[item._id] ? true : false}
                                product={item}
                                type='order'
                                onClose={() => 
                                setOpenOrderDialog({[item._id]: false})
                                }
                              />
                            </Box>
                            )
                          })
                        }            
                      </Box>
                    {/* </Box>  */}
                  </Box>
                </Box>
              </Box>
              </Box>
            </Box>  
          ) : (
            <Box style={{ width: "100%" }}>
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
                  required={true}
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
                  onClick={onSubmit}
                >
                  Xác nhận
                </Button>
              </Box>
            </Grid>
          </Grid>
            </Box>
          )}
      </Box>
      </Box>
      <RateDialog onShow={showModal} onClose={()=>setShowModal(false)}></RateDialog>
      <Avatar
        onClick={onFillInfo}
        style={{visibility: itemOrder.length!==0 ? 'visible' : "hidden"}}
        className={classes.btnCart} 
        children={<ShoppingCartOutlinedIcon 
        className={classes.iconCart}/>} variant='circular'>
      </Avatar>
    </React.Fragment>
  );
}

const useStyle = makeStyles((openInfo) => ({
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
  boxPrice: {
    height: "38px",
    display: "flex",
    padding: "16px 0 2px",
    justifyContent: "space-between",
    alignItems: 'center'
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
    minWidth: "30px",
    fontWeight: 600,
    borderRadius: "2px",
    textTransform: "none",
    backgroundColor: "#ef5845",
  },
  orderBox: {
    width: "100%",
    margin: "0 auto",
    display: "flex",
    position: "relative",
    borderRadius: "unset",
    flexDirection: "column",
  },
  orderHeaderBox: {
    width: "100%",
    marginBottom: "25px",
  },
  innerTitleBox: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(20px, 1fr))",
  },
  productBox: {
    height: "40px",
    zIndex: 5,
    position: "relative",
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
  title: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px!important",
    fontWeight: "600!important",
  },
  firstBox: {
    cursor: "pointer",
    background: "#6C7078",
    "&::before": {
      borderLeftColor: "#6C7078 !important",
    },
  },
  infoBox: {
    height: "40px",
    zIndex: 3,
    position: "relative",
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
  secondBox: {
    //background: openInfo ? "#D4D5D8" : "#6C7078",
  },
  titleText: {
    color: "#fff",
    fontSize: "inherit",
    fontWeight: "inherit",
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
    //fontWeight: 600,
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
  },
  items: {
    height: "100%",
    display: "flex",
    padding: "12px",
    background: "#fff",
    boxShadow: "0 2px 2px 0 rgb(0 0 0 / 5%)",
    marginBottom: "8px",
    justifyContent: "space-between",
  },
  mealContainer: {
    marginTop: '16px'
  },
  btnCart: {
    //border: '1px solid #000',
    position: 'fixed',
    cursor: 'pointer',
    textAlign: 'center',
    color: '#fff',
    padding: '5px',
    right: '10px',
    top: '80%',
    zIndex: 11,
  },
  iconCart: {
    color: 'red'
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
}));

export default Order;