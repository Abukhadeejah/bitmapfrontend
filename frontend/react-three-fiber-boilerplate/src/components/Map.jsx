/* eslint-disable jsx-a11y/alt-text */
import { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useControls } from 'react-zoom-pan-pinch';

export default function Map() {
    const [flag, setFlag] = useState(false);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [myData, setMyData] = useState([]);
    const Test = () => {
        const { instance, zoomIn, zoomOut, ...rest } = useControls();

        useEffect(() => {
            if (!flag) {
                return
            } else {
                instance.setTransformState(100, -(posX - 6) * 100, -(posY - 3) * 100);
            }

        }, [posX, posY])

        return (
            <>

            </>
        )
    }

    const [grids, setGrids] = useState([]);
    const updateGrid = (ref) => {
        console.log(ref.state.scale)
        if (ref.state.scale > 99) {
            const newData = [-Math.floor(ref.state.positionX / ref.state.scale), -Math.floor(ref.state.positionY / ref.state.scale)];
            console.log(newData)
            setGrids(newData);
        } else {
            setGrids([])
        }

    }
    return (
        <TransformWrapper
            maxScale={100}
            doubleClick={false}
            className="transform-wrapper"
            wheel={{
                step: 0.2, smoothStep: 0.05
            }}
            onZoom={(ref, event) => {
                updateGrid(ref, event);
            }}
            onTransformed={(ref, event) => {
                updateGrid(ref, event)
            }}
        >
            <Test />
            <TransformComponent>
                <img src="/img/map.svg" alt="test" />
                <svg width="1000" height="800" style={{ position: 'absolute', left: 0, top: 0 }}>
                    <defs>
                        <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.1" />
                        </pattern>
                        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <rect width="100" height="100" fill="url(#smallGrid)" />
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {myData && myData.map((item, index) => (
                        <rect
                            key={index}
                            y={Math.floor(parseInt(item.bitmap) / 1000)}
                            x={Math.floor(parseInt(item.bitmap) % 1000) - 1}
                            width="1"
                            height="1"
                        />
                    ))}
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {Array.from({ length: 30 }, (_, index) => (
                        <text x={grids[0] + 0.3 + index} y={grids[1] + 0} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1) * 1000}</text>
                    ))}
                    {Array.from({ length: 30 }, (_, index) => (
                        <text x={grids[0] + 0.3 + index} y={grids[1] + 1} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 1) * 1000}</text>
                    ))}
                    {Array.from({ length: 30 }, (_, index) => (
                        <text x={grids[0] + 0.3 + index} y={grids[1] + 2} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 2) * 1000}</text>
                    ))}
                    {Array.from({ length: 30 }, (_, index) => (
                        <text x={grids[0] + 0.3 + index} y={grids[1] + 3} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 3) * 1000}</text>
                    ))}
                    {Array.from({ length: 30 }, (_, index) => (
                        <text x={grids[0] + 0.3 + index} y={grids[1] + 4} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 4) * 1000}</text>
                    ))}
                    {Array.from({ length: 30 }, (_, index) => (
                        <text x={grids[0] + 0.3 + index} y={grids[1] + 5} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 5) * 1000}</text>
                    ))}
                    {Array.from({ length: 30 }, (_, index) => (
                        <text x={grids[0] + 0.3 + index} y={grids[1] + 6} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 6) * 1000}</text>
                    ))}
                    {Array.from({ length: 30 }, (_, index) => (
                        <text x={grids[0] + 0.3 + index} y={grids[1] + 7} fontSize="0.2" fill="white">{grids[0] + index + 1 + (grids[1] - 1 + 7) * 1000}</text>
                    ))}

                </svg>
            </TransformComponent>
        </TransformWrapper>
    );
}