import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    button: {
        backgroundColor: "#261D56 !important",
        color: "#fff !important",
        padding: ".9rem .6rem  !important",
        marginTop: '1rem  !important',
        '&:hover': {
            backgroundColor: "#261D91 !important"
        }
    },
    overviewButton:{
        backgroundColor: "#2BC4A9 !important",
        color: "#F6F7FF !important",
        padding: ".5rem 1.2rem !important",
        fontSize: ".9rem !important",
        fontWeight: "bold !important",
        textTransform: "none !important",
        borderRadius: "10px"
    },
    overviewButtonIcon:{
      fontSize: "15px !important"
    },
    arrowUp: {
        fontSize: "20px !important",
        color: "#2BC4A9 !important"
    },
    arrowDown:{
        fontSize: "20px !important",
        color: "#E96574 !important"
    },
    Icons: {
        color: "#F6F7FF !important",
        fontSize: "35px !important"
    },

});

