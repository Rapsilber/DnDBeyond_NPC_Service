import * as React from 'react';
import SpanningContainer from '../containers/SpanningContainer';

import NPCTidbit from './NPCTidbit';
import "../../scss/NPCSheet.css";

/* props for NPCTidbitMapping
 * title     - what appears on the sheet as heading.
 * vals      - associative array for mapping
 * property  - used for getting property tag for printables
 * onClick   - used for specifying click method
 * className - specify tidbit class
 */

const NPCTidbitMapping = (props: any) => {

    if (props.vals.length === 0) {
        return (null)
    }

    const mapItems = Object.entries(props.vals).map(([key, value]) =>
        <NPCTidbit key={key} refKey = {key} value={value} onClick={props.onClick} property={props.property} className={"npctidbit"} parentCallback={props.parentCallback}></NPCTidbit>
    );

    return (
        <p className={"tidbitmapping-para"}>
            <b className={"npctidbit-type"}>{props.title}</b>
        <SpanningContainer>
            {mapItems}
        </SpanningContainer>
        </p>
    );
}

export default NPCTidbitMapping;