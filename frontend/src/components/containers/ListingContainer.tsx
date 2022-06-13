import * as React from 'react';

import '../../scss/Containers.css';

const ListingContainer = (props: any) => {
    return (
        <div>
            <ul className="listing-container">
                {props.children}
            </ul>
        </div>
    );
}

export default ListingContainer; 