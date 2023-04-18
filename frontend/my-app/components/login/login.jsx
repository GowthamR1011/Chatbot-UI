import { createSignal } from "solid-js";

export default function UserForm(props) {
    
    const [lgnForm, setLgnForm ] = createSignal(null);

    return (
        <div>

            {/* <h2>Heee</h2> */}
            <form>
                <label>User Name:</label>
                <input type="email"></input>
                <br/>

                <label>Password</label>
                <input type="password"></input>
                <br/>

                <button>Login</button>
            </form>
        </div>
    )
};


//export default UserForm;