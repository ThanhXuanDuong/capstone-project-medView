import * as React from 'react';
import Popover from '@mui/material/Popover';
import SelectedList from "./SelectedList";
import {Container, IconButton} from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';

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
        <Container>
            <IconButton onClick={handleClick}>
                <GridViewIcon sx={{color:'white'}}/>
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
            >
                <SelectedList setGrids={setGrids} handleClose={handleClose}/>
            </Popover>
        </Container>
    );
}