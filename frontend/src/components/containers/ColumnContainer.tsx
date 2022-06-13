import * as React from 'react';

import '../../scss/Containers.css';

const ColumnContainer = (props: any) => {
    return (
        <div className="column-container">
            {props.children}
        </div>
    );
}

export default ColumnContainer; 