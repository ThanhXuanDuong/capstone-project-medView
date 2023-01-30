import {Box} from "@mui/material";
import * as React from "react";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export default function UploadFile(){
    return (
        <Box
            sx={{
                display: 'flex',
                width: 120,
                height: 120,
                backgroundColor: 'white',
                border: '1px solid lightgrey',
                '&:hover': {
                    backgroundColor: 'lightgrey',
                    opacity: [0.9, 0.8, 0.7],
                },
                justifyContent: 'center',
                alignItems: 'center'
            }}

        >
            <DriveFolderUploadIcon sx={{ fontSize: 60}}/>
        </Box>

    )
}