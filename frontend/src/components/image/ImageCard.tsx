import {Box, Card, CardActionArea, CardActions, CardMedia, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function ImageCard({
    id,
    index,
    onView,
    onDelete
}:{
    id: string,
    index: number,
    onView: (id:string) => void,
    onDelete: (id:string) => void
}){
    const [hasNote, setHasNote]= useState<boolean>(false);
    const navigate =useNavigate();

    useEffect(() => {
        (async () =>{
            try{
                const response = await axios.get(`/api/notes/image/${id}`);
                setHasNote(response.data.length>0);
            }catch (e:any){
                console.log("Error while loading data!")
                e.response.status === "401" && navigate("/login");
            }
        })();
    },[id,navigate]);

    const handleClick = () => {
        onView(id);
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
                    {hasNote &&
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