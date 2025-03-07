export default function Die(props) {
    let buttonClass
    if (props.isHeld === true) {
        buttonClass = "isHeld die"
    } else {
        buttonClass = "die"
    }
    return (
        <button className={props.isHeld ? "isHeld die" : "die"} onClick={()=>props.hold(props.id)}>
            <span>{props.value}</span>
        </button>
    )
}