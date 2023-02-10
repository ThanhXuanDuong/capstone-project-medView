import { useState} from "react";
import Position from "../types/Position";

export default function MousePosition(markup:boolean) {
    const bodyHeight = document.body.clientHeight;
    const bodyWidth = document.body.clientWidth;

    const [mousePos, setMousePos] = useState<Position>({x: 0.,y: 0.});
    const [mouseRelativePos, setMouseRelativePos] = useState<Position>({x: 0.,y: 0.});
    const imgViewer = document.getElementById("image-viewer");

    if (markup && imgViewer){
        const handleMouseClick = (event:any) => {
            setMousePos({ x: event.clientX, y: event.clientY });
            setMouseRelativePos({ x: event.clientX/bodyWidth, y: event.clientY/bodyHeight});
        };
        imgViewer.addEventListener('click', handleMouseClick, {once:true});
    }

  return {mousePos,mouseRelativePos,bodyHeight,bodyWidth};
}