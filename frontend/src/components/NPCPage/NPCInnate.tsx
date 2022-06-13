import * as React from 'react';

import '../../scss/NPCSheet.css';

import NPCTidbit from './NPCTidbit';
import SpanningContainer from '../containers/SpanningContainer';

/* props for NPCTidbit
 * name        - name of the creature
 * vals        - list of innate spells
 */


const NPCInnate = (props: any) => {
    if (props.vals.length == 0) {
        return (null)
    }

    const mapItems = props.vals.map((vals:any, index:number) => {
        return (
            <NPCTidbit key={index} refKey = {vals[0]} value={vals[2]} numDice={vals[4]} diceType={vals[5]} damageType={vals[3]} spellHit={props.stats[3]} onClick={"itemPrint"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit>
        )
    });

    return (
        <div className={"npcfeature"}>
            <p>
                <b>Innate Spellcasting. </b>
                {props.name}'s innate spellcasting ability is {props.stats[0] + " "}
                (spell save DC {props.stats[2]}, +{props.stats[3]} to hit with spell attacks).
                {" " + props.name} can innately cast the following spells, requiring no components:
                <SpanningContainer>
                    {mapItems}
                </SpanningContainer>
            </p>
        </div>
    )
}

export default NPCInnate