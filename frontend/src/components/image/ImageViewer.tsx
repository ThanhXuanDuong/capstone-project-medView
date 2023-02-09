import {Card, CardMedia, Divider} from "@mui/material";

export default function ImageViewer({
    ids
}:{
    ids:string[]
}){

    let gridHeight: string;
    let gridWidth :string;
    let fWrap : string = "nowrap";
    switch (ids.length){
        case 1:
            gridHeight = "100%";
            gridWidth = "100%";
            break;
        case 2:
            gridHeight = "100%";
            gridWidth= "49.8%";
            break;
        default:
            gridHeight = "49.8%";
            gridWidth= "49.8%";
            fWrap = "wrap";
            break;
    }

    return (
        <>
            <Card sx={{ display: 'flex',height:"100%",alignItems:"center",flexWrap: fWrap}}>
                { ids.length >0 &&
                     ids.map(id =>
                         <>
                             <CardMedia
                                 key={id}
                                 sx={{width: gridWidth,
                                     height: gridHeight,
                                     p:"5%",
                                     backgroundColor:"black",
                                     objectFit:'contain'}}
                                 component="img"
                                 image={"/api/files/" + id}
                             />
                             {ids.length !==1 &&
                                 <Divider orientation="vertical" flexItem />
                             }
                         </>
                     )
                }
            </Card>
        </>
    );
}