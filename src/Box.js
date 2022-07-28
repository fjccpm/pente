import React from "react";

export default function Box(props)
{
    const styles = {
        backgroundColor: props.value===1 ? "#E63946" : 
        props.value===2 ? "#1D3557" : "#F5F5F5",
        border: props.value !==0 ? "1px solid black" : "1px solid #F5F5F5",
        transition: props.value !==0 ? "1s all ease" : "none",
        boxShadow: props.value !==0 ? "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) -4px -4px 6px 0px inset" : "none"
    }

    return(
    <div
         className="pente--box"
         key={props.id}
         onClick={() => props.play(props.x, props.y)}>
        <div style={styles} 
             className="token">
        </div>
    </div>
    )
}