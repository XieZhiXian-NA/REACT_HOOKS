import React from 'react'

import './Journey.css'
import switchImg from './imgs/switch.svg'
export default function Journey(props) {
 
    const {from,to,exchangeFromTo,showCitySelector} = props; 

    return (
        <div className="journey">
            <div className="journey-station"
                 // ture 代表回显到左边
                 onClick={()=>showCitySelector(true)}
            >
                <input type="text" readOnly  name="from" value={from} className="journey-input journey-from "></input>
            </div>
            <div className="journey-switch"
                 onClick={exchangeFromTo}
            >
                <img src={switchImg} width="70" height="40" alt="switch"/>
            </div>

            <div className="journey-station"
                 onClick={()=>showCitySelector(false)}
            >
            <input type="text" readOnly  name="from" value={to} className="journey-input journey-to "></input>
            </div>
            
        </div>
    )
}
