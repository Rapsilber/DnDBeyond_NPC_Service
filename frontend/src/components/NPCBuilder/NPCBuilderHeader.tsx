import * as React from 'react';
import '../../scss/NPCBuilder.css';

const NPCBuilderHeader = () => {
    return (
        <div>
            <div className="builderPageHeader">
                <h1>NON-PLAYABLE CHARACTER CREATION</h1>
            </div>
            <div className="builderPageSubhead"> 
                <h3>Choose a creation method.</h3>
            </div>
        </div>
    );
    
};

export default NPCBuilderHeader;