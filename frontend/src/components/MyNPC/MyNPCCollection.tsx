import * as React from 'react';

import "../../scss/CharacterCard.css";

const MyNPCCollection = (props: any) => {
    return (
        <div className={"charactercard-slots"}>
            <p>MY NPC SLOTS: <b>{props.limit}/Unlimited</b></p>
            {/*Search bar with sort by*/}
        </div>
    );
}

export default MyNPCCollection;