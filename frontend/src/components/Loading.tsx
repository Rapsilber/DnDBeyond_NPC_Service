import * as React from 'react';

import '../scss/Load.css';

const Loading = (props: any) => {
    return (
        <div className="load-group">
            <div className="load-logo"></div>
            <div className="spinning-loader"></div>
        </div>
    );
}

export default Loading;