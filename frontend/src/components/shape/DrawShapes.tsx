import Shape from "../../types/Shape";

export function DrawShapes({
    shapes,
    imgPosition,
    draw,
    newShape
}:{
    shapes:Shape[],
    imgPosition:DOMRect|undefined,
    draw: boolean,
    newShape: Shape
}) {
    return (
        <div style={{ position: "fixed",width: '100%', height: '100vh', top:0, right:0}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" >
                <g stroke="#FFCE44" fill="transparent" strokeWidth="3">
                    {imgPosition && shapes.map(shape => {
                        const point1X= Math.round(shape.point1[0] * imgPosition.width + imgPosition.left);
                        const point1Y= Math.round(shape.point1[1] * imgPosition.height + imgPosition.top);
                        const point2X= Math.round(shape.point2[0] * imgPosition.width + imgPosition.left);
                        const point2Y= Math.round(shape.point2[1] * imgPosition.height + imgPosition.top);
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

                    {draw && newShape.point1[0] !==0
                        && newShape.point1[1] !==0
                        && newShape.point2[0] !==0
                        && newShape.point2[1] !==0 &&
                        (newShape.type ==="square"
                            ? <rect key={newShape.id}
                                       x={newShape.point1[0]}
                                       y={newShape.point1[1]}
                                       width={Math.abs(newShape.point2[0]- newShape.point1[0])}
                                       height={Math.abs(newShape.point2[1]- newShape.point1[1])}
                                       onClick={() => alert('You have clicked the square.')}/>
                            : <circle key={newShape.id}
                                      cx={newShape.point1[0]}
                                      cy={newShape.point1[1]}
                                      r={Math.sqrt((newShape.point2[0]- newShape.point1[0]) ** 2
                                          + (newShape.point2[1]- newShape.point1[1]) ** 2)}
                                      onClick={() => alert('You have clicked the circle.')}/>)

                    }
                </g>
            </svg>
        </div>
    )
}