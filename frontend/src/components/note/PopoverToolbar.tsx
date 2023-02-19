import * as React from 'react';
import Popover from '@mui/material/Popover';
import {Box, IconButton} from "@mui/material";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import SelectedList from "./SelectedList";

export default function PopoverToolbar({
    setGrids,
    viewImageIds,
    setViewImageIds
}:{
    setGrids: (gridNumbers: number) => void,
    viewImageIds: string[],
    setViewImageIds:(ids: string[]) => void,
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
                <SelectedList setGrids={setGrids}
                              viewImageIds={viewImageIds}
                              setViewImageIds={setViewImageIds}
                              handleClose={handleClose}/>
            </Popover>
        </Box>
    );
}