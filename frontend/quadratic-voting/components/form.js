import Link from "next/link";

export default function Form({ state, setState }) {
    return (
        <form>
            <div class="form-class">
                {/* OPEN UP DEV CONSOLE TO SEE INFO! */}
            </div>
            <div class="form-class">
                ENTER NUMBER OF VOTES
                <br></br>
                <input
                    type="text"
                    name="key"
                    className="smaller-input"
                    value={state.key}
                    onChange={evt => setState({...state, [evt.target.name]: evt.target.value})}
                />
            </div>
        </form>
    );
}