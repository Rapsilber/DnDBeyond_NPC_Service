import * as React from 'react';

import '../../scss/NPCUsable.css';


//this class contains any clickable or interactable action a npc may take.

const NPCUsable = (props: any) => {

    return (
            <em className={"npcusable"} onClick={props.onClick}>{props.usableName}</em>
    );
}

export default NPCUsable;