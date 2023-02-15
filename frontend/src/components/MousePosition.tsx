import {useEffect, useState} from "react";
import Position from "../types/Position";

export default function MousePosition(markup:boolean) {
    const [mousePos, setMousePos] = useState<Position>({x: 0.,y: 0.});
    const [mouseRelativePos, setMouseRelativePos] = useState<Position>({x: 0.,y: 0.});
    const imgViewer = document.getElementById("image-viewer");
    const img = document.getElementById("image-in-viewer");

    useEffect(() => {
        if (markup && imgViewer && img) {
            let rect = img.getBoundingClientRect();
            const handleMouseClick = (event: any) => {
                setMousePos({x: event.clientX, y: event.clientY});
                setMouseRelativePos({
                    x: (event.clientX - rect.x) / rect.width,
                    y: (event.clientY - rect.y) / rect.height
                });
            };
            imgViewer.addEventListener('click', handleMouseClick, {once: true});

            return () => {
                window.removeEventListener('click', handleMouseClick)
            }
        }
    },[img, imgViewer, markup]);

  return {mousePos,mouseRelativePos};
}