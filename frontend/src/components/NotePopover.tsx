import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {Box, IconButton, ThemeProvider} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import NotePopoverOptions from "./NotePopoverOptions";
import Note from "../types/Note";
import theme from "./styling/theme";

export default function NotePopover({
    position,
    editing,
    handleOpenForm,
    handleEditClick,
    handleDeleteClick,
    note
}:{
    position: {x:number, y:number},
    editing: boolean,
    handleOpenForm:()=> void,
    handleEditClick: (note: Note)=> void,
    handleDeleteClick: (id: string|undefined)=> void,
    note:Note
}) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const [anchorElNoteOptions, setAnchorElNoteOptions] = React.useState<HTMLButtonElement | null>(null);


    return (
        <ThemeProvider theme={theme}>
            <IconButton
                sx={{position:"absolute",
                zIndex:"2",
                top: position.y,
                left: position.x}}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                onClick={(e) => setAnchorElNoteOptions(e.currentTarget)}
            >
                <CommentIcon sx={{color:"primary.dark"}} fontSize={"large"}/>
            </IconButton>

            <NotePopoverOptions note={note}
                                editing={editing}
                                anchorEl={anchorElNoteOptions}
                                setAnchorEl={setAnchorElNoteOptions}
                                onAdd = {handleOpenForm}
                                onEdit = {handleEditClick}
                                onDelete = {handleDeleteClick}
            />

            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none'
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Box sx={{maxWidth: "300px"}}>
                    <Typography sx={{ p: 1,
                        color:"secondary.contrastText",
                        backgroundColor:"secondary.main"}}
                    >{note.text}</Typography>
                </Box>
            </Popover>
        </ThemeProvider>
    );
}