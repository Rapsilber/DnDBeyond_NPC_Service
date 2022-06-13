import * as React from 'react';

import '../../scss/NPCSheet.css';

import {getRandomInt} from '../../dndCalc';

/* props for NPCTidbit
 * key       - used for mappings
 * refKey    - used for getting mapping values
 * value     - used for getting value
 * property  - used for getting property tag for printables
 * onClick   - used for specifying click method
 * className - specify className of tidbit
 */

const NPCTidbit = (props: any) => {
    const onRollClick = (e: any) => {
        e.preventDefault();
        let num = getRandomInt(1, 20)
        console.log(props.refKey + " " + (num + (parseInt(props.value))))
        callback(props.refKey + " " + (num + (parseInt(props.value))))
    };

    const onHitClick = (e: any) => {
        e.preventDefault();
        let num = getRandomInt(props.numDice, props.diceType)
        if (props.value == null) {
            console.log(props.refKey + " " + (num))
            callback(props.refKey + " " + (num))
        } else {
            console.log(props.refKey + " " + (num + (parseInt(props.value))))
            callback(props.refKey + " " + (num + (parseInt(props.value))))
        }
    }

    const onItemPrintClick = (e: any) => {
        e.preventDefault();
        console.log(props.refKey + ": " + props.value)
        callback(props.refKey + ": " + props.value)
    }

    const callback = (msg:any) => {
        props.parentCallback(msg)
    }

    const onClick = (e: any) => {
        props.parentCallback([props.refKey, props.value, props.numDice, props.diceType, props.damageType, props.spellHit])
        console.log([props.refKey, props.value, props.numDice, props.diceType, props.damageType, props.spellHit])
    }

    switch (props.onClick) {
        case ("itemPrint"): //refkey, value
            return (
                <span className={props.className} onClick={onClick}>
                    &nbsp;<em>{props.refKey}</em>&nbsp;
                </span>
            );
        case ("onHit"):
            if (props.value == null) {
                return (
                    <span className={props.className} onClick={onClick}>
                        <span>&nbsp;{props.refKey}&nbsp;</span>
                        &nbsp;<em> {props.numDice}d{props.diceType}</em>&nbsp;
                    </span>    
                )
            }      
            return ( 
                <span className={props.className} onClick={onClick}>
                    <span>&nbsp;{props.refKey}&nbsp;</span>
                    <em>{props.numDice}d{props.diceType}+{props.value}&nbsp;</em>
                </span>
            );
        case ("roll"):
        default:
            if (props.value < 0) {
                return (
                    <span className={props.className} onClick={onClick}>
                        <span>&nbsp;{props.refKey}&nbsp;</span>
                        <em>{props.value}&nbsp;</em>
                    </span>
                )
            }
            return (
                <span className={props.className} onClick={onClick}>
                    <span>&nbsp;{props.refKey}</span>
                    <em>&nbsp;+{props.value}&nbsp;&nbsp;</em>
                </span>
            ); 
    }
}

export default NPCTidbit;