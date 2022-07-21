import React from "react";

export default function Box(props)
{
    const styles = {
        backgroundColor: props.value===1 ? "#59E391" : "#FFFFFF"
    }

    return(
    <div style={styles}
         className="pente--box"
         key={props.id}
         onClick={() => props.play(props.x, props.y)}>
        <p className="box--text">{props.value}</p>
    </div>
    )
}