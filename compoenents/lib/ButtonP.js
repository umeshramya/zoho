import React, {useState, useImperativeHandle} from 'react'
import {Button, Spinner} from "reactstrap"




 const ButtonP =  React.forwardRef(({text, onClick, onSubmit, color}, ref) => {
    const [toggelSpin, setsToggelSpin] = useState(false)

    useImperativeHandle(ref, ()=>({
        spin : ()=> setsToggelSpin(!toggelSpin),
        showSpin : ()=> setsToggelSpin(true),
        hideSpin : ()=> setsToggelSpin(false),

      }))
    return (


        <Button block onClick = {onClick} color={color} onSubmit = {onSubmit}>{`${text}  `}
            {toggelSpin ? <Spinner/> : ""}

        </Button>

    )
})

export default ButtonP

ButtonP.defaultProps={
    text : "Click",
}
