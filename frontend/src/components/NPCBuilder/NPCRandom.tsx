import * as React from "react";
import {useEffect, useState} from 'react';
import {
    useNavigate,
} from "react-router-dom";

import axios from 'axios';

import Container from "../containers/Container";
import Button from "../Button";
import '../../scss/NPCRandom.css';
import Loading from "../Loading";
import Menubar from "../Menubar";

const API = "http://127.0.0.1:5000";

const NPCRandom = (props: any) => {
    const navigate = useNavigate();
    const [race, setRace] = useState(null)
    const [charClass, setCharClass] = useState(null)
    const [isLoading, setLoading] = useState(true)

    const makeRequest = (id: any) => {
        axios.post(`${API}/add`, {'id': id}).then(response => {
            navigate(`/profile/npc/${id}`)
        })
        return true
    }
    
    useEffect(() => {
        axios.get(`${API}/races`).then(response => {
            setRace(response.data)
            axios.get(`${API}/classes`).then(response => {
                setCharClass(response.data)
                setLoading(false)
            })
        })
    }, []);

    if(isLoading) {
        return(
            <Loading />
        )
    }

    const onClick = (e : any) => {
        e.preventDefault();
        var selectedLevel = (document.getElementById('levelSelect') as HTMLInputElement).value;
        var selectedRace = (document.getElementById('raceSelect') as HTMLInputElement).value;
        var selectedClass = (document.getElementById('charClassSelect') as HTMLInputElement).value;
        var isFeat = (document.getElementById('switch') as HTMLInputElement).checked;
        var selectedName = (document.getElementById('charName') as HTMLInputElement).value;

        var payload = { 
                "entityRaceId":  2147483647 ,
                "entityRaceTypeId": 2147483647,
                "classId": 2147483647,
                "allowMulticlass": false,
                "allowFeats": false,
                "level": 20 ,
                "name": ""
        }

        if(parseInt(selectedLevel) != 0) {
            payload.level = parseInt(selectedLevel);
        }
        else {
            delete payload["level"];
        }

        if(parseInt(selectedRace[0]) != 0) {
            const splitRaceArray = selectedRace.split(",");
            payload.entityRaceId = parseInt(splitRaceArray[0]);
            payload.entityRaceTypeId = parseInt(splitRaceArray[1]);
        }
        else {
            delete payload["entityRaceId"];
            delete payload["entityRaceTypeId"];
        }

        if(parseInt(selectedClass) != 0) {
            payload.classId = parseInt(selectedClass);
        }
        else {
            delete payload["classId"];
        }

        payload.allowFeats = isFeat;

        if(selectedName != "") {
            payload.name = selectedName;
        }
        else {
            delete payload["name"];
        }

        axios.post(`${API}/random`, payload).then(response => {
            makeRequest(response.data.id)
        })
    }

    const baseRaces = ["Tiefling", "Dragonborn", "Forest Gnome", "Rock Gnome", "High Elf", "Wood Elf", "Half-Elf", "Half-Orc", "Stout Halfling", "Lightfoot Halfling", "Human", "Orc"];

    let selectedRaces = []

    for(let i=0; i < race.data.length; i++) {
        if(baseRaces.includes(race.data[i].fullName)) {
            selectedRaces.push([race.data[i].fullName, [race.data[i].entityRaceId, race.data[i].entityRaceTypeId]])
        }
        else {
            continue;
        }
    }

    const charLevel = ["--", "1", "2", "3", "4", "5", "6", "7", "8",  "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
    const noRace = ["0","0"]
    
    return(
        <div className="NPCRandomPage">
            <Menubar />
            <Container>
                <div className="title">
                    <h1>Random NPC Creation</h1>
                </div>
                <div className = "form">
                    <form name="randomCharInput" onSubmit = {onClick}>
                        <div className="lSelect">
                            <label className="lSelectLabel">Choose Level</label>
                            <select id="levelSelect">
                                {charLevel.map((val:any, index:number) => {
                                    return <option key={index} value={index}>{val}</option>
                                })}
                            </select>
                        </div>
                        <div className="rSelect">
                            <label className="rSelectLabel">Choose Race</label>
                            <select id="raceSelect">
                                <option value={noRace}>--</option>
                                {selectedRaces.map((val:any, index:number) => {
                                    return <option key={index} value={val[1]}>{val[0]}</option>
                                })}
                            </select>
                        </div>
                        <div className="cSelect">
                            <label className="cSelectLabel">Choose Class</label>
                            <select id="charClassSelect">
                                <option value={0}>--</option>
                                {charClass.data.map((val:any, index:number) => {
                                    return <option key={index} value={val.id}>{val.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="fSelect">
                            <label className="fSelectLabel">Allow Feats</label>
                            <label className="featSwitch">
                                <input id="switch" type="checkbox"></input>
                                <span className="sliderRound"></span>
                            </label>
                        </div>
                        <div className="nSelect">
                            <label className="charName">Character Name </label>
                            <input type="text" className="inputName" id="charName" name="inputName"></input>
                        </div>
                        <div className="submitButton">
                            <Button onClick={onClick} className="requestButton">CREATE NPC</Button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default NPCRandom;