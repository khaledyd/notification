import "./settings.css"
import Sidebar   from "../../components/sidebar/Sidebar";

export default function Settings() {
  return (
    <div className='settings'>
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update your account</span>
                <span className="settingsDeleteTitle">Delete your account</span>
            </div>
            <form  className="settingsForm">
                <label >profile picture</label>   
                <div className="settingsPP">
                    <img src="https://images.pexels.com/photos/11354361/pexels-photo-11354361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                    <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa-solid fa-user"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}}/>
                </div>
                <labl>username</labl>
                <input type="text" placeholder="khaled" />
                <labl>email</labl>
                <input type="email" placeholder="khaled@gmail.com" />
                <labl>pasword</labl>
                <input type="password"/>
                <button className="settingsSubmit">update</button>


            </form>


        </div>
        <Sidebar/>
        Settings
        
    </div>
  )
}
