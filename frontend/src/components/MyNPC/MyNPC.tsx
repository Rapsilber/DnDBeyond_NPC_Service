import * as React from 'react';
import {useEffect, useState} from 'react';

import axios from 'axios';

import ListingContainer from '../containers/ListingContainer';
import Container from '../containers/Container';
import Loading from '../Loading';
import Menubar from '../Menubar';

import MyNPCCollection from './MyNPCCollection';
import MyNPCHeader from './MyNPCHeader';
import CharacterCardMapping from './CharacterCardMapping';

import '../../scss/MyNPC.css';

const API = "http://127.0.0.1:5000";

const MyNPC = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const makeRequest = () => {
        axios.get(`${API}/characters`).then(response => {
            setData(response.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        makeRequest()
    }, []);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            <Menubar />
            <Container>
                <div>
                    <MyNPCHeader />
                    <MyNPCCollection limit={(data.characters.length).toString()} />
                    <div className="card-container">
                        <CharacterCardMapping vals={data.characters}></CharacterCardMapping>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default MyNPC;