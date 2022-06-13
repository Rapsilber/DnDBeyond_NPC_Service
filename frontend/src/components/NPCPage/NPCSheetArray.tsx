import * as React from 'react';
import RowContainer from '../containers/RowContainer';
import NPCAbility from './NPCAbility';

import {calcAbilityMod, getRandomInt} from '../../dndCalc';

const NPCSheetArray = (props: any) => {
    return (
        <div className={"npcsheet-array"}>
            <RowContainer>
                <NPCAbility ability="STR" val={props.str} parentCallback={props.parentCallback}>{"STR"}</NPCAbility>
                <NPCAbility ability="DEX" val={props.dex} parentCallback={props.parentCallback}>{"DEX"}</NPCAbility>
                <NPCAbility ability="CON" val={props.con} parentCallback={props.parentCallback}>{"CON"}</NPCAbility>
            </RowContainer>
            <RowContainer>
                <NPCAbility ability="INT" val={props.int} parentCallback={props.parentCallback}>{"INT"}</NPCAbility>
                <NPCAbility ability="WIS" val={props.wis} parentCallback={props.parentCallback}>{"WIS"}</NPCAbility>
                <NPCAbility ability="CHA" val={props.cha} parentCallback={props.parentCallback}>{"CHA"}</NPCAbility>
            </RowContainer>
        </div>
    );
};

export default NPCSheetArray;