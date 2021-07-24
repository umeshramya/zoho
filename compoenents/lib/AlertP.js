import React, { useState, useImperativeHandle } from 'react';
import {Alert} from "reactstrap"


const AlertP = React.forwardRef((props, ref)=>{
    const [color, setcolor] = useState("light")
    const [text, setText] = useState("");

    
    useImperativeHandle(ref, ()=>({
        alertColor : (color)=>{
            setcolor(color)
        },
        alertText : (text)=>{
            setText(text)
        },
        alertLight : (text="")=>{
            setText(text)
            setcolor("light")
        },
        alertSuccess : (text)=>{
            setText(text)
            setcolor("success")
        },
        alertError : (error)=>{
            setcolor("danger")
            if(typeof error.response !== "undefined" ){
                setText(error.response.data)
            }else{
                
                setText(error)
            }
        }
    }))

    return(
        <Alert color={color} style={{margin : "10px"}}>
            {text}
        </Alert>
    )
})

export default AlertP
