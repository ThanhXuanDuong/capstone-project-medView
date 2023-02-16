import {Box, Card, CardActionArea, CardActions, CardMedia, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import React, {useRef} from "react";
import Note from "../../types/Note";

export default function ImageCard({
    id,
    index,
    notesByPatId,
    onView,
    onDelete
}:{
    id: string,
    index: number,
    notesByPatId: Map<string,Note[]>,
    onView: (id:string) => void,
    onDelete: (id:string) => void
}){
    const handleClick = () => {
        onView(id);
    }

    let notes = useRef<Note[]| undefined>([]);
    if(notesByPatId.get(id)){
         notes.current = notesByPatId.get(id);
    }

    return (
        <Card sx={{
            display: 'flex',
            justifyContent:'space-evenly',
            alignItems:'center',
            width: '100%'
        }}
        >
            <CardActionArea onClick={handleClick}>
                <Box sx={{position:"relative", display: 'flex', pl:'1rem'}}
                     justifyContent={"flex-start"}
                     alignItems={"center"}
                     gap= "1rem"
                >
                    <Typography variant="h6" color="text.primary">
                        {index+1}
                    </Typography>

                    <CardMedia
                        sx={{ maxHeight:'120px', objectFit:'contain'}}
                        component="img"
                        style={{padding: "8%" }}
                        image ={"/api/files/"+id}
                    />
                    {notes.current?.length &&
                        <Box  sx={{position:"absolute", top:5,left:5}}>
                            <CommentIcon sx={{color:"primary.main"}} fontSize={"small"} />
                        </Box>
                    }

                </Box>
           </CardActionArea>
            <CardActions disableSpacing>
                <IconButton aria-label="delete"
                            onClick={() => onDelete(id)}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>

        </Card>
    );
}