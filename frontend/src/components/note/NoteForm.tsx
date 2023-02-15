import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Box, Button, DialogActions, TextField} from "@mui/material";
import Note from "../../types/Note";

export default function NoteForm({
    note,
    mouseRelativePos,
    setNote,
    editing,
    setEditing,
    open,
    handleClose,
    onSave
}:{
    note: Note,
    mouseRelativePos: {x:number,y:number},
    setNote: (note:Note) => void,
    editing:boolean,
    setEditing: (edit: boolean) => void
    open: boolean,
    handleClose: () => void,
    onSave: (note:Note) => void
}){

    const onCancel= () =>{
        setNote({...note, text:""});
        handleClose();
        setEditing(false);
    }
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Note</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        multiline
                        rows={4}
                        type="text"
                        helperText={ "Text is required"}
                        autoFocus
                        sx={{ width: 500, mb: 2 }}
                        margin="dense"
                        id="note"
                        label="Text"
                        value={note.text}
                        variant="outlined"
                        onChange={(e) => {editing
                            ? setNote({...note, text: e.target.value})
                            : setNote({...note, text: e.target.value,
                                relativeX:mouseRelativePos.x,
                                relativeY:mouseRelativePos.y
                                })
                            }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => onSave(note)}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

}