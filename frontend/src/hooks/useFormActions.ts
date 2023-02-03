import React from "react";

export default function useFormActions() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {openForm: open, handleOpenForm: handleClickOpen, handleCloseForm: handleClose};
}