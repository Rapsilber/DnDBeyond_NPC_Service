import * as React from 'react';
import ListingContainer from '../containers/ListingContainer';

import CharacterCard from './CharacterCard';

const CharacterCardMapping = (props: any) => {

    if (props.vals.length === 0) {
        return (null)
    }

    const mapItems = props.vals.map((vals:any, index:number) => 
        <CharacterCard key={index} id={vals.id} characterImage={vals.avatarUrl} characterBackdrop={vals.backdropUrl} characterName={vals.name} cr={Math.floor(2 * vals.level / 3)} characterType={vals.raceName} class={vals.classDescription}/>
    );

    return (
        <ListingContainer>
            {mapItems}
        </ListingContainer>
    );
}

export default CharacterCardMapping;