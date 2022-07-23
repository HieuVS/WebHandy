import React from "react";
import { useState  } from "react";
import { OutlinedInput, Box, Typography, SvgIcon, Button, InputAdornment, makeStyles, CardMedia, } from "@material-ui/core";
import clsx from 'clsx';
import OrderDialog from "./OrderDialog";
import { formatCash } from "utils/formatCash";
import { useSelector } from 'react-redux'


export default function ItemList() {
  const classes = useStyle();
  const items = useSelector(state => state.item);
  const { items: itemList } = items;
  //console.log('itemList: ', itemList);

  
  const appetizer = itemList ? itemList.filter((items)=> items.category==="62d101d59bec899dad2a626a") : [];
  const mainCourse = itemList ? itemList.filter((items)=> items.category==="62d101c59bec899dad2a6269") : [];
  const dessert = itemList ? itemList.filter((items)=> items.category==="62d101e09bec899dad2a626b") : [];
  const drinkItem = itemList ? itemList.filter((items)=> items.category==="62d101ed9bec899dad2a626c") : [];

  const [openOrderDialog, setOpenOrderDialog] = useState({});

  // const onOpenOrderDialog = (id) => {
  //   const item = itemList.filter(item=>item._id === id)[0];
  //   setItem(item);
  //   setOpenOrderDialog(true);
  //   console.log("item Added is: ", item)
  // };
  return (
    <React.Fragment>
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
                                <Button //onClick={handleModal}
                                  label="true"
                                  className={clsx(classes.btnRate, classes.btnRoot)}
                                >
                                  0 đánh giá
                                </Button>
                              </Box>
                              <Box className={classes.orderInfo}>
                                <Box className={classes.boxPrice}>
                                  <Box className={classes.blueBox}></Box>
                                  <Typography
                                    variant="body1"
                                    className={classes.price}
                                  >
                                    {formatCash(item.price)}đ
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box className={classes.btnPickBox}>
                              <Button
                                onClick={() => setOpenOrderDialog({[item._id]:true})}
                                className={classes.btnAddItem}
                              >
                                Chọn
                              </Button>
                            </Box>
                            <OrderDialog
                              onOpen={openOrderDialog[item._id] ? true : false}
                              product={item}
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
                                <Button //onClick={handleModal}
                                  label="true"
                                  className={clsx(classes.btnRate, classes.btnRoot)}
                                >
                                  0 đánh giá
                                </Button>
                              </Box>
                              <Box className={classes.orderInfo}>
                                <Box className={classes.boxPrice}>
                                  <Box className={classes.blueBox}></Box>
                                  <Typography
                                    variant="body1"
                                    className={classes.price}
                                  >
                                    {formatCash(item.price)}đ
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box className={classes.btnPickBox}>
                              <Button
                                onClick={() => setOpenOrderDialog({[item._id]:true})}
                                className={classes.btnAddItem}
                              >
                                Chọn
                              </Button>
                            </Box>
                            <OrderDialog
                              onOpen={openOrderDialog[item._id] ? true : false}
                              product={item}
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
                                <Button //onClick={handleModal}
                                  label="true"
                                  className={clsx(classes.btnRate, classes.btnRoot)}
                                >
                                  0 đánh giá
                                </Button>
                              </Box>
                              <Box className={classes.orderInfo}>
                                <Box className={classes.boxPrice}>
                                  <Box className={classes.blueBox}></Box>
                                  <Typography
                                    variant="body1"
                                    className={classes.price}
                                  >
                                    {formatCash(item.price)}đ
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box className={classes.btnPickBox}>
                              <Button
                                onClick={() => setOpenOrderDialog({[item._id]:true})}
                                className={classes.btnAddItem}
                              >
                                Chọn
                              </Button>
                            </Box>
                            <OrderDialog
                              onOpen={openOrderDialog[item._id] ? true : false}
                              product={item}
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
                                <Button //onClick={handleModal}
                                  label="true"
                                  className={clsx(classes.btnRate, classes.btnRoot)}
                                >
                                  0 đánh giá
                                </Button>
                              </Box>
                              <Box className={classes.orderInfo}>
                                <Box className={classes.boxPrice}>
                                  <Box className={classes.blueBox}></Box>
                                  <Typography
                                    variant="body1"
                                    className={classes.price}
                                  >
                                    {formatCash(item.price)}đ
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box className={classes.btnPickBox}>
                              <Button
                                onClick={() => setOpenOrderDialog({[item._id]:true})}
                                className={classes.btnAddItem}
                              >
                                Chọn
                              </Button>
                            </Box>
                            <OrderDialog
                              onOpen={openOrderDialog[item._id] ? true : false}
                              product={item}
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
                </Box>
              </Box>
            </Box>
            
    </React.Fragment>
  );
}

const useStyle = makeStyles({
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
  mealContainer: {
    marginTop: '16px'
  }
});