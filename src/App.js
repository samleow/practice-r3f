
import { useState } from 'react'
import { Scene } from './Scene';
import { Homepage } from './Homepage';

export function App() {

    const [pageOn, togglePage] = useState(false);

    function toggleButton() {
        togglePage(!pageOn);
    }

    return (
        <div page-on={pageOn?"true":"false"} style={{width: '100%', height: '100%'}}>
            <Scene pageOn={pageOn} />
            <Homepage />
            <button style={{position:'absolute', top: 20, right: 20, pointerEvents: 'all'}}
            onClick={() => {
                toggleButton();
            }}>
                {pageOn?"Hide page":"See page"}
            </button>
        </div>
    )
}