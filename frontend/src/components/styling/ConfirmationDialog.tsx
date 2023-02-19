import {Button, DialogActions, DialogContentText} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

export default function ConfirmationDialog({
    open,
    handleClose,
    onDelete
}:{
    open: boolean,
    handleClose: () => void,
    onDelete: () => void
 }) {

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" variant={"h6"}>
                        Are you sure you want to delete this?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} onClick={handleClose}>Cancel</Button>
                    <Button variant={"contained"} onClick={onDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}