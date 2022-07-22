import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const IconArrowLeft = ({ width, height }) => {
    const classes = useStyle();
    return (
        <SvgIcon className={classes.btnArrow}><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path></SvgIcon>
    );
};

IconArrowLeft.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};
IconArrowLeft.defaultProps = {
    width: 24,
    height: 24,
};

const useStyle = makeStyles((theme) => ({
    btnArrow: {
        color: '#7F838C',
        width: '16px',
        height: '16px',
    },
}))
export default memo(IconArrowLeft);
