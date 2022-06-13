import * as React from 'react';
import '../scss/App.css';

import {
    Routes,
    Route,
  } from "react-router-dom";


import MyNPC from './MyNPC/MyNPC';
import NPCPage from './NPCPage/NPCPage';
import NPCBuilder from './NPCBuilder/NPCBuilder';
import NPCImport from './NPCBuilder/NPCImport';
import NPCRandom from './NPCBuilder/NPCRandom';



const App = () => {
    return (
        <Routes>
            <Route path='/' element={<MyNPC />}/>
            <Route path='/npc' element={<MyNPC />}/>   
            <Route path='/npc/builder' element={<NPCBuilder />}/>
            <Route path='/npc/builder/import' element={<NPCImport />}/>
            <Route path='/npc/builder/random' element={<NPCRandom />}/>
            <Route path='/profile/npc/:id' element={<NPCPage />}/>
        </Routes>
    );
}

export default App;
