import * as React from 'react';

import '../../scss/CharacterCard.css';

import CharacterCardActions from './CharacterCardActions';
import CharacterCardHeader from './CharacterCardHeader';



const CharacterCard = (props: any) => {
    return (
        <div className="charactercard">
            <CharacterCardHeader characterImage={props.characterImage} characterBackdrop={props.characterBackdrop} characterName={props.characterName} cr={props.cr} characterType={props.characterType} class={props.class}/>
            <CharacterCardActions id={props.id}/>
        </div>
    );
}

export default CharacterCard;