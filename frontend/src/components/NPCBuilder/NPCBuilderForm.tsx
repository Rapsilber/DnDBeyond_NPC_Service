import * as React from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

const MyNPCForm = () => {
    const navigate = useNavigate();
    
    const onClick = (e: any) => {
        e.preventDefault();
        navigate(`/npc/${(document.getElementById("char") as HTMLInputElement).value}`);
    };

    return (
        <div className="form">
            <form name="input" onSubmit={onClick}>
                <label>Character ID: </label>
                <input type="text" id="char" name="char"></input>
                <input type="submit" value="Send Request"></input>
            </form>
            <Link to={'/npc/${value}'}>to NPC</Link>
        </div>
    );
}

export default MyNPCForm;
