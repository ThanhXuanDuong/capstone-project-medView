import Shape from "../../types/Shape";
import Position from "../../types/Position";

export function DrawShapes({
    shapes,
    imgRect,
    draw,
    newShape,
    mouseDownPos,
    mouseUpPos
}:{
    shapes:Shape[],
    imgRect:DOMRect|undefined,
    draw: boolean,
    newShape:Shape
    mouseDownPos: Position
    mouseUpPos:Position
}) {

    return (
        <div style={{ position: "fixed",width: '100%', height: '100vh', top:0, right:0}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" >
                <g stroke="#FFCE44" fill="transparent" strokeWidth="3">
                    {imgRect && shapes.map(shape => {
                        const point1X= Math.round(shape.point1[0] * imgRect.width + imgRect.left);
                        const point1Y= Math.round(shape.point1[1] * imgRect.height + imgRect.top);
                        const point2X= Math.round(shape.point2[0] * imgRect.width + imgRect.left);
                        const point2Y= Math.round(shape.point2[1] * imgRect.height + imgRect.top);
                        return shape.type === "square"
                            ? <rect key={shape.id}
                                    x={point1X}
                                    y={point1Y}
                                    width={Math.abs(point2X- point1X)}
                                    height={Math.abs(point2Y- point1Y)}
                                    onClick={() => alert('You have clicked the square.')}/>
                            : <circle key={shape.id}
                                      cx={point1X}
                                      cy={point1Y}
                                      r={Math.round(Math.sqrt((point2X - point1X) ** 2 + (point2Y - point1Y) ** 2))}
                                      onClick={() => alert('You have clicked the circle.')}/>
                        })
                    }

                    {draw && imgRect && mouseDownPos.x !==0
                        && mouseDownPos.y !==0
                        && mouseUpPos.x !==0
                        && mouseUpPos.y !==0 &&
                        (newShape.type ==="square"
                            ? <rect
                                       x={mouseDownPos.x}
                                       y={mouseDownPos.y}
                                       width={Math.abs(mouseUpPos.x- mouseDownPos.x)}
                                       height={Math.abs(mouseUpPos.y- mouseDownPos.y)}
                                       onClick={() => alert('You have clicked the square.')}/>
                            : <circle
                                      cx={mouseDownPos.x}
                                      cy={mouseDownPos.y}
                                      r={Math.sqrt((mouseUpPos.x- mouseDownPos.x) ** 2
                                          + (mouseUpPos.y- mouseDownPos.y) ** 2)}
                                      onClick={() => alert('You have clicked the circle.')}/>)

                    }
                </g>
            </svg>
        </div>
    )
}