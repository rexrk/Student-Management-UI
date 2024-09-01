import { useContext } from "react";
import { AuthContext } from "./security/AuthContext";

function FooterComponent() {
    const authContext = useContext(AuthContext)

    console.log(`Footer component - ${authContext.username}`);

    return (
        <footer className="footer">
            <div className="container">
                all rights reserved
            </div>
        </footer>
    )
}

export default FooterComponent