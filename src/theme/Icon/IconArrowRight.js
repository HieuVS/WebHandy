import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const IconArrowLeft = ({ width, height }) => {
    const classes = useStyle();
    return (
        <SvgIcon className={classes.btnArrow}><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"></path></SvgIcon>
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
