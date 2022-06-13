import * as React from 'react';

import '../../scss/CharacterCard.css';

import ListingContainer from '../containers/ListingContainer';

const CharacterCardHeader = (props: any) => {
    var backdrop = "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" + props.characterBackdrop + ")"
    var bdStyle = {
        backgroundImage: backdrop,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }
    var avatar = "url(" + props.characterImage + ")"
    var avatarStyle = {
        backgroundImage: avatar,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain"
    }
    return (
        <div>
            <div className="charactercard-header-cover" style={bdStyle}></div>
            <div className="charactercard-header-upper"> {/* Upper*/}
                <a></a>
                <ListingContainer>
                    <div className="charactercard-header-upper-image" style={avatarStyle}></div>
                    <div className="charactercard-header-upper-name">
                        {props.characterName}
                        <p>{props.cr} | {props.characterType} | {props.class}</p>
                    </div>
                </ListingContainer>
            </div>
        </div>
    );
}

export default CharacterCardHeader;