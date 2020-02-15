import React, {Fragment, useState} from 'react';
import {createGlobalStyle} from "styled-components";
import reset from "styled-reset/lib";
import {Provider, useCannon} from "./use-cannon";
import {Canvas} from "react-three-fiber";
import * as CANNON from 'cannon';

const GlobalStyle = createGlobalStyle`
    ${reset}
    
    * {
        box-sizing: border-box;
    }
    
    html,
    body,
    #root {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #272727;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        overflow: hidden;
    }
    
    body {
        position: fixed;
        overflow: hidden;
        overscroll-behavior-y: none;
        font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
        color: black;
    }
    
    .main {
        position: relative;
        width: 100%;
        height: 100%;
        color: white;
        overflow: hidden;
    }
    
    canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        pointer-events: none;
        overflow: hidden;
    }
`;

function Plane({ position }: {position: number[]}) {
    const ref = useCannon({ mass: 0 }, body => {
        body.addShape(new CANNON.Plane());
        const [x, y, z] = position;
        body.position.set(x, y, z);
    });
    return (
        <mesh ref={ref} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            <meshPhongMaterial attach="material" color="#272727" />
        </mesh>
    )
}

function Box({ position }: {position: number[]}) {
    const ref = useCannon({ mass: 100000 }, body => {
        body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)))
        const [x, y, z] = position;
        body.position.set(x, y, z);
    });

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxGeometry attach="geometry" args={[2, 2, 2]} />
            <meshStandardMaterial attach="material" />
        </mesh>
    )
}

const App = () => {
    const [down, set] = useState(false);

    return (
        <Fragment>
            <GlobalStyle/>
            <Canvas
                className="main"
                shadowMap
                camera={{ position: [0, 0, 15] }}
                onMouseUp={() => set(false)}
                onMouseDown={() => set(true)}
            >
                <ambientLight intensity={0.5} />
                <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
                <Provider>
                    <Plane position={[0, 0, 0]} />
                    <Box position={[1, 0, 1]} />
                    <Box position={[2, 1, 5]} />
                    <Box position={[0, 0, 6]} />
                    <Box position={[-1, 1, 8]} />
                    <Box position={[-2, 2, 13]} />
                    <Box position={[2, -1, 13]} />
                </Provider>
            </Canvas>
        </Fragment>
    );
};

export default App;
