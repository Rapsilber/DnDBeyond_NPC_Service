import * as React from 'react';
import {
    useNavigate,
} from "react-router-dom";


import Button from '../Button';
import '../../scss/CharacterCard.css';

import ListingContainer from '../containers/ListingContainer';
import RowContainer from '../containers/RowContainer';

const CharacterCardActions = (props: any) => {
    const navigate = useNavigate()

    const onClick = (e: any) => {
        e.preventDefault(); 
        navigate(`/profile/npc/${props.id}`);
    };

    return (
            <RowContainer>
                <Button className="charactercard-button" onClick={onClick}>VIEW</Button>
            </RowContainer>
    );
}

export default CharacterCardActions;