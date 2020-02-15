import * as CANNON from 'cannon';
import React, {useState, useEffect, useContext, useRef, createContext, ReactNode} from 'react'
import { useFrame } from 'react-three-fiber'
import { Vector3, Quaternion } from 'three';

const context = createContext<CANNON.World | undefined>(undefined);
export function Provider({ children }: { children: ReactNode }) {
    const [world] = useState(() => new CANNON.World());
    useEffect(() => {
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 10;
        world.gravity.set(0, 0, -25);
    }, [world]);

    useFrame(() => world.step(1 / 60));
    return <context.Provider value={world} children={children} />
}

export function useCannon({ ...props }, fn: (body: CANNON.Body) => void, deps = []) {
    const ref = useRef<THREE.Mesh>();
    const world = useContext(context);
    const [body] = useState(() => new CANNON.Body(props));
    useEffect(() => {
        fn(body);
        world?.addBody(body);
    }, deps);

    useFrame(() => {
        if (ref.current) {
            ref.current?.position.copy(new Vector3(
                body.position.x,
                body.position.y,
                body.position.z,
            ));
            ref.current?.quaternion.copy(new Quaternion(
                body.quaternion.x,
                body.quaternion.y,
                body.quaternion.z,
                body.quaternion.w,
            ));
        }
    });

    return ref
}
