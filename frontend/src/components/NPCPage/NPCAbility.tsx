import * as React from 'react';

import '../../scss/NPCSheet.css';
import { calcAbilityMod, getRandomInt } from '../../dndCalc';
import NPCUsable from './NPCUsable';

const NPCAbility = (props: any) => {

    const onClick = (e: any) => {
        e.preventDefault();
        props.parentCallback([props.children, calcAbilityMod(props.val), null, null, null])
    };

    return (
        <div className={"npcability"} onClick={onClick}>
            <div><b>{props.ability}</b></div>
            <em>{props.val}</em>
        </div>
    );
};

export default NPCAbility;