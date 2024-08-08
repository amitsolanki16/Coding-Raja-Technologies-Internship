import pc from "./pc.jpg"

import "./Sidebar.scss"

const Sidebar = (props) => {
    return <div className={`sidebar ${props.className}`}>
        <div className="sidebar__titleBox">
            <h2 className="sidebar__title">About me</h2>
        </div>

        <img src={pc} alt="" className="sidebar__image" />

        <p className="sidebar__paragraph">I am Amit Solanki. A computer engineering student studying in KJIT. This app is made by me!!</p>
    </div>;
}

export default Sidebar;