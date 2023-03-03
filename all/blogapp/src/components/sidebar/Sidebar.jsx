import "./sidebar.css"

export default function Sidebar() {
  return (
    <div className="Sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">About me </span>
            <img className="sidebarImg" src="https://images.pexels.com/photos/2873644/pexels-photo-2873644.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae nam, possimus nihil rerum 
                accusantium placeat sint incidunt eum deserunt animi.sint
            </p>
        </div>
        <div className="sidebarItem">
            <div className="sidebarTitle">CATEGORIES</div>
            <ui className="sidebarList">
                <li className="sidebarListItem">LIFE</li>
                <li className="sidebarListItem">STYLE</li>
                <li className="sidebarListItem">SPORTS</li>
                <li className="sidebarListItem">CENEMA</li>
                <li className="sidebarListItem">TECH</li>
                <li className="sidebarListItem">MUSIC</li>
            </ui>
          
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
               <i className="sidebarIcon fa-brands fa-facebook-square"></i>
               <i className=" sidebarIcon fa-brands fa-twitter-square"></i>
               <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
               <i className="sidebarIcon fa-brands fa-instagram-square"></i>
            </div>
        </div>
        
  
        
    </div>
  )
}
