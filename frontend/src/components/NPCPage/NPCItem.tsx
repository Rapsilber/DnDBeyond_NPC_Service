import * as React from 'react';

import '../../scss/NPCSheet.css';
import SpanningContainer from '../containers/SpanningContainer';

const NPCItem = (props: any) => {

    if (props.items === undefined)
        return(null)

    return (
        <p>
            <b className={"npctidbit-type"}>{props.item}</b>
            <SpanningContainer>{props.items}</SpanningContainer>
        </p>
    );
};

export default NPCItem;