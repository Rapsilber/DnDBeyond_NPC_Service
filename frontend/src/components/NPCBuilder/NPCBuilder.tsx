import * as React from 'react';
import {
    useNavigate,
} from "react-router-dom";

import ListingContainer from '../containers/ListingContainer';
import Container from '../containers/Container';

import Button from '../Button';
import '../../scss/NPCBuilder.css';
import NPCBuilderHeader from './NPCBuilderHeader';
import Menubar from "../Menubar";

const NPCBuilder = () => {
    const navigate = useNavigate();
    
    const onImportClick = (e: any) => {
        e.preventDefault();
        navigate(`/npc/builder/import`);
    };
    
    const onImportClickSCDS = (e: any) => {
        e.preventDefault();
        navigate(`/npc/builder/import`);
    };

    const onRandomClick = (e : any) => {
        e.preventDefault();
        navigate(`/npc/builder/random`);
    };
    return (
        <div className="NPCBuilderPage">
            <Menubar />
            <Container>
                <div className="centered-page">
                    <NPCBuilderHeader />
                    <ListingContainer>
                        {/*<Button onClick={() => console.log("Clicked")} className={"npcbuilder-button"}>STANDARD <p>Create a NPC by making choices using a step-by-step approach.</p></Button>*/}
                        <Button onClick={onRandomClick} className={"npcbuilder-button"}>RANDOM <p>Create a NPC by selecting or randomizing choices.</p></Button>
                        <Button onClick={onImportClick} className={"npcbuilder-button"}>IMPORT <p>Create a NPC by importing an existing character.</p></Button>
                    </ListingContainer>
                </div>
            </Container>
        </div>
    );
}

export default NPCBuilder;