import { useState} from "react";
import Position from "../types/Position";

export default function MousePosition(markup:boolean) {
    const [mousePos, setMousePos] = useState<Position>({x: 0.,y: 0.});
    const imgViewer = document.getElementById("image-viewer");

    if (markup && imgViewer){
        const handleMouseClick = (event:any) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };
        imgViewer.addEventListener('click', handleMouseClick, {once:true});
    }

  return mousePos;
}