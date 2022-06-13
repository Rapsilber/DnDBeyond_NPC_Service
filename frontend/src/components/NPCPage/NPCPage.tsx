import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    useParams,
} from 'react-router-dom';

import axios from 'axios';

import Container from '../containers/Container';
import SequentialContainer from '../containers/SequentialContainer';

import NPCSheetSeparator from './NPCSheetSeparator';
import NPCSheetHeader from './NPCSheetHeader';
import NPCSheetAttributes from './NPCSheetAttributes';
import NPCSheetArray from './NPCSheetArray';
import NPCTidbit from './NPCTidbit';
import NPCTidbitMapping from './NPCTidbitMapping';
import NPCSpecialtyEquipment from './NPCSpecialtyEquipment';
import NPCMultiattack from './NPCMultiattack';
import NPCActionsList from './NPCActionsList';
import NPCSpellcaster from './NPCSpellcaster';
import NPCInnate from './NPCInnate';
import ColumnContainer from '../containers/ColumnContainer';
import NPCSidebarResponse from './NPCSidebarResponse';
import NPCItem from './NPCItem';
import Loading from '../Loading';
import Menubar from '../Menubar';
import "../../scss/NPCSheet.css";

const API = "http://127.0.0.1:5000"


const alignArr = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil']

const fullCaster = ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Wizard']
const halfCaster = ['Artificer', 'Paladin', 'Ranger']
const thirdCaster = ['Rogue', 'Fighter']
const pactCaster = ['Warlock']

const abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']

const NPCPage = () => {
    const params = useParams();
    const id = params.id;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null)
    const [extraData, setExtraData] = useState(null)

    const [cbMessage, setcbMessage] = useState([])

    const wait = (ms: number) => 
        new Promise(resolve => setTimeout(resolve, ms))
    
    const waitWrapper = async () => {
        await wait(5000);
        console.log('waiting...')
    }

    const COOKIE = 'cookie_goes_here'

    var tempCookie = COOKIE.split(';')
    for (let i = 0; i < tempCookie.length; i++) {      
        document.cookie = tempCookie[i] + ';'
    }
    const makeCORS = () => {
        axios.post('https://auth-service.dndbeyond.com/v1/cobalt-token',
            {},
            {withCredentials: true})
            .then(resp => {
                console.log(resp.data.token)
            })
    }

    const makeRequest = () => {
        axios.post(`${API}/scds`, {'response': id}).then(response => {
            setData(response.data.foundCharacters[0])
            axios.post(`${API}/char`, {'response': id}).then(response1 => {
                setExtraData(response1.data.data)
                setLoading(false)
            })
        }).catch(response => {
            if (response.data == undefined || response.data == null) {
                waitWrapper()
                makeRequest()
                return
            }
        })
    }
    useEffect(() => {
        makeRequest()
    }, []);

    const aggregateArray = (readArr: any[], writeArr: any[]) => {
        for (let i = 0; i < readArr.length; i++)
            writeArr[i] = readArr[i].name
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    var bgImageUrl = "url(" + data.decorations.backdrop.largeBackdropAvatarUrl + ")"
    var divStyle = {
        background: bgImageUrl
    }

    var charPortrait = data.decorations.avatar.avatarUrl

    var classes:string[] = []
    aggregateArray(data.classes, classes)
    
    var speed = data.speeds[0].distance + " ft."
    for (let i = 1; i < data.speeds.length; i++) {
        speed += ", " + data.speeds[i].name + " " + data.speeds[i].distance + " ft."
    }
    var senses = "Passive Perception " + data.passivePerception
    for (let i = 0; i < data.senses.length; i++) {
        if (i === 0)
            senses += ", " + data.senses[i].name + " " + data.senses[i].distance
    }
    var resArr:string[] = []
    var resistances
    aggregateArray(data.resistances, resArr)
    if (resArr.length !== 0) {
        resistances = resArr[0]
        for (let i = 1; i < resArr.length; i++)
            resistances += ", " + resArr[i]
    }
    var immArr:string[] = []
    var immunities
    aggregateArray(data.immunities, immArr)
    if (immArr.length !== 0) {
        immunities = immArr[0]
        for (let i = 1; i < immArr.length; i++)
            immunities += ", " + immArr[i]
    }

    var vulArr:string[] = []
    var vulnerabilities
    aggregateArray(data.vulnerabilities, vulArr)
    if (vulArr.length !== 0) {
        vulnerabilities = vulArr[0]
        for (let i = 1; i < vulArr.length; i++)
            vulnerabilities += ", " + vulArr[i]
    }

    var statArr = {
        "Strength": data.abilities[0].score,
        "Dexterity": data.abilities[1].score,
        "Constitution": data.abilities[2].score,
        "Intelligence": data.abilities[3].score,
        "Wisdom": data.abilities[4].score,
        "Charisma": data.abilities[5].score
    }

    var saveArr = {
        "STR": data.abilities[0].save,
        "DEX": data.abilities[1].save,
        "CON": data.abilities[2].save,
        "INT": data.abilities[3].save,
        "WIS": data.abilities[4].save,
        "CHA": data.abilities[5].save
    }

    var skillArr = {
        "Athletics": data.skills[0].modifier, "Acrobatics": data.skills[1].modifier, "Sleight of Hand": data.skills[2].modifier,
        "Stealth": data.skills[3].modifier, "Arcana": data.skills[4].modifier, "History": data.skills[5].modifier,
        "Investigation": data.skills[6].modifier, "Nature": data.skills[7].modifier, "Religion": data.skills[8].modifier,
        "Animal Handling": data.skills[9].modifier, "Insight": data.skills[10].modifier, "Medicine": data.skills[11].modifier,
        "Perception": data.skills[12].modifier, "Survival": data.skills[13].modifier, "Deception": data.skills[14].modifier,
        "Intimidation": data.skills[15].modifier, "Performance": data.skills[16].modifier, "Persuasion": data.skills[17].modifier,
    }

    var attunedArr = []
    for (let i = 0; i < data.attunedItems.length; i++) {
        attunedArr[data.attunedItems[i].name] = null
    }
    for (let i = 0; i < extraData.inventory.length; i++) {
        if (attunedArr.hasOwnProperty(extraData.inventory[i].definition.name))
            attunedArr[extraData.inventory[i].definition.name] = extraData.inventory[i].definition.description
    }

    var isFullCaster = (data.castingInfo.modifiers.length > 0 && fullCaster.includes(data.castingInfo.modifiers[0].sources[0]))
    var isHalfCaster = (data.castingInfo.modifiers.length > 0 && halfCaster.includes(data.castingInfo.modifiers[0].sources[0]))
    var isThirdCaster = (data.castingInfo.modifiers.length > 0 && thirdCaster.includes(data.castingInfo.modifiers[0].sources[0]))
    var isPactCaster = (data.castingInfo.modifiers.length > 0 && pactCaster.includes(data.castingInfo.modifiers[0].sources[0]))

    var spellInfoArr:string[] = []

    //[castAbilityID, castMod, spellSave, spellAttack]
    var spellListArr = []
    var spellListByLevel:any[] = [[], [], [], [], [], [], [], [], [], []]
    var innateListArr: any = []

    //[name, level, spellDesc, type, numdount, dicetype]}
    if (isFullCaster || isHalfCaster || isThirdCaster || isPactCaster) {
        spellInfoArr = [(isThirdCaster === true ? abilities[3] : abilities[extraData.classes[0].definition.spellCastingAbilityId - 1]), data.castingInfo.modifiers[0].value, data.castingInfo.saveDcs[0].value, data.castingInfo.spellAttacks[0].value]
        var tempSpellArr = extraData.classSpells[0].spells
        for (let i = 0; i < tempSpellArr.length; i++) {
            spellListArr[i] = [tempSpellArr[i].definition.name, tempSpellArr[i].definition.level, tempSpellArr[i].definition.description]
            for (let j = 0; j < tempSpellArr[i].definition.modifiers.length; j++) {
                spellListArr[i].push(tempSpellArr[i].definition.modifiers[j].subType)
                spellListArr[i].push(tempSpellArr[i].definition.modifiers[j].die.diceCount)
                spellListArr[i].push(tempSpellArr[i].definition.modifiers[j].die.diceValue)
            }
        }
        for (let i = 0; i < spellListArr.length; i++) {
            spellListByLevel[spellListArr[i][1]].push(spellListArr[i])
        }

        tempSpellArr = extraData.spells.class
        for (let i = 0; i < tempSpellArr.length; i++) {
            innateListArr[i] = [tempSpellArr[i].definition.name, tempSpellArr[i].definition.level, tempSpellArr[i].definition.description]
            for (let j = 0; j < tempSpellArr[i].definition.modifiers.length; j++) {
                innateListArr[i].push(tempSpellArr[i].definition.modifiers[j].subType)
                innateListArr[i].push(tempSpellArr[i].definition.modifiers[j].die.diceCount)
                innateListArr[i].push(tempSpellArr[i].definition.modifiers[j].die.diceValue)
            }
        }
    }

    var spellSlots:number[] = []
    if (isFullCaster) {
        spellSlots = [0,
                      2 + (data.level >= 2 ? 1 : 0) + (data.level >= 3 ? 1 : 0), // 1
                     (data.level >= 3 ? 2 : 0) + (data.level >= 4 ? 1 : 0), // 2
                     (data.level >= 5 ? 2 : 0) + (data.level >= 6 ? 1 : 0), // 3
                     (data.level >= 7 ? 1 : 0) + (data.level >= 8 ? 1 : 0) + (data.level >= 9 ? 1 : 0), // 4
                     (data.level >= 9 ? 1 : 0) + (data.level >= 10 ? 1 : 0) + (data.level >= 18 ? 1 : 0), // 5
                     (data.level >= 11 ? 1 : 0) + (data.level >= 19 ? 1 : 0), // 6
                     (data.level >= 13 ? 1 : 0) + (data.level >= 20 ? 1 : 0), // 7
                     (data.level >= 15 ? 1 : 0), // 8
                     (data.level >= 17 ? 1 : 0)] // 9
    } else if (isHalfCaster) {
        spellSlots = [0,
                      2 + (data.level >= 3 ? 1 : 0) + (data.level >= 5 ? 1 : 0),
                     (data.level >= 5 ? 2 : 0) + (data.level >= 7 ? 1 : 0),
                     (data.level >= 9 ? 2 : 0) + (data.level >= 11 ? 1 : 0),
                     (data.level >= 13 ? 1 : 0) + (data.level >= 15 ? 1 : 0),
                     (data.level >= 17 ? 1 : 0) + (data.level >= 19 ? 1 : 0),
                     0,
                     0,
                     0,
                     0]
    } else if (isThirdCaster) {
        spellSlots = [0,
                     (data.level >= 3 ? 2 : 0) + (data.level >= 4 ? 1 : 0) + (data.level >= 7 ? 1 : 0),
                     (data.level >= 7 ? 2 : 0) + (data.level >= 10 ? 1 : 0),
                     (data.level >= 13 ? 2 : 0) + (data.level >= 16 ? 1 : 0),
                     (data.level >= 19 ? 1 : 0),
                      0,
                      0,
                      0,
                      0,
                      0]
    } else if (isPactCaster) {
        //[slots, level]
        spellSlots = [1 + (data.level >= 2 ? 1 : 0) + (data.level >= 11 ? 1 : 0) + (data.level >= 17 ? 1 : 0), 
                      1 + (data.level >= 3 ? 1 : 0) + (data.level >= 5 ? 1 : 0)  + (data.level >= 7 ? 1 : 0) + (data.level >= 9 ? 1 : 0)]
    }

    var extraAttacks = 0;
    for (let i = 0; i < extraData.modifiers.class.length; i++) {
        if (extraData.modifiers.class[i].friendlySubtypeName === "Extra Attacks") {
            extraAttacks += 1
        }
    }

    var attackArr = [] //[name, toHit, saveInfo, label, origin, range, type, numdice, dicetpye, mod, longrangevalue]
    let j = 0
    for (let i = 0; i < data.attacks.length; i++) {
        if ((data.attacks[i].damage.value.fixedValue === 0 && !data.attacks[i].name.includes("Breath Weapon")) || (data.attacks[i].name === "Unarmed Strike" && !classes.includes("Monk")) || data.attacks[i].name === "Form of Dread: Transform") //remove spells and unarmed strike need to return and remove duplicates
            continue;
        attackArr[j] =  [data.attacks[i].name, data.attacks[i].toHit, data.attacks[i].saveInfo, data.attacks[i].range.label, data.attacks[i].range.origin, data.attacks[i].range.value, data.attacks[i].damage.type, data.attacks[i].damage.value.diceCount, data.attacks[i].damage.value.diceValue, data.attacks[i].damage.value.fixedValue, data.attacks[i].range.longRangeValue]
        j++;  
    }

    const msgCallback = (msg:any) => {
        setcbMessage(msg)
    }

    return (
        <div className={"npcsheet-backgroundImage"} style={divStyle}>
            <Menubar />
            <Container>
                <div className={"npcsheet-row"}>
                    <div className={"npcsheet-columnsheet"}> 
                        <SequentialContainer className={"npcsheet"}>
                            {/**/}
                            <div className={"npcsheet-left"}>
                                <NPCSheetHeader subtext={"Medium humanoid (" + data.race.name + "), " + (alignArr[extraData.alignmentId - 1] === undefined ? "any alignment" : alignArr[extraData.alignmentId - 1])}>{data.name}</NPCSheetHeader>
                                <NPCSheetSeparator />
                                <NPCSheetAttributes ac={data.armorClass} hp={data.hitPointInfo.current} speed={speed}/>
                                <NPCSheetSeparator />
                                <NPCSheetArray str={statArr["Strength"]} dex={statArr["Dexterity"]} con={statArr["Constitution"]} int={statArr["Intelligence"]} wis={statArr["Wisdom"]} cha={statArr["Charisma"]} parentCallback={msgCallback}></NPCSheetArray>
                                <NPCSheetSeparator />
                                <SequentialContainer className={"npcsheet-tidbits"}>
                                    <p>
                                        <NPCTidbitMapping title={"Saving Throws"} vals={saveArr} parentCallback={msgCallback}></NPCTidbitMapping>
                                    </p>
                                    <p>
                                        <NPCTidbitMapping title={"Skills"} vals={skillArr} parentCallback={msgCallback}></NPCTidbitMapping>
                                    </p>
                                    <NPCItem item={"Damage Resistances"} items={resistances}></NPCItem>
                                    <NPCItem item={"Damage Vulnerabilities"} items={vulnerabilities}></NPCItem>
                                    <NPCItem item={"Damage Immunities"} items={immunities}></NPCItem>
                                    <NPCItem item={"Senses"} items={senses}></NPCItem>
                                    <NPCItem item={"Languages"} items={data.proficiencyGroups[3].values}></NPCItem>
                                    <NPCItem item={"Challenge"} items={Math.floor(2 * data.level / 3)}></NPCItem>
                                    <NPCItem item={"Proficiency"} items={data.proficiencyBonus}></NPCItem>
                                </SequentialContainer>
                            </div>
                            <div className={"npcsheet-right"}>
                                {/* equipment/features */}
                                <SequentialContainer className={"npcsheet-statblock"}>
                                    <NPCSpecialtyEquipment name={data.name} vals={attunedArr} parentCallback={msgCallback}></NPCSpecialtyEquipment>
                                    {/* feats */}
                                    {spellListArr.length !== 0 ? <SequentialContainer className={"npcsheet-statblock-header"}>Feats & Spells</SequentialContainer> : null}
                                    <div className={"feat-text"}>
                                        <NPCInnate name={data.name} vals={innateListArr} stats={spellInfoArr} parentCallback={msgCallback}></NPCInnate>
                                        <NPCSpellcaster isPactCaster={isPactCaster} name={data.name} level={data.level} vals={spellSlots} spells={spellListByLevel} stats={spellInfoArr} parentCallback={msgCallback}></NPCSpellcaster>
                                    </div>
                                </SequentialContainer>
                                {/* actions */}
                                <SequentialContainer className={"npcsheet-statblock"}>
                                    {attackArr.length !== 0 ? <SequentialContainer className={"npcsheet-statblock-header"}>Actions</SequentialContainer> : null}
                                    <div className={"feat-text"}>
                                        <NPCMultiattack name={data.name} extraAttacks={extraAttacks}></NPCMultiattack>
                                        <NPCActionsList name={data.name} vals={attackArr} parentCallback={msgCallback}></NPCActionsList>
                                    </div>
                                </SequentialContainer>
                            </div>
                        </SequentialContainer>
                    </div>
                    <div className={"npcsheet-columnsidebar"}>
                        <div className={"npcsheet-columnsidebar-portrait"}>
                            {charPortrait !== null ? <img src={charPortrait}></img> : null}
                        </div>
                        <NPCSidebarResponse message={cbMessage}></NPCSidebarResponse>
                    </div>
                </div>    
            </Container>
        </div>
    );
};

export default NPCPage;