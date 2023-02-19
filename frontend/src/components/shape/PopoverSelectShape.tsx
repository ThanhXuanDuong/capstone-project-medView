import * as React from 'react';
import Popover from '@mui/material/Popover';
import {Box, IconButton} from "@mui/material";
import SelectShape from "./SelectShape";
import PolylineOutlinedIcon from "@mui/icons-material/PolylineOutlined";
import Shape from "../../types/Shape";

export default function PopoverSelectShape({
    draw,
    setDraw,
    newShape,
    setNewShape
}:{
    draw: boolean,
    setDraw: (draw: boolean) => void,
    newShape: Shape,
    setNewShape: (shape:Shape) => void
}) {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setDraw(!draw);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box>
            <IconButton onClick={handleClick}>
                <PolylineOutlinedIcon/>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <SelectShape newShape={newShape}
                             setNewShape={setNewShape}
                             handleClose={handleClose}/>
            </Popover>
        </Box>
    );
}