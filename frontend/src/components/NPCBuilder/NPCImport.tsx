import * as React from "react";
import {
    useNavigate,
} from "react-router-dom";

import axios from 'axios';

import Container from "../containers/Container";
import "../../scss/NPCImport.css";
import Menubar from "../Menubar";

const API = "http://127.0.0.1:5000";

const NPCImport = () => {
    const navigate = useNavigate();
    
    const makeRequest = (id: any) => {
        axios.post(`${API}/add`, {'id': id})
        return true
    }

    const onClick = (e: any) => {
        e.preventDefault(); 
        var importLink = (document.getElementById("char") as HTMLInputElement).value;
        const splitImportLink = importLink.split("/");
        if (makeRequest(splitImportLink[splitImportLink.length - 1]))
            navigate(`/profile/npc/${splitImportLink[splitImportLink.length - 1]}`);
    };
    
    return (
        <div className="NPCImportPage">
            <Menubar />
            <Container>
                <div className="title">
                    <h1>Character to NPC Import</h1>
                </div>
                <div className="form">
                    <form name="input" onSubmit={onClick}>
                        <label className="charIdText">Character URL Link: </label>
                        <input type="text" className="inputChar" id="char" name="char"></input>
                        <input type="submit" value="IMPORT CHARACTER" className="requestButton"></input>
                    </form>
                </div>
            </Container>
        </div>
        
    );
}

export default NPCImport;
