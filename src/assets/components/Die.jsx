export default function Die(props) {
    return (
        <button className="die">
            <span>{props.value}</span>
        </button>
    )
}