import React from "react";
import { useState, useEffect } from "react";
import {  Dialog, DialogTitle, SvgIcon, Box, Typography, Button, CardMedia, IconButton, OutlinedInput, Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { formatCash } from "utils/formatCash";
import { imageToBase64 } from '../utils/imageToBase64';
import store from "redux/store";

const CustomDot = () => {
  const classes = useStyle();
  return <Box className={classes.customDot}></Box>;
};

function OrderDialog(props) {
  const { onOpen, onClose, product, ...other } = props;

  const classes = useStyle();
  const productItem = Object.assign({}, product);
  //console.log('productItem', productItem)

  //const [amount, setAmount] = useState(productItem.price);
  const [count, setCount] = useState(1);
  //const [priceItems, setPriceItems] = useState(money);
  const [item, setItem] = useState({
    name: productItem ? productItem.name : '',
    quantity: 1,
    price: productItem ? productItem.price : Number,
    amount: productItem ? productItem.price : Number,
    image: productItem.image
  });


  const onChangeCount = (event) => {
    let value = event.target.value;
    if (parseInt(value) > 0 && parseInt(value) < 100) {
      setCount(value.replace(/\D/, ""));
    } else if (value === "") {
      setCount(1);
    }
    //setAmount(parseInt(value)*productItem.price)
    setItem({...item, amount: parseInt(value)*productItem.price, quantity: value })
  };
  //console.log('ITEM:', item)
  const onIncrease = () => {
    if(count<100) 
    {
      setCount(parseInt(count)+1)
      //setAmount((parseInt(count)+1)*productItem.price)
      setItem({...item, amount: (parseInt(count)+1)*productItem.price, quantity: parseInt(count)+1 })

    }
  }

  const onDecrease= () => {
    if(count > 1) {
      setCount(count-1)
       //setAmount((parseInt(count)-1)*productItem.price)
      setItem({...item, amount: (parseInt(count)-1)*productItem.price, quantity: parseInt(count)-1 })
    }
  }

  const onAddItem = () => {

    store.dispatch({type: 'ADD_ITEM_SCHEDULE', payload: item})
    onClose();
  };

  
  return (
    <React.Fragment>
      <Dialog
        open={onOpen}
        onClose={onClose}
        PaperProps={{ className: classes.orderDialog }}
      >
        <DialogTitle style={{ width: 0, padding: 0 }}></DialogTitle>
          <CardMedia
            component="img"
            src={!productItem.image ? '' : `data:image/png;base64, ${imageToBase64(productItem.image.data.data)}`}
            className={classes.imgCarosel}
          ></CardMedia>
        <Box className={classes.detailOrder}>
          <Typography variant="h5" className={classes.itemName}>
            {productItem.name}
          </Typography>
          <Box className={classes.rating}>
            <SvgIcon
              className={classes.iconRate}
              focusable={false}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </SvgIcon>
            <Typography className={classes.iconPoint}>0</Typography>
            <Box className={classes.partition}></Box>
            <Button
              label="true"
              className={clsx(classes.btnRate, classes.btnRoot)}
            >
              0 đánh giá
            </Button>
          </Box>
          <Typography variant="h4" className={classes.price}>
            {formatCash(productItem.price)}đ
          </Typography>
          <Typography
            variant="body1"
            className={classes.hiddenText}
          ></Typography>
          <Box className={classes.selectedItem}>
            <Box className={classes.promptBox}>
              <Box>
                <Box className={classes.boxDes}>
                  <SvgIcon className={classes.iconPrompt}>
                    <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
                  </SvgIcon>
                  <Typography
                    className={classes.titlePrompt}
                    color="inherit"
                    variant="body1"
                  >
                    Mô tả
                  </Typography>
                </Box>
                <Typography className={classes.contentDes}>{productItem.description}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.totalMoney}>
          <Box className={classes.totleBill}>
            <Typography variant="body1" className={classes.mediumSmTxt}>
              Thành tiền
            </Typography>
            <Typography variant="h5" component="h5">
              {formatCash(item.amount)}đ
            </Typography>
          </Box>
          <Box className={classes.amount}>
            <Box className={classes.amountBox}>
              <IconButton className={classes.btnSubPlus} onClick={onDecrease}>
                <SvgIcon>
                  <path d="M19 13H5v-2h14v2z"></path>
                </SvgIcon>
              </IconButton>
              <OutlinedInput
                className={classes.inputAmount}
                value={count}
                onChange={onChangeCount}
              ></OutlinedInput>
              <IconButton className={classes.btnSubPlus} onClick={onIncrease}>
                <SvgIcon>
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                </SvgIcon>
              </IconButton>
            </Box>
            <Button
              className={classes.btnAddPrice}
              onClick={() => {
                onAddItem();
              }}
              variant="contained"
              color="primary"
            >
              Thêm
            </Button>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

const useStyle = makeStyles({
  orderDialog: {
    height: "100%",
    position: "relative",
    minWidth: "620px",
    maxHeight: "665px",
    '&::-webkit-scrollbar': {
      width: '10px',
      background: '#888',
      borderRadius: '10px',
      //height: '80%'
    }
  },
  reactMultiCarouselList: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  detailOrder: {
    display: "flex",
    padding: "16px 24px 0 24px",
    alignItems: "center",
    flexDirection: "column",
  },
  totalMoney: {
    width: "100%",
    bottom: 0,
    display: "flex",
    padding: "12px 36px",
    zIndex: 1500,
    position: "sticky",
    boxShadow: "2px 0 8px 0 rgb(0 0 0 / 16%)",
    marginTop: "auto",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  itemName: {
    width: "100%",
    textAlign: "center",
    fontWeight: 600,
    "-webkit-line-clamp": 2,
  },
  rating: {
    color: "#3B404C",
    width: "fit-content",
    margin: "4px",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  iconRate: {
    color: "#FEBA40",
    fontSize: "24px",
    marginRight: "4px",
  },
  iconPoint: {
    color: "#3B404C",
    minWidth: "max-content",
  },
  partition: {
    width: "2px",
    height: "14px",
    marginLeft: "6px",
    backgroundColor: "#3B404C",
  },
  btnRoot: {
    color: "#3E4045",
    fontSize: "14px",
    minWidth: "64px",
    boxSizing: "border-box",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    fontFamily: "Inter,Roboto,Arial,sans-serif",
    fontWeight: 700,
    lineHeight: "normal",
    borderRadius: "4px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  },
  btnRate: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#3B404C",
    flexGrow: 1,
    minWidth: "max-content",
    textTransform: "none",
    justifyContent: "flex-start",
  },
  price: {
    marginTop: "8px",
    textAlign: "center",
  },
  hiddenText: {
    marginTop: "24px",
    textAlign: "center",
    "-webkit-line-clamp": 4,
  },
  selectedItem: {
    padding: "20px 20px",
    backgroundColor: "#FAFAFB",
    width: '70%'
  },
  promptBox: {
    color: "#6c7078",
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
  },
  itemBox: {
    display: "flex",
    padding: "12px",
    background: "#fff",
    boxShadow: "0 2px 2px 0 rgb(0 0 0 / 15%)",
    marginBottom: "8px",
    justifyContent: "space-between",
  },
  boxDes: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPrompt: {
    color: "#6C7078",
    width: "36px",
    height: "36px",
    display: "flex",
    boxShadow: "1px 0 4px 0 rgb(0 0 0 / 16%)",
    alignItems: "center",
    marginRight: "14px",
    borderRadius: "50%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  contentDes: {
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titlePrompt: {
    fontSize: "16px!important",
    fontWeight: "700!important",
  },
  imgItem: {
    width: "40px",
    height: "40px",
  },
  itemDetail: {
    width: "100%",
    minHeight: "72px",
    marginLeft: "12px",
  },
  productName: {
    width: "100%",
    cursor: "pointer",
    marginBottom: "4px",
    "-webkit-line-clamp": 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
  },
  textName: {
    fontSize: "14px!important",
    fontWeight: "500!important",
  },
  checkBox: {
    height: "fit-content",
  },
  productPrice: {
    color: "#3E4045",
  },
  textPrice: {
    fontSize: "16px!important",
    fontWeight: "600!important",
  },
  mediumSmTxt: {
    fontSize: "12px!important",
    fontWeight: "500!important",
  },
  amount: {
    display: "flex",
  },
  amountBox: {
    display: "flex",
    marginRight: "16px",
  },
  btnSubPlus: {
    color: "#fff",
    width: "40px",
    height: "40px",
    borderRadius: "2px",
    backgroundColor: "#D4D5D8",
  },
  inputAmount: {
    width: "70px",
    height: "40px",
    borderRadius: 0,
    "&>input": {
      padding: "6px 2px",
      textAlign: "center",
      fontSize: "20px!important",
      fontWeight: "500!important",
    },
  },
  btnAddPrice: {
    width: "110px",
    height: "40px",
    borderRadius: "4px",
    letterSpacing: "0.1px",
    textTransform: "none",
  },
  imgCarosel: {
    width: "100%",
    height: "320px",
    objectFit: "fill",
  },
  customDot: {
    width: "8px",
    height: "8px",
    margin: "8px",
    opacity: 0.8,
    background: "#D4D5D8",
    borderRadius: "4px",
  },
  // 'MuiButton-containedPrimary': {
  //     color: '#FFFFFF',
  //     backgroundColor: '#EF5845'
  // }
});

const responsive = {
  deskTop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default OrderDialog;