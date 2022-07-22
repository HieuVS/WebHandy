import React from "react";
import { useState, useEffect } from "react";
import {  Dialog, DialogTitle, SvgIcon, Box, Typography, Button, CardMedia, Checkbox, IconButton, OutlinedInput } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { formatCash } from "utils/formatCash";


const CustomDot = () => {
  const classes = useStyle();
  return <Box className={classes.customDot}></Box>;
};
const attachItem = [
  {
    id: 0,
    name: "Hàng hoá 1",
    price: 100000,
    srcImage: "https://cons.gboss.ml/images/img-empty-image.png",
  },
  {
    id: 1,
    name: "Hàng hoá 2",
    price: 200000,
    srcImage: "https://cons.gboss.ml/images/img-empty-image.png",
  },
];
function OrderDialog(props) {
  const { onOpen, onClose, product, ...other } = props;

  const classes = useStyle();
  const productItem = Object.assign({}, product);
  const formatPrice = formatCash(productItem.price);
  const money = productItem.price;

  const [showModal, setShowModal] = useState(false);
  const [checkedItem, setCheckedItem] = useState(
    new Array(attachItem.length).fill(false)
  );
  const [amount, setAmount] = useState();
  const [count, setCount] = useState(1);
  const [priceItems, setPriceItems] = useState(money);
  const [addBill, setAddBill] = useState([]);

  useEffect(() => {
    setAmount(productItem.price);
    setPriceItems(productItem.price);
    //console.log("re-Render", amount)
  }, [productItem.price]);

  useEffect(() => {
    setPriceItems(amount * count);
  }, [amount]);

  const handleModal = () => {
    setShowModal(true);
  };

  const onCheckedItem = (position) => {
    const updateCheckedState = checkedItem.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedItem(updateCheckedState);

    const totalAmount = updateCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState) {
          return sum + attachItem[index].price;
        }
        return sum;
      },
      productItem.price
    );
    setAmount(totalAmount);
  };

  const onChangeCount = (event) => {
    let value = event.target.value;
    if (parseInt(value) > 0 && parseInt(value) < 1001) {
      setCount(value.replace(/\D/, ""));
    } else if (value === "") {
      setCount("");
    }
    setPriceItems(amount * value);
    //console.log("count: ",count)
  };

  const onIncrease = () => {
    if (count < 999) {
      setCount(count + 1);
    }
    //console.log(count)
    setPriceItems(amount * (count + 1));
  };

  const onDecrease = () => {
    if (count > 1) setCount(count - 1);
    setPriceItems(amount * (count - 1));
  };
  const onAddItem = () => {
    props.onGetItem(true);
    //props.open = false;
  };

  const onPayment = () => {
    let arrayOfItems = [];
    arrayOfItems.push({
      item: productItem.name,
      attachedItem: [attachItem[checkedItem.indexOf(true)].name],
      count,
      amount,
      priceItems,
      vat: priceItems * 0.09,
      payment: priceItems * 1.09,
    });
    //setAddBill(arrayOFItems)
    props.onGetBill(arrayOfItems);
    //console.log("item duoc add la: ",arrayOFItems)
  };

  //console.log("tesstL: ",checkedItem)
  return (
    <React.Fragment>
      <Dialog
        open={onOpen}
        onClose={onClose}
        PaperProps={{ className: classes.orderDialog }}
      >
        <DialogTitle style={{ width: 0, padding: 0 }}></DialogTitle>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          arrows={false}
          showDots={true}
          dotListClass="backgroundColor: '#EF5845'"
          customDot={<CustomDot />}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <iframe
              frameBorder="0"
              allowFullScreen="1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="YouTube video player"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/fjnsranSObI?autoplay=0&amp;mute=0&amp;controls=0&amp;start=1486&amp;origin=https%3A%2F%2Fcons.gboss.ml&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=9"
              id="widget10"
            ></iframe>
          </div>
          <CardMedia
            component="img"
            className={classes.imgCarosel}
            src="https://api.gboss.ml/attachment/image/2/1640316229641-20210623_185840.JPG"
          ></CardMedia>
          <CardMedia
            component="img"
            className={classes.imgCarosel}
            src="https://api.gboss.ml/attachment/image/2/1640316229642-Untitled.png"
          ></CardMedia>
        </Carousel>
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
              onClick={handleModal}
              label="true"
              className={clsx(classes.btnRate, classes.btnRoot)}
            >
              0 đánh giá
            </Button>
          </Box>
          <Typography variant="h4" className={classes.price}>
            {formatPrice}đ
          </Typography>
          <Typography
            variant="body1"
            className={classes.hiddenText}
          ></Typography>
          <Box className={classes.selectedItem}>
            <Box className={classes.promptBox}>
              <Box className={classes.iconPrompt}>
                <SvgIcon>
                  <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
                </SvgIcon>
              </Box>
              <Typography
                className={classes.titlePrompt}
                color="inherit"
                variant="body1"
              >
                Chọn dịch vụ và mặt hàng đi kèm
              </Typography>
            </Box>
            {attachItem.map((item, index) => (
              <Box className={classes.itemBox} key={index}>
                <CardMedia
                  component="img"
                  className={classes.imgItem}
                  src="https://cons.gboss.ml/images/img-empty-image.png"
                ></CardMedia>
                <Box className={classes.itemDetail}>
                  <Typography
                    variant="body1"
                    className={clsx(classes.productName, classes.textName)}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={clsx(classes.productPrice, classes.textPrice)}
                  >
                    {formatCash(item.price)}đ
                  </Typography>
                </Box>
                <Checkbox
                  onChange={() => onCheckedItem(index)}
                  className={classes.checkBox}
                  checked={checkedItem[index]}
                ></Checkbox>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className={classes.totalMoney}>
          <Box className={classes.totleBill}>
            <Typography variant="body1" className={classes.mediumSmTxt}>
              Thành tiền
            </Typography>
            <Typography variant="h5" component="h5">
              {priceItems}đ
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
                onPayment();
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
    marginTop: "12px",
    textAlign: "center",
  },
  hiddenText: {
    marginTop: "24px",
    textAlign: "center",
    "-webkit-line-clamp": 4,
  },
  selectedItem: {
    padding: "24px 50px",
    marginTop: "36px",
    backgroundColor: "#FAFAFB",
  },
  promptBox: {
    color: "#6c7078",
    display: "flex",
    alignItems: "center",
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
  iconPrompt: {
    color: "#6C7078",
    width: "36px",
    height: "36px",
    display: "flex",
    boxShadow: "1px 0 4px 0 rgb(0 0 0 / 16%)",
    alignItems: "center",
    marginRight: "8px",
    borderRadius: "50%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
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