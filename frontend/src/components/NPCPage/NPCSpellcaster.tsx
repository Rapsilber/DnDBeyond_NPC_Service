import * as React from 'react';

import '../../scss/NPCSheet.css';

import NPCTidbit from './NPCTidbit';
import SpanningContainer from '../containers/SpanningContainer';
import CheckBox from '../CheckBox';

/* props for NPCTidbit
 * name        - name of the creature
 * vals        - number spell slots
 * spells      - array of spells by level
 * casterStats - stats of caster 
 * isPactCaster- flag for warlock
 */

const spellLevel = ["Cantrips", "1st level", "2nd level", "3rd level", "4th level", "5th level", "6th level", "7th level", "8th level", "9th level"]

const NPCSpellcaster = (props: any) => {
    if (props.stats.length == 0) {
        return (null)
    }
        //[name, level, spellDesc, type, numdount, dicetype]}
    const mapItems = props.vals.map((vals:any, index:number) => {
        if (index == 0) {
            return (
                <p key={index}>
                    <b>{spellLevel[index]} (at will):</b>
                    <SpanningContainer>
                        {props.spells[index].map((spell:any, index:number) => {
                            return (
                                <NPCTidbit key={index} refKey = {spell[0]} value={spell[2]} numDice={spell[4]} diceType={spell[5]} damageType={spell[3]} spellHit={props.stats[3]} onClick={"itemPrint"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit>
                            )
                        })}
                    </SpanningContainer>
                </p>    
            )
        }
        if (vals == 0) { //if no spell slots of given level
            return (null)
        }
        return (
            <p key={index}>
                <b>
                <SpanningContainer>
                    {spellLevel[index]} ({vals} slots):
                    <CheckBox num={vals} className={"checkbox-" + index}/>
                </SpanningContainer>
                </b>
                <SpanningContainer>
                        {props.spells[index].map((spell:any, index:number) => {
                            return (
                                <NPCTidbit key={index} refKey = {spell[0]} value={spell[2]} numDice={spell[4]} diceType={spell[5]} damageType={spell[3]} spellHit={props.stats[3]} onClick={"itemPrint"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit>
                            )
                        })}
                </SpanningContainer>
            </p>
        )
    });

    var level:string
    if (props.level == 3)
        level = props.level + "rd"
    else if (props.level == 2)
        level = props.level + "nd"
    else if (props.level == 1)
        level = props.level + "st"
    else 
        level = props.level + "th"   
    
    if (props.isPactCaster) {
        return (
            <div className={"npcfeature"}>
                <p>
                    <b>Spellcasting. </b>
                    {props.name} is a {level}-level spellcaster. Their spellcasting ability is {props.stats[0] + " "}
                    (spell save DC {props.stats[2]}, +{props.stats[3]} to hit with spell attacks). {/*if has at wills*/}
                    {" " + props.name} has the following spells prepared:
                </p>
                <p>
                    <b>Cantrips (at will):</b>
                    <SpanningContainer>
                        {props.spells[0].map((spell:any, index:number) => {
                            return (
                                <NPCTidbit key={index} refKey = {spell[0]} value={spell[2]} numDice={spell[4]} diceType={spell[5]} damageType={spell[3]} spellHit={props.stats[3]} onClick={"itemPrint"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit>
                            )
                        })}
                    </SpanningContainer>
                </p>
                <p>
                    <b>
                        <SpanningContainer>
                            {spellLevel[props.vals[1]]} ({props.vals[0]} slots):
                            <CheckBox num={props.vals[0]} className={"checkbox-" + props.vals[1]}/>
                        </SpanningContainer>
                    </b>
                    <SpanningContainer>
                        {props.spells[1].map((spell:any, index:number) => {
                            return (
                                <NPCTidbit key={index} refKey = {spell[0]} value={spell[2]} numDice={spell[4]} diceType={spell[5]} damageType={spell[3]} spellHit={props.stats[3]} onClick={"itemPrint"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit>
                            )
                        })}
                        {props.spells[2].map((spell:any, index:number) => {
                            return (
                                <NPCTidbit key={index} refKey = {spell[0]} value={spell[2]} numDice={spell[4]} diceType={spell[5]} damageType={spell[3]} spellHit={props.stats[3]} onClick={"itemPrint"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit>
                            )
                        })}
                        {props.spells[3].map((spell:any, index:number) => {
                            return (
                                <NPCTidbit key={index} refKey = {spell[0]} value={spell[2]} numDice={spell[4]} diceType={spell[5]} damageType={spell[3]} spellHit={props.stats[3]} onClick={"itemPrint"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit>
                            )
                        })}
                        {props.spells[4].map((spell:any, index:number) => {
                            return (
                                <NPCTidbit key={index} refKey = {spell[0]} value={spell[2]} numDice={spell[4]} diceType={spell[5]} damageType={spell[3]} spellHit={props.stats[3]} onClick={"itemPrint"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit>
                            )
                        })}
                        {props.spells[5].map((spell:any, index:number) => {
                            return (
                                <NPCTidbit key={index} refKey = {spell[0]} value={spell[2]} numDice={spell[4]} diceType={spell[5]} damageType={spell[3]} spellHit={props.stats[3]} onClick={"itemPrint"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit>
                            )
                        })}
                    </SpanningContainer>
                </p>
            </div>   
        )
    }

    return (
        <div className={"npcfeature"}>
            <p>
                <b>Spellcasting. </b>
                {props.name} is a {level}-level spellcaster. Their spellcasting ability is {props.stats[0] + " "}
                (spell save DC {props.stats[2]}, +{props.stats[3]} to hit with spell attacks). {/*if has at wills*/}
                {" " + props.name} has the following spells prepared:
            </p>
            {mapItems}
        </div>
    )
}

export default NPCSpellcaster