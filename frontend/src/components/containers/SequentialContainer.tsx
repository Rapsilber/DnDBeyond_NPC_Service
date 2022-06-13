import * as React from 'react';

import '../../scss/Containers.css';

// Signifies a main page, each Container element is followed by the pages content divider.


const SequentialContainer = (props: any) => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
}

export default SequentialContainer;