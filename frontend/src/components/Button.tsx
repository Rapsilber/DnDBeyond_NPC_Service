import * as React from 'react';

const Button = (props: any) => {
    return (
        <button onClick={props.onClick} className={props.className}>{props.children}</button>
    );
}

export default Button;