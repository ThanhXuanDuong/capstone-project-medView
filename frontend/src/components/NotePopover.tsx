import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {IconButton} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import NotePopoverOptions from "./NotePopoverOptions";
import Note from "../types/Note";

export default function NotePopover({
    position,
    handleOpenForm,
    handleEditClick,
    handleDeleteClick,
    note
}:{
    position: {x:number, y:number},
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
        <div>
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
                                anchorEl={anchorElNoteOptions}
                                setAnchorEl={setAnchorElNoteOptions}
                                onAdd = {handleOpenForm}
                                onEdit = {handleEditClick}
                                onDelete = {handleDeleteClick}
            />

            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>{note.text}</Typography>
            </Popover>
        </div>
    );
}