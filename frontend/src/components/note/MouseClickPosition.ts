import {useEffect, useState} from "react";
import Position from "../../types/Position";

export default function MouseClickPosition({
    markup,
    imgRect
}: {
    markup:boolean,
    imgRect: DOMRect|undefined
}) {
    const [mousePos, setMousePos] = useState<Position>({x: 0.,y: 0.});
    const [mouseRelativePos, setMouseRelativePos] = useState<Position>({x: 0.,y: 0.});
    const imgViewer = document.getElementById("image-viewer");
    //const img = document.getElementById("image-in-viewer");

    useEffect(() => {
        if (markup && imgViewer && imgRect) {
            //let rect = img.getBoundingClientRect();
            const handleMouseClick = (event: MouseEvent) => {
                setMousePos({x: event.clientX, y: event.clientY});
                setMouseRelativePos({
                    x: (event.clientX - imgRect.x) / imgRect.width,
                    y: (event.clientY - imgRect.y) / imgRect.height
                });
            };
            imgViewer.addEventListener('click', handleMouseClick, {once: true});

            return () => {
                imgViewer.removeEventListener('click', handleMouseClick)
            }
        }
    },[imgRect, imgViewer, markup]);

  return {mousePos,mouseRelativePos};
}