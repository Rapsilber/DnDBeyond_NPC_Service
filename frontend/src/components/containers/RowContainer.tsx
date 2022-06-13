import * as React from 'react';

import '../../scss/Containers.css';

const RowContainer = (props: any) => {
    return (
            <ul className="row-container">
                {props.children}
            </ul>
    );
}

export default RowContainer; 