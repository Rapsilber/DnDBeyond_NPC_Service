import * as React from 'react';

import '../../scss/NPCSheet.css';

/* props for NPCTidbit
 * name      - name of the creature
 * extraAttacks     - used for getting value, will refer to item descriptions
 */

const NPCMultiattack = (props: any) => {

    if (props.extraAttacks == 0) {
        return (null)
    }
    const attacks = ["two", "three", "four", "five", "six", "seven"]
    return (
        <div className={"npcfeature"}>
                <p>
                    <strong className={"npcitem-type"}>Multiattack. </strong>
                    {props.name} makes {attacks[props.extraAttacks - 1]} melee or ranged weapon attacks.  
                </p>
        </div>
    )
}

export default NPCMultiattack;