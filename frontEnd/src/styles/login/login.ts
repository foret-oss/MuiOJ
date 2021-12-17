import { makeStyles } from "@mui/material";
import color from "@styles/color/color";

export default (isWidthLimited: boolean): any => makeStyles(() => ({
    root: {
        background: color.buttonColor,
        "&:hover": {
            background: color.buttonColor,
        },
        color: "white",
        border: 0,
        borderRadius: 3,
        height: 48,
        padding: "0 30px",
    },
    default: {
        color: color.defaultSvgColor,
        backgroundColor: "transparent",
        minHeight: "30px",
        padding: isWidthLimited ? "0 10px" : "0 5px",
        minWidth: isWidthLimited ? "50px" : "auto",
        marginRight: isWidthLimited ? "20px" : 0,
        fontSize: isWidthLimited ? "auto" : "4vmin",
    },
    tabs: {
        minHeight: "30px",
        color: color.defaultSvgColor,
        backgroundColor: "transparent",
        padding: isWidthLimited ? "0 10px" : "0 5px",
        minWidth: isWidthLimited ? "50px" : "auto",
        marginRight: isWidthLimited ? "20px" : 0,
        fontSize: isWidthLimited ? "auto" : "4vmin",
    },
    querySms: {
        "&:hover": {
            background: 'transparent',
        }
    }
}))