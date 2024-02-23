import { Link } from "react-router-dom";
import { useState } from "react";
import "./LogIn.css";

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login-page">
            <div className="content">
                <h2>Sign In</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button>Login</button>
                </form>
                <Link to="/forgot-password">Forgot Password?</Link>
                <div className="footer">
                    <p>
                        Don't have an account?
                        <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}