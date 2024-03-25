import { useAuth } from "../../contexts/AuthContext";
import "./UpdateProfile.css";
import Navbar from "../../components/Navbar/Navbar";

export default function UpdateProfile() {
    const { currentUser } = useAuth()

    return (
        <div className="userprofile">
            <Navbar />
            <div className="profile"></div>
            <div className="content">
                <form>
                    <input type="email"
                        required
                        defaultValue={currentUser.email}
                    />
                </form>
            </div>
        </div>
    );
}