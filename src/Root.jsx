import { Outlet } from "react-router-dom";
import Headers from "./Headers";
import Footer from "./Footer";

const Root = () => {
    return (
        <div>
            <header>
                <Headers></Headers>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>

        </div>
    );
};

export default Root;