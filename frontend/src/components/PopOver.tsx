import * as React from 'react';
import Popover from '@mui/material/Popover';
import SelectedList from "./SelectedList";
import {Box, IconButton} from "@mui/material";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

export default function PopOver({
    setGrids
}:{
    setGrids: (gridNumbers: number) => void
}) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box>
            <IconButton onClick={handleClick}>
                <AutoAwesomeMosaicIcon style={{ fill: 'text.secondary' }}/>
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
                <SelectedList setGrids={setGrids} handleClose={handleClose}/>
            </Popover>
        </Box>
    );
}