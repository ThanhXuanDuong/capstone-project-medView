import * as React from 'react';
import Popover from '@mui/material/Popover';
import {Box, Divider, IconButton} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Note from "../types/Note";

export default function NotePopoverOptions({
    note,
    anchorEl,
    setAnchorEl,
    onAdd,
    onEdit,
    onDelete
}:{
    note:Note
    anchorEl: HTMLButtonElement | null,
    setAnchorEl: (element: HTMLButtonElement | null) => void,
    onAdd: (note:Note) => void,
    onEdit: (note:Note) => void,
    onDelete: (id:string|undefined) => void
}) {
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
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
            <Box sx={{
                display:"flex",
                backgroundColor:"action.selected",
                borderRadius:"4px"}}>
                <Box alignSelf={"center"}>
                    <IconButton aria-label="add-note" onClick={() => onAdd(note)}>
                        <AddBoxIcon fontSize={"small"}/>
                    </IconButton>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box alignSelf={"center"}>
                    <IconButton aria-label="edit-note" onClick={() => onEdit(note)}>
                        <EditIcon fontSize={"small"}/>
                    </IconButton>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box alignSelf={"center"}>
                    <IconButton aria-label="delete-note" onClick={() => onDelete(note.id)}>
                        <DeleteIcon fontSize={"small"}/>
                    </IconButton>
                </Box>
            </Box>
        </Popover>

    );
}