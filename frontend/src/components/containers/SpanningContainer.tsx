import * as React from 'react';

import '../../scss/Containers.css';



const SpanningContainer = (props: any) => {
    return (
        <span className="spanning-container">{props.children}</span>
    );
}

export default SpanningContainer;