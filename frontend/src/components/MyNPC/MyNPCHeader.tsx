import * as React from 'react';
import {
    useNavigate,
} from 'react-router-dom';

import Button from '../Button';
import '../../scss/CharacterCard.css';

const MyNPCHeader = () => {
    const navigate = useNavigate()

    const onClick = (e: any) => {
        e.preventDefault();
        navigate(`/npc/builder`);
    };

    return (
        <header>
            <div className={"mynpcs-header"}>
                <h1>My NPCs</h1>
                <div>
                    <Button className="mynpc-button" onClick={onClick}><b>CREATE NPC</b></Button>
                </div>
            </div>
        </header>
    );
}

export default MyNPCHeader;