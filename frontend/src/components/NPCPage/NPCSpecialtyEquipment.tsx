import * as React from 'react';

import '../../scss/NPCSheet.css';

import NPCTidbit from './NPCTidbit';
import SpanningContainer from '../containers/SpanningContainer';

/* props for NPCTidbit
 * name      - name of the creature
 * vals     - used for getting value, will refer to item descriptions
 */

const NPCSpecialtyEquipment = (props: any) => {
    if (Object.keys(props.vals).length === 0) {
        return (null)
    }

    const mapItems = Object.entries(props.vals).map(([key, value]) => 
        <NPCTidbit key={key} refKey = {key} value={value} onClick={"itemPrint"} className={"npcitem"} parentCallback={props.parentCallback}></NPCTidbit>
    );

    return (
        <div className={"npcfeature"}>
                <p>
                    <strong className={"npcitem-type"}>Specialty Equipment. </strong> 
                    {props.name} carries the following items:
                    <SpanningContainer>
                        {mapItems}
                    </SpanningContainer> 
                    
                </p>
        </div>
    )
}

export default NPCSpecialtyEquipment;