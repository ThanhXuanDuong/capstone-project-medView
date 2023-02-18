import Shape from "../types/Shape";

export function DrawShapes({shapes}:{shapes:Shape[]}) {

    return (
        <div style={{ position: "fixed",width: '100%', height: '100vh', top:0, right:0}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" >
                <g stroke="#FFCE44" fill="transparent" strokeWidth="3">
                    {
                        shapes.map(shape =>  shape.type ==="square"
                            ? <rect x={shape.point1[0]}
                                    y={shape.point1[1]}
                                    width={shape.point2[0]-shape.point1[0]}
                                    height={shape.point2[1]-shape.point1[1]}
                                    onClick={() => alert('You have clicked the square.')}/>
                            : <circle cx={shape.point1[0]}
                                      cy={shape.point1[1]}
                                      r={Math.sqrt((shape.point2[0]-shape.point1[0])**2
                                          + (shape.point2[1]-shape.point1[1])**2)}
                                      onClick={() => alert('You have clicked the circle.')}/>
                        )
                    }
                </g>
            </svg>
        </div>
    )
}