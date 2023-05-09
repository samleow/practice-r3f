
import { useThree, useFrame } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { motion } from 'framer-motion'
import { LayoutOrthographicCamera, MotionCanvas, motion as motion3d } from "framer-motion-3d"
import { Stats } from "@react-three/drei"

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

function UpdateCamera({ pageOn }) {
    const three = useThree();
    useFrame(() => three.camera.lookAt(3, 0, 0));
}

export function Scene({ pageOn }) {

    return (
        <motion.div className='container' layout>
            <MotionCanvas shadows dpr={[1, 2]} gl={{ alpha: false }} >
                {/* For debugging */}
                {/* <Stats /> */}
                <color attach="background" args={['cornflowerblue']} />
                <LayoutOrthographicCamera position={[10,7,5]} zoom={150}/>
                <ambientLight />
                <directionalLight position={[10, 6, 10]} castShadow shadow-mapSize={[2048, 2048]} />
                <Physics>
                    <Plane position={[0, -2.5, 0]} />
                    <Cube position={[0.1, 5, 0]} />
                    <Cube position={[0, 10, -1]} />
                    <Cube position={[0, 20, -2]} />
                </Physics>
                <UpdateCamera pageOn={pageOn}/>
            </MotionCanvas>
        </motion.div>
    )
}