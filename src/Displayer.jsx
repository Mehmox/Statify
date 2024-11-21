import React from "react";

export default function Displayer({ type, items }) {
    return <>
        <select name={type}>
            <option value="-1">{type}</option>
            {items.map(item => {
                <option value={ }>{type}</option>
            })}
        </select>
    </>
}