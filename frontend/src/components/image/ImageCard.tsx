import {Box, Card, CardActionArea, CardMedia, Typography} from "@mui/material";

export default function ImageCard({
    id,
    index,
    onView
}:{
    id: string,
    index: number,
    onView: (id:string) => void
}){
    const handleClick = () => {
        onView(id);
    }

    return (
        <Card sx={{ display: 'flex',
            justifyContent:'space-evenly',
            alignItems:'center'}}
        >

            <CardActionArea onClick={handleClick}>
                <Box sx={{ display: 'flex'}}
                     justifyContent={"space-evenly"}
                     alignItems={"center"}
                     gap= "1rem"
                >
                    <Typography variant="body1" color="text.secondary">
                        {index+1}
                    </Typography>

                    <CardMedia
                        sx={{ maxWidth:100}}
                        component="img"
                        style={{padding: "5%" }}
                        image ={"/api/files/"+id}
                    />
                </Box>

           </CardActionArea>
        </Card>
    );
}