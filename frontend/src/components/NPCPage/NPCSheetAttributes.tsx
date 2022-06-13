import * as React from 'react';
import "../../scss/NPCSheet.css";

const NPCSheetAttributes = (props: any) => {
    return (
        <div className={"npcsheet-attributes"}>
            <div><p><b>Armor Class</b> <em>{props.ac}</em></p></div>
            <div><p><b>Hit Points</b> <em>{props.hp}</em></p></div>
            <div><p><b>Speed</b> <em>{props.speed}</em></p></div>
        </div>
    );
};

export default NPCSheetAttributes