import * as React from 'react';
import {useState} from 'react';

import { calcAbilityMod, getRandomInt } from '../../dndCalc';

import '../../scss/NPCSheet.css';

const NPCSidebarResponse = (props: any) => {
    const [isCollapsed, setCollapsed] = useState(false)

    const onCollapseClick = (e: any) => {
        e.preventDefault()
        setCollapsed(!isCollapsed)
    }
    
    //([props.refKey, props.value, props.numDice, props.diceType, props.damagetype, props.spellValue]) props.extra = [type, ]
    if (props.message.length === 0) {
        return(null)
    }

    if (isNaN(props.message[1])) {//spell
        let msg = props.message[1].replace(/\[(.*?)\]/g, "");
        return (
            <div className={"npcsheet-columnsidebar-itemholder"}>
                <div className={"npcsheet-columnsidebar-collapse-button"}>
                    <button onClick={onCollapseClick}><b>LOG</b></button>
                </div>
                {!isCollapsed ? (
                <div className={"npcsheet-columnsidebar-item"}>
                    <b>{props.message[0]}</b>
                    <div dangerouslySetInnerHTML={{__html: msg}}></div>
                </div>
                ) : (null)}
            </div>
        )
    }
    if (props.message[2] == null && props.message[3] == null && props.message[4] == null && props.message[5] == null) {//dice roll 
        let dice = getRandomInt(1, 20);
        if (props.message[0] == "To Hit") {
            return (
                <div className={"npcsheet-columnsidebar-itemholder"}>
                    <div className={"npcsheet-columnsidebar-collapse-button"}>
                        <button onClick={onCollapseClick}><b>LOG</b></button>
                    </div>
                    {!isCollapsed ? (
                    <div className={"npcsheet-columnsidebar-item"}>
                        <b>{props.message[0]}</b>
                        <p>{dice} + {props.message[1]} = {dice + props.message[1]} to hit.</p>
                    </div>
                    ) : (null) }
                </div>    
            )
        }
        return (
            <div className={"npcsheet-columnsidebar-itemholder"}>
                <div className={"npcsheet-columnsidebar-collapse-button"}>
                    <button onClick={onCollapseClick}><b>LOG</b></button>
                </div>
                {!isCollapsed ? (
                <div className={"npcsheet-columnsidebar-item"}>
                    <b>{props.message[0]}</b>
                    <p>{dice} + {props.message[1]} = {dice + props.message[1]}</p>
                </div>
                ) : (null) }
            </div>
        )
    } else { //hit roll
        let dice = getRandomInt(props.message[2], props.message[3])
        return (
            <div className={"npcsheet-columnsidebar-itemholder"}>
                <div className={"npcsheet-columnsidebar-collapse-button"}>
                    <button onClick={onCollapseClick}><b>LOG</b></button>
                </div>
                {!isCollapsed ? (
                <div className={"npcsheet-columnsidebar-item"}>
                    <b>{props.message[0]}</b>
                    <p>{dice} + {props.message[1]} = {dice + props.message[1]} {props.message[4]} damage.</p>
                </div>
                ) : (null) }
            </div>
        )
    }
}

export default NPCSidebarResponse;