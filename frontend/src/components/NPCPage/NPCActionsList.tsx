import * as React from 'react';

import '../../scss/NPCSheet.css';

import NPCTidbit from './NPCTidbit';
import SpanningContainer from '../containers/SpanningContainer';

/* props for NPCTidbit
 * name      - name of the creature
 * vals     - used for getting value, will refer to item descriptions
 */

const NPCActionsList = (props: any) => {
    if (Object.keys(props.vals).length == 0) {
        return (null)
    }

    const stats = {"STR": "Strength", "DEX": "Dexterity", "CON": "Constitution", "INT": "Intelligence", "WIS": "Wisdom", "CHA": "Charisma"}

//[name, toHit, saveInfo, label, origin, range, damagetype, numdice, dicetpye, mod, longrangevalue]
    const mapItems = props.vals.map((vals: any, index: number) => {
        if (vals[6] == null)
            vals[6] = "Bludgeoning"

        if (vals[1] == null) { //save / auto hit /class feature
            if (vals[0] === "Necrotic Husk: Revival") {
                return (
                    <p key={index}>
                        <strong className={"npcitem-type"}>{vals[0]} </strong>
                        If {props.name} is reduced to 0 HP, they can instead use their reaction to drop to 1 HP instead and deal necrotic damage to each creature within {vals[5]} ft.
                        of them, equal to {vals[7]*vals[8]/2 + vals[9]} ({vals[7]}d{vals[8]} + {vals[9]}) {vals[6]} damage.
                        <SpanningContainer>
                            <NPCTidbit refKey = {"Hit"} value={vals[9]} numDice={vals[7]} diceType={vals[8]} damageType={vals[6]} onClick={"onHit"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit> 
                        </SpanningContainer>
                    </p>
                )
            }
            return(
                <p key={index}>
                    <strong className={"npcitem-type"}>{vals[6]} Breath. </strong>
                    {props.name} exhales elemental energy in a {vals[5]}-foot cone.
                    Each creature in that area must make a DC {vals[2]["value"]} {stats[vals[2]["label"] as keyof typeof stats]}
                    {" "}saving throw, taking {vals[7]*vals[8]/2 + vals[9]} ({vals[7]}d{vals[8]}) {vals[6]} damage on a failed save, or half
                    as much damage on a successful one.
                    <SpanningContainer>
                        <NPCTidbit refKey = {"Hit"} value={vals[9]} numDice={vals[7]} diceType={vals[8]} damageType={vals[6]} onClick={"onHit"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit> 
                    </SpanningContainer>
                </p>
            )
        }

        vals[6] = vals[6].charAt(0).toLowerCase() + vals[6].slice(1)
        if (vals[3] != "") { //melee
            return (
                <p key={index}>
                    <b className={"npcitem-type"}>{vals[0]}. </b>
                    <em>Melee Weapon Attack: </em>
                    +{vals[1]} to hit, reach {vals[5]} ft., one target. Hit: {vals[8]/2 + vals[9]} ({vals[7]}d{vals[8]}+{vals[9]}) {vals[6]} damage.
                    <SpanningContainer>
                        <NPCTidbit refKey = {"To Hit :"} value={vals[1]} onClick={"roll"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit> 
                        <NPCTidbit refKey = {"Damage :"} value={vals[9]} numDice={vals[7]} diceType={vals[8]} damageType={vals[6]} onClick={"onHit"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit> 
                    </SpanningContainer>
                </p>
            )
        } else { //ranged
            return (
                <p key={index}>
                    <b className={"npcitem-type"}>{vals[0]}. </b>
                    <em>Ranged Weapon Attack: </em>
                    +{vals[1]} to hit, range {vals[5]}/{vals[10]} ft., one target. Hit: {vals[8]/2 + vals[9]} ({vals[7]}d{vals[8]}+{vals[9]}) {vals[6]} damage.
                    <SpanningContainer>
                        <NPCTidbit refKey = {"To Hit :"} value={vals[1]} onClick={"roll"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit> 
                        <NPCTidbit refKey = {"Damage :"} value={vals[9]} numDice={vals[7]} diceType={vals[8]} damageType={vals[6]} onClick={"onHit"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit> 
                    </SpanningContainer>
                </p>
            )
        }
    });
        
    

    return (
        <div className={"npcfeature"}>
                {mapItems}
        </div>
    )
}

export default NPCActionsList;