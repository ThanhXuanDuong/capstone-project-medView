import {useState} from "react";

export default function useDialogActions() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {openDialog: open, handleOpenDialog:handleClickOpen, handleCloseDialog:handleClose};
}