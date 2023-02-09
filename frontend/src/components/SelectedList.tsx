import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import WindowIcon from '@mui/icons-material/Window';
import SquareIcon from '@mui/icons-material/Square';

export default function SelectedList({
    setGrids,
    handleClose
}:{
    setGrids: (gridNumbers: number) => void
    handleClose:() => void
}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        switch (index){
            case 0:
                setGrids(1);
                break;
            case 1:
                setGrids(2);
                break;
            case 2:
                setGrids(4);
                break;
            default:
                setGrids(1);
        }
        handleClose();
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 100, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="options">
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <SquareIcon/>
                </ListItemButton>

                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ViewAgendaIcon/>
                </ListItemButton>

                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <WindowIcon/>
                </ListItemButton>
            </List>

        </Box>
    );
}