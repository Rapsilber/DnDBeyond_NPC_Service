import * as React from 'react';

const NPCSheetHeader = (props: any) => {
    return (
        <div className={"npcsheet-header"}>
            <div>{props.children}</div>
            <div className={"npcsheet-header-meta"}>{props.subtext}</div>
        </div>
    );
};

export default NPCSheetHeader