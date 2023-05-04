
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { useState } from 'react'

function Plane(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <shadowMaterial color="#171717" transparent opacity={0.4} />
        </mesh>
    )
}

function Cube(props) {
    const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
    return (
        <mesh receiveShadow castShadow ref={ref}>
            <boxGeometry />
            <meshLambertMaterial color="hotpink" />
        </mesh>
    )
}

export function Scene() {

    const [pageOn, togglePage] = useState(false);

    function toggleButton() {
        togglePage(!pageOn);
    }

    return (
        <>
            <div style={{height: pageOn?'20%':'100%'}}>
                <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }} camera={{ position: [-1, 5, 5], fov: 45 }}>
                    <color attach="background" args={['cornflowerblue']} />
                    <ambientLight />
                    <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} />
                    <Physics>
                        <Plane position={[0, -2.5, 0]} />
                        <Cube position={[0.1, 5, 0]} />
                        <Cube position={[0, 10, -1]} />
                        <Cube position={[0, 20, -2]} />
                    </Physics>
                </Canvas>
            </div>
            <button style={{position:'absolute', top: 0, left: 0, pointerEvents: 'all'}}
            onClick={() => {
                toggleButton();
            }}>
                {pageOn?"Hide page":"See page"}
            </button>
        </>
    )
}