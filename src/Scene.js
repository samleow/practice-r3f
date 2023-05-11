
import { useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { motion, useMotionValue } from 'framer-motion'
import { LayoutOrthographicCamera, MotionCanvas, motion as motion3d } from "framer-motion-3d"
import { Stats, OrbitControls, Select, useSelect } from "@react-three/drei"

function UpdateCamera({ pageOn }) {
    const three = useThree();
    useFrame(() => three.camera.lookAt(0, 0, 0));
}

function CreateGrid(setSelected) {
    let grid = [
        [-5, -5], [-5, -4], [-5, -3], [-5, -2], [-5, -1], [-5, 0], [-5, 1], [-5, 2],
        [-4, -5], [-4, -4], [-4, -3], [-4, -2], [-4, -1], [-4, 0], [-4, 1],
        [-3, -5], [-3, -4], [-3, -3], [-3, -2], [-3, -1], [-3, 0],
        [-2, -5], [-2, -4], [-2, -3], [-2, -2], [-2, -1], [-2, 0],
        [-1, -5], [-1, -4], [-1, -3], [-1, -2], [-1, -1], [-1, 0],
        [ 0, -5], [ 0, -4], [ 0, -3], [ 0, -2], [ 0, -1], [ 0, 0], [ 0, 1], [ 0, 2],
        [ 1, -5], [ 1, -4], [ 1, -3], [ 1, -2], [ 1, -1], [ 1, 0], [ 1, 1], [ 1, 2],
        [ 2, -5], [ 2, -4], [ 2, -3], [ 2, -2], [ 2, -1],
        [ 3, -5], [ 3, -4], [ 3, -3],
        [ 4, -5], [ 4, -4]
    ];
    
    return (
        <Select onChange={setSelected}>
            {
                grid.map((p,i) => {
                    return (
                        <FloorPanel points={p} index={i} />
                    )
                })
            }
        </Select>
    )
}

function FloorPanel (coord) {
    
    return (
        <motion3d.mesh key={coord.index} position={[ coord.points[0]+0.5, -0.1, coord.points[1]+0.5]}
        initial={{y: 7}}
        animate={{y: -0.1}}
        transition={{type: 'spring', duration: 0.5, delay: coord.index/20}}
        // TODO: make use of coord from onClick to set targetPos
        // maybe don't even need Select
        onClick={(e) => console.log(e, coord)}
        >
            <boxGeometry args={[1, 0.2, 1]}/>
            <meshLambertMaterial color="darksalmon" />
        </motion3d.mesh>
    )
}

function Sphere(targetPos) {
    
    return (
        <motion3d.mesh position={[ 0, 0.5, 0]}
        initial={{y: 7}}
        animate={{y: 0.5}}
        whileHover={{x: 1}}
        transition={{y:{type: 'spring', duration: 0.7, delay: 3}}}
        >
            <sphereGeometry args={[0.5]}/>
            <meshLambertMaterial color="lawngreen" />
        </motion3d.mesh>
    )
}

export function Scene({ pageOn }) {

    const [targetPos, setTargetPos] = useState({ x: 0, z: 0 })
    const [selected, setSelected] = useState([])

    return (
        <motion.div layout style={{ height: pageOn?'20%':'100%' }}
        transition={{ duration: 0.4 }}
        >
            <MotionCanvas shadows dpr={[1, 2]} gl={{ alpha: false }} >
                {/* For debugging */}
                {/* <Stats /> */}
                <color attach="background" args={['cornflowerblue']} />
                <LayoutOrthographicCamera position={[5,3,5]} zoom={150}/>
                <ambientLight />
                <directionalLight position={[10, 6, 10]} castShadow shadow-mapSize={[2048, 2048]} />
                <Sphere targetPos={targetPos}/>

                <CreateGrid setSelected={setSelected}/>
                <gridHelper />
                {/* <OrbitControls /> */}
                <UpdateCamera pageOn={pageOn}/>
            </MotionCanvas>
        </motion.div>
    )
}