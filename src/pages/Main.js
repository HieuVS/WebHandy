import React from "react";
import { useState, useEffect } from "react";
import { Link, ThemeProvider, Avatar, Container, Paper, Box, Tabs, Grid, Typography, SvgIcon, Button, Tab, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { createTheme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import RateDialog from "../Components/RateDialog";
import Schedule from "../Components/Schedule/Schedule";
import Order from "../Components/Order";
import restaurantImg from '../theme/images/restaurant.jpg';
import res2 from '../theme/images/res2.jpg';
import TabSchedule from '../Components/TabSchedule';
import { getItem } from "api/itemApi";


const TabPanel = (props) => {
    const { children, value, index, ...other} = props;
    const classes = useStyle();
    return (
        <Grid id={`tabpanel-${index}`} className={classes.scheduleGrid} item={true} hidden={value!==index} role="tabpanel" aria-labelledby={`tabpanel-${index}`} {...other}>
            {children}
        </Grid>
    )
}

const a11yProps = (index) => {
    return {
        id: `tabpanel-${index}`,
        'aria-controls': `tabpanel-${index}`,
    }
}

function Main() {
    const classes = useStyle();

    useEffect(()=> {
        getItem();
    },[])

    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState(0);

    const handleModal = () => {
        setShowModal(true);
    }

    const handleTabs = (event, value) => {
        setValue(value)
        //console.log(value)
    }

    
    return (
        <ThemeProvider theme={theme}>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""></link>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
            <Paper className={classes.header}>
                <Box className={classes.boxHeader}>
                    <Avatar alt="avatar" variant="square" className={classes.avatar} src={res2} />
                    <Container className={classes.containerAva}>
                        <Avatar alt="avatar" variant="square" className={classes.innerAvatar} src={restaurantImg} />
                    </Container>
                </Box>
                <Container className={classes.containerTitle}>
                    <Box className={classes.title}>
                        <Grid container>
                            <Grid item={true} xs={12} sm={6} className={classes.titleName}>
                                <Typography color="primary" variant="h3">Handyres</Typography>
                            </Grid>
                            <Grid item={true} xs={12} sm={6} ></Grid>
                        </Grid>
                    </Box>
                    <Box className={classes.rating}>
                        <SvgIcon className={classes.iconRate} focusable={false} viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </SvgIcon>
                        <Typography className={classes.iconPoint}>0</Typography>
                        <Box className={classes.partition}></Box>
                        <Button onClick={handleModal} label="true" className={clsx(classes.btnRate, classes.btnRoot)}>0 đánh giá</Button>
                    </Box>
                    <Box className={classes.description}>
                        <Grid container>
                            <Grid item={true} xs={12} sm={12} className={classes.gridDescription}>
                                <Typography variant='body1' className={classes.descriptionText}>Cua hang thong tin duoc mo ta o day</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Tabs value={value} onChange={handleTabs}>
                        <Tab className={clsx(classes.tabRoot, classes.orderTab)} label="Đặt lịch" {...a11yProps(0)}></Tab>
                        <Tab className={clsx(classes.tabRoot, classes.orderTab)} label="Đặt hàng" {...a11yProps(1)}></Tab>
                        <Tab className={clsx(classes.orderTab, classes.tabRoot)} label="Tin tức" {...a11yProps(2)}></Tab>
                    </Tabs>
                </Container>
            </Paper>
            <Container className={classes.mainOrder}>
                <Grid container>
                    <Grid item>
                        <Box className={classes.infoBox}>
                            <Paper className={classes.infoPaper}>
                                <Typography variant="h6" >Thông tin</Typography>
                                <ListItem className={classes.itemList}>
                                    <ListItemIcon className={classes.itemIcon}>
                                        <SvgIcon viewBox="0 0 24 24">
                                        <path d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                                        </SvgIcon>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="body2" className={classes.itemText}>T2 : 08:00 - 23:00</Typography>
                                        <Typography variant="body2" className={classes.itemText}>T3 : 08:00 - 23:00</Typography>
                                        <Typography variant="body2" className={classes.itemText}>T4 : 08:00 - 23:00</Typography>
                                        <Typography variant="body2" className={classes.itemText}>T5 : 08:00 - 23:00</Typography>
                                        <Typography variant="body2" className={classes.itemText}>T6 : 08:00 - 23:00</Typography>
                                        <Typography variant="body2" className={classes.itemText}>T7 : 08:00 - 23:00</Typography>
                                        <Typography variant="body2" className={classes.itemText}>CN : 08:00 - 23:00</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem className={classes.itemList}>
                                    <ListItemIcon className={classes.itemIcon}>
                                        <SvgIcon viewBox="0 0 24 24">
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                                        </SvgIcon>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="body2">0343772920</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem className={classes.itemList}>
                                    <ListItemIcon className={classes.itemIcon}>
                                        <SvgIcon viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                                        </SvgIcon>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="body2">CIC 219 TrungKinh</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem className={classes.itemList}>
                                    <ListItemIcon className={classes.itemIcon}>
                                        <SvgIcon viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path>
                                        </SvgIcon>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Link href="https://gboss.io" target="_blank" rel="noopener noreferrer">
                                            <Typography variant="body2" color="inherit">https://gboss.io</Typography>
                                        </Link>                        
                                    </ListItemText>
                                </ListItem>
                                <ListItem className={classes.itemList}>
                                    <ListItemIcon className={classes.itemIcon}>
                                        <SvgIcon viewBox="0 0 24 24">
                                            <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"></path>
                                        </SvgIcon>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                            <Typography variant="body2" color="inherit">https://facebook.com</Typography>
                                        </Link>                             
                                    </ListItemText>
                                </ListItem>
                                <ListItem className={classes.itemList}>
                                    <ListItemIcon className={classes.itemIcon}>
                                        <SvgIcon viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                                        </SvgIcon>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="body2">bgcafe@gmail.com</Typography>
                                    </ListItemText>
                                </ListItem>
                            </Paper>
                        </Box>
                    </Grid>
                    <TabPanel value={value} index={0}>
                        <TabSchedule value={value} index={0} >
                            <Box role="tabpanel" id="detail-tabpanel-0" >
                                
                            </Box>
                        </TabSchedule>                        
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Order />
                    </TabPanel>
                    {/* <TabPanel value={value} index={2}>
                        <Menu />
                    </TabPanel> */}
                </Grid>
            </Container>
            <RateDialog onShow={showModal} onClose={()=>{setShowModal(false)}}/>
            {/* {showModal && <RateDialog onShow={showModal}/> } */}
        </ThemeProvider>

    )
}

const theme = createTheme({
    typography: {
        h3: {
            fontSize: '36px',
            fontFamily: 'Inter,Roboto,Arial,sans-serif',
            fontWeight: 600,
            lineHeight: 'normal',
            letterSpacing: 'normal',
        },
        body1: {
            color: '#4B4D53',
            fontSize: '16px',
            fontFamily: 'Inter,Roboto,Arial,sans-serif',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: 'normal',
        },
        h6: {
            color: '#4B4D53',
            fontSize: '20px',
            fontFamily: 'Inter,Roboto,Arial,sans-serif',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: 'normal',
        },
        body2: {
            color: '#4B4D53',
            fontSize: '14px',
            fontFamily: 'Inter,Roboto,Arial,sans-serif',
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: 'normal',
        },
        subtitle2: {
            color: '#4B4D53',
            fontSize: '16px',
            fontFamily: 'Inter,Roboto,Arial,sans-serif',
            fontWeight: 600,
            lineHeight: 'normal',
            letterSpacing: 'normal',
        }
    },
    palette: {
        primary: {
            main: '#EF5845',
        },
    },
    button: {
        root: {
            color: '#3E4045',
            padding: '6px 16px',
            fontSize: '14px',
            minWidth: '64px',
            boxSizing: 'border-box',
            transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            fontFamily: 'Inter,Roboto,Arial,sans-serif',
            fontWeight: 700,
            lineHeight: 'normal',
            borderRadius: '4px',
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
        }
    },
    props: {
        MuiIconButton : {
            root : {
                flex: '0 0 auto',
                color: '#4B4D53',
                padding: '8px',
                overflow: 'visible',
                fontSize: '1.5rem',
                textAlign: 'center',
                transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                borderRadius: '50%',
            }
        }
    },
    overrides: {
        MuiLink: {
            root: { 
                color:'#447AFF',
            }
        },
        MuiButton: {
            root: {
                color: '#3E4045',
                padding: '6px 16px',
                fontSize: '14px',
                minWidth: '64px',
                boxSizing: 'border-box',
                transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                fontFamily: 'Inter,Roboto,Arial,sans-serif',
                fontWeight: 700,
                lineHeight: 'normal',
                borderRadius: '4px',
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
                '&:hover': {
                    backgroundColor: '#9b0000'
                }
            },
            contained: {
                color: 'rgba(0, 0, 0, 0.87)',
                fontSize: '16px',
                boxShadow: 'none',
                minHeight: '40px',
                fontWeight: 600,
                paddingTop: '6px',
                paddingLeft: '36px',
                borderRadius: '20px',
                paddingRight: '36px',
                paddingBottom: '6px',
                backgroundColor: '#B3B5BA',
            }
        },
        MuiTab: {
            root: {
                color: '#FFFFFF',
                padding: '6px 12px',
                overflow: 'hidden',
                position: 'relative',
                fontSize: '14px',
                maxWidth: '264px',
                minWidth: '72px',
                boxSizing: 'border-box',
                minHeight: '48px',
                textAlign: 'center',
                flexShrink: 0,
                fontFamily: 'Inter,Roboto,Arial,sans-serif',
                fontWeight: 700,
                lineHeight: 'normal',
                whiteSpace: 'normal',
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
            }
        },
        MuiInputBase: {
            root: {
                color: '#3E4045',
                cursor: 'text',
                display: 'inline-flex',
                position: 'relative',
                fontSize: '16px',
                boxSizing: 'border-box',
                alignItems: 'center',
                fontFamily: 'Inter,Roboto,Arial,sans-serif',
                fontWeight: 500,
                lineHeight: '1.1876em',
                letterSpacing: 'normal',
            }
        },
        MuiTypography: {
            h4: {
                color: '#4B4D53',
                fontSize: '28px',
                fontFamily: 'Inter,Roboto,Arial,sans-serif',
                fontWeight: 600,
                lineHeight: 'normal',
                letterSpacing: 'normal',
            },
            body1: {
                color: '#4B4D53',
                fontSize: '16px',
                fontFamily: 'Inter,Roboto,Arial,sans-serif',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: 'normal',
            }
        },
    }
});

const useStyle = makeStyles({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em',
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius:'10px',
          backgroundColor: '#606060',
          //outline: '1px solid slategrey'
        }
      },
    header : {
        width: '100%',
        boxShadow: '0 2px 8px 0 rgb(0 0 0 / 16%)',
        marginBottom: '24px'
    },
    avatar : {
        width: '100%',
        height: '520px',
        opacity: 0.5,
        '-webkit-mask-image': 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
    },
    boxHeader : {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
    },
    containerAva : {
        top: 0,
        height: '100%',
        display: 'flex',
        padding: 0,
        position: 'absolute',
        alignItems: 'center'
    },
    innerAvatar : {
        width: '100%',
        height: '100%',
        padding: '0 63px',
    },
    containerTitle: {
        margin: 'auto',
        padding: '0 63px',
        background: 'none',
    },
    title: {
        paddingTop: '14px',
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: '8px',
    },
    titleName: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '8px',
        paddingBottom: '8px',
    },
    rating: {
        color: '#3B404C',
        width: 'fit-content',
        margin: '4px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
    },
    iconRate: {
        color: '#FEBA40',
        fontSize: '24px',
        marginRight: '4px',
    },
    iconPoint: {
        color: '#3B404C',
        minWidth: 'max-content',
    },
    partition: {
        width: '2px',
        height: '14px',
        marginLeft: '6px',
        backgroundColor: '#3B404C',
    },

    description: {

    },
    btnRoot: {
        color: '#3E4045',
        fontSize: '14px',
        minWidth: '64px',
        boxSizing: 'border-box',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        fontFamily: 'Inter,Roboto,Arial,sans-serif',
        fontWeight: 700,
        lineHeight: 'normal',
        borderRadius: '4px',
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
    },
    btnRate: {
        fontSize: '16px',
        fontWeight: 500,
        color: '#3B404C',
        flexGrow: 1,
        minWidth: 'max-content',
        textTransform: 'none',
        justifyContent: 'flex-start',
    },
    mainOrder: {
        padding: '0 63px',
        paddingBottom: '9px'
    },
    infoBox: {
        top: '10px',
        width: '273px',
        display: 'flex',
        position: 'sticky',
        flexDirection: 'column',
    },

    infoPaper: {
        width: '100%',
        display: 'flex',
        padding: '24px',
        boxShadow: '0 2px 8px 0 rgb(0 0 0 / 16%)',
        alignItems: 'center',
        marginBottom: '16px',
        flexDirection: 'column',
        '&>:first-child' : {
            width: '100%',
            marginBottom: '16px'
        }
    },
    itemList: {
        padding: 0,
        minHeight: '43px',
        alignItems: 'start',
    },
    itemIcon: {
        color: '#6C7078',
        minWidth: '30px',
    },
    itemText: {
        color: '#3E4045',
        marginBottom: '7px',
    },



    gridDescription : {
        borderBottom: '1px solid rgba(151, 154, 161, 0.7)',
        marginBottom: '10px',
    },
    descriptionText :{
        lineHeight: 1.5,
        padding: '3px 0',
        '-webkit-line-clamp': 4
    },
    orderTab : {
        color: '#3E4045',
        padding: '12px 20px',
        minWidth: '107px',
        borderRadius: 'unset',
        textTransform: 'none'
    },
    tabRoot : {
        padding: '12px 20px',
        overflow: 'hidden',
        position: 'relative',
        fontSize: '14px',
        maxWidth: '264px',
        minWidth: '107px',
        boxSizing: 'border-box',
        minHeight: '48px',
        textAlign: 'center',
        flexShrink: 0,
        fontFamily: 'Inter,Roboto,Arial,sans-serif',
        fontWeight: 700,
        lineHeight: 'normal',
        whiteSpace: 'normal',
        letterSpacing: '0.4px',
        //textTransform: 'uppercase',
    },
    scheduleGrid: {
        width: '100%',
        maxWidth: '100%',
        paddingLeft: 0,
        [theme.breakpoints.up('md')]: {
            maxWidth: 'calc(100% - 273px)',
            paddingLeft: '16px'
        }
    },
})


export default Main;