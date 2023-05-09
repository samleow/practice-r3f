import './index.css';
import * as THREE from 'three';
import { extend } from '@react-three/fiber'
import { createRoot } from 'react-dom/client';
import { App } from './App';

extend(THREE);

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
    <App />
)