import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import Shape from "../../types/Shape";

export default function SelectShape({
    newShape,
    setNewShape,
    handleClose
}:{
    newShape:Shape
    setNewShape: (shape:Shape) => void,
    handleClose:() => void
}) {
    const [selected, setSelected] = React.useState(0);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelected(index);

        if(index ===0){
            setNewShape({...newShape,type: "circle"});
        }else{
            setNewShape({...newShape,type: "square"});
        }

        handleClose();
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 100, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="options" sx={{backgroundColor:"action.disabled"}}>
                <ListItemButton
                    selected={selected === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <CircleOutlinedIcon fontSize={"small"}/>
                </ListItemButton>

                <ListItemButton
                    selected={selected === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <CropSquareOutlinedIcon fontSize={"small"}/>
                </ListItemButton>
            </List>

        </Box>
    );
}