import "./navheader.css"
import JeevanHeader from '../../src/assets/JeevanHeader.png'
export default function NavHeader(props){
    return(
        <div className="nav-header">
            <img src={JeevanHeader}  className="jtLogo"></img>
           <p className="company-name">Jeevan Technologies</p>
        </div>
    )
}