import * as React from 'react';
import '../scss/CheckBox.css';

/*
 * length - amount of checkboxes 
 * type   - divs or spans
 */

const CheckBox = (props: any) => {
    let arr = [...Array(props.num)]
    const changeBox = (e: any) => {
        let checked = e.target.getAttribute("aria-checked") 
        if (checked=="true") {
            for (let i = items.length - 1; i >= 0; i--) {
                if (items[i].getAttribute("aria-checked") == "true") {
                    items[i].setAttribute("aria-checked", "false")
                    break;
                }
            }
        } else {
            for (let i = 0; i < items.length; i++) {      
                if (items[i].getAttribute("aria-checked") == "false") {
                    items[i].setAttribute("aria-checked", "true")
                    break;
                }
            }                
        }
    }

    const mapItems = arr.map((val, index) => {
        if (props.type == "div") {
            return (
                <div key={index} id={"box" + index} onClick={changeBox} className={props.className} role="checkbox" aria-checked="false" aria-label="use"></div>
            )
        } else {
            return (
                <span key={index} id={"box" + index} onClick={changeBox} className={props.className} role="checkbox" aria-checked="false" aria-label="use"></span>
            )
        }
    })

    const items = document.getElementsByClassName(props.className)
    const isChecked = Array(items.length)
    for (let i = 0; i < isChecked.length; i++)
        isChecked[i] = items[i].getAttribute("aria-checked")

    if (props.type == "div") {
        return (
            <div className="checkbox-manager">
                {mapItems}
            </div>
        )
    } else {        
        return (
            <span className="checkbox-manager">
                {mapItems}
            </span>
        )
    }
}

export default CheckBox;