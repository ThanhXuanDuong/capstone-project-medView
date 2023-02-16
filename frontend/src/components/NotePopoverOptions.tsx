import * as React from 'react';
import Popover from '@mui/material/Popover';
import {Box, IconButton, ThemeProvider} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Note from "../types/Note";
import theme from "./styling/theme";

export default function NotePopoverOptions({
    note,
    editing,
    anchorEl,
    setAnchorEl,
    onAdd,
    onEdit,
    onDelete
}:{
    note:Note,
    editing: boolean,
    anchorEl: HTMLButtonElement | null,
    setAnchorEl: (element: HTMLButtonElement | null) => void,
    onAdd: (note:Note) => void,
    onEdit: (note:Note) => void,
    onDelete: (note: Note) => void
}) {
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <ThemeProvider theme={theme}>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Box sx={{
                    display:"flex",
                    backgroundColor:"secondary.main",
                    borderRadius:"4px"}}>
                    {!editing
                        ? <Box alignSelf={"center"} borderRight={"1px solid darkgrey"}>
                            <IconButton aria-label="add-note" onClick={() => onAdd(note) }>
                                <AddBoxIcon sx={{color: "secondary.contrastText"}} fontSize={"small"}/>
                            </IconButton>
                         </Box>
                        : <Box alignSelf={"center"} borderRight={"1px solid darkgrey"}>
                            <IconButton aria-label="edit-note" onClick={() => onEdit(note)}>
                                <EditIcon sx={{color: "secondary.contrastText"}} fontSize={"small"}/>
                             </IconButton>
                        </Box>
                    }
                    <Box alignSelf={"center"}>
                        <IconButton aria-label="delete-note" onClick={() => onDelete(note)}>
                            <DeleteIcon sx={{color: "secondary.contrastText"}} fontSize={"small"}/>
                        </IconButton>
                    </Box>
                </Box>
            </Popover>
        </ThemeProvider>
    );
}