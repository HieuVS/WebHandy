import React from "react";
import { forwardRef, useState } from "react";
import {  Box, Tabs, Typography, SvgIcon, Tab, InputAdornment, IconButton, OutlinedInput, CardMedia, Button } from "@material-ui/core";
import {  makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import OrderDialog from "./OrderDialog";
import RateDialog from "./RateDialog";
import IconArrowLeft from "theme/Icon/IconArrowLeft";
import IconArrowRight from "theme/Icon/IconArrowRight";

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
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [item, setItem] = useState();
  const [hasPreOrder, setHasPreOrder] = useState(false);
  const [preOrderItem, setPreOrderItem] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") {
      setShowModal(false);
    }
    setShowModal(false);
  };

  const handleOrderDialog = () => {
    setShowOrder(true);
  };

  const onGetItem = (hasOrNot) => {
    setHasPreOrder(hasOrNot);
    setOpenOrderDialog(false);
  };

  const onGetBill = (item) => {
    //const productItem = JSON.parse(JSON.stringify(item))
    setPreOrderItem(item);
    //const product = Object.assign({}, item);
    //console.log(productItem)
    console.log("tesy: ", preOrderItem);
  };
  console.log(": ", preOrderItem);

  return (
    <React.Fragment>
      <Box id="detail-tabpanel-1">
        <Box className={classes.orderBox}>
          <Box className={classes.orderHeaderBox}>
            <Box className={classes.innerTitleBox}>
              <Box
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
              >
                <Typography variant="body1" className={classes.titleText}>
                  2. Thông tin
                </Typography>
              </Box>
            </Box>
          </Box>
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
                label="Danh mục 11"
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
                  <Typography
                    variant="h4"
                    component="h4"
                    className={classes.titleCategory}
                  >
                    Danh mục 11
                  </Typography>
                  <Box className={classes.listProduct}>
                    <Box className={classes.productItem}>
                      <Box className={classes.items}>
                        <CardMedia
                          className={classes.imgItem}
                          component="img"
                          src="https://api.gboss.ml/attachment/image/2/1640316229641-20210623_185840.JPG"
                        ></CardMedia>
                        <Box className={classes.infoItem}>
                          <Box className={classes.titleInfo}>
                            <Typography
                              variant="body1"
                              className={classes.titleItem}
                            >
                              Hàng hóa 2
                            </Typography>
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
                                className={clsx(
                                  classes.iconPoint,
                                  classes.point
                                )}
                              >
                                0
                              </Typography>
                              <Box className={classes.partition}></Box>
                              <Button
                                onClick={handleModal}
                                label="true"
                                className={clsx(
                                  classes.btnRate,
                                  classes.btnRoot
                                )}
                              >
                                0 đánh giá
                              </Button>
                            </Box>
                          </Box>
                          <Box className={classes.orderInfo}>
                            <Typography
                              variant="body1"
                              className={classes.price}
                            >
                              200.000đ
                            </Typography>
                            <Button
                              onClick={handleOrderDialog}
                              variant="text"
                              className={classes.btnAddItem}
                              children={
                                <SvgIcon>
                                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                </SvgIcon>
                              }
                            ></Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classes.productItem}>
                      <Box
                        className={classes.items}
                        onClick={handleOrderDialog}
                      >
                        <CardMedia
                          onClick={handleOrderDialog}
                          className={classes.imgItem}
                          component="img"
                          src="https://cons.gboss.ml/images/img-empty-image.png"
                        ></CardMedia>
                        <Box className={classes.infoItem}>
                          <Box className={classes.titleInfo}>
                            <Typography
                              variant="body1"
                              className={classes.titleItem}
                            >
                              Hàng hóa 1
                            </Typography>
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
                                className={clsx(
                                  classes.iconPoint,
                                  classes.point
                                )}
                              >
                                0
                              </Typography>
                              <Box className={classes.partition}></Box>
                              <Button
                                onClick={handleModal}
                                label="true"
                                className={clsx(
                                  classes.btnRate,
                                  classes.btnRoot
                                )}
                              >
                                0 đánh giá
                              </Button>
                            </Box>
                          </Box>
                          <Box className={classes.orderInfo}>
                            <Typography
                              variant="body1"
                              className={classes.price}
                            >
                              100.000đ
                            </Typography>
                            <Button
                              onClick={handleOrderDialog}
                              variant="text"
                              className={classes.btnAddItem}
                              children={
                                <SvgIcon>
                                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                </SvgIcon>
                              }
                            ></Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <OrderDialog
        onOpen={showOrder}
        product={item}
        onGetItem={onGetItem}
        onGetBill={onGetBill}
        onClose={() => {
          setShowOrder(false);
        }}
      />
      <RateDialog onShow={showModal} onClose={handleClose}></RateDialog>
    </React.Fragment>
  );
}

const useStyle = makeStyles((theme) => ({
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
    background: "#D4D5D8",
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
  listProduct: {
    display: "grid",
    gridRowGap: "25px",
    gridColumnGap: "23px",
    gridTemplateRows: "repeat(auto-fill ,minmax(100px, min-content))",
    gridTemplateColumns: "repeat(auto-fill ,minmax(285px, 1fr))",
  },
  productItem: {
    height: "100%",
    minWidth: "260px",
    width: "100%",
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
  imgItem: {
    width: "75px",
    cursor: "pointer",
    height: "75px",
    objectFit: "cover",
  },
  infoItem: {
    width: "100%",
    display: "flex",
    minHeight: "72px",
    marginLeft: "12px",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleInfo: {},
  orderInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleItem: {
    color: "#3e4045",
    cursor: "pointer",
    display: "-webkit-box",
    overflow: "hidden",
    lineHeight: "22px",
    textOverflow: "ellipsis",
    "-webkitBoxOrient": "vertical",
    "-webkitLineClamp": 2,
    fontSize: "16px!important",
    fontWeight: "600!important",
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
    minWidth: "30px",
    borderRadius: "4px",
    textTransform: "none",
    backgroundColor: "#ef5845",
  },
}));

export default Order;