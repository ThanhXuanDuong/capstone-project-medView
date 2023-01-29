import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Avatar, Box, FormControl} from "@mui/material";
import {IMAGES_PATH} from "../application";
import GenderRadioButtonsGroup from "./GenderRadioGroup";
import UploadFile from "./UploadFile";

export default function SaveForm({
    open,
    handleClose
}:{
    open: boolean,
    handleClose: () =>void
}) {

    return (
        <Dialog sx={{p: 5}} open={open} onClose={handleClose}>
            <DialogTitle>Save Form</DialogTitle>

            <DialogContent >
                <form>
                    <FormControl >
                        <Box sx={{display:'flex',justifyContent:'space-between'}}>
                            <Avatar
                                alt="Avatar"
                                src={IMAGES_PATH + "profile-placeholder.png"}
                                sx={{ width: 120, height: 120, mb: 2 }}
                                variant="square"
                            />
                            <UploadFile/>
                        </Box>

                        <TextField
                            sx={{ width: 350, mb: 2 }}
                            id="lastname"
                            label={"Last Name"}
                            name="lastname"
                            variant="outlined"
                            size="small"
                        />

                        <TextField
                            sx={{ width: 350, mb: 2 }}
                            id="firstname"
                            label={"First Name"}
                            name="firstname"
                            variant="outlined"
                            size="small"
                        />

                        <TextField
                            sx={{ width: 350, mb: 2 }}
                            id="patient-id"
                            label={"Patient-ID"}
                            name="patient-id"
                            variant="outlined"
                            size="small"
                        />

                        <GenderRadioButtonsGroup/>

                        <TextField
                            sx={{ width: 350, mb: 2 }}
                            id="address"
                            label={"Address"}
                            name="address"
                            variant="outlined"
                            size="small"
                        />

                        <TextField
                            sx={{ width: 350, mb: 2 }}
                            id="birthday"
                            label={"Birthday"}
                            name="birthday"
                            variant="outlined"
                            size="small"
                        />

                        <TextField
                            sx={{ width: 350, mb: 2 }}
                            id="telephone"
                            label={"Telephone"}
                            name="telephone"
                            variant="outlined"
                            size="small"
                        />

                    </FormControl>
                </form>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Save</Button>
            </DialogActions>
        </Dialog>

    );
}