import './index.css'
import { createRoot } from 'react-dom/client';
import { Scene } from './Scene';
import { Homepage } from './Homepage';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <>
    <Scene />
    <Homepage />
  </>
)