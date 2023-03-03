import { Link } from "react-router-dom"
import "./post.css"

export default function Posts() {
  return (
    <div className="post">
        <img  src="https://images.pexels.com/photos/10756534/pexels-photo-10756534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="postImg" />
        <div className="postInfo">
            <div className="ponCats">
                <span className="postCat">Music</span>
                <span className="postCat">LIFE</span>
            </div>
            <div className="postTitle">
              <Link className="link" to={"Post/:PostId"}> Lorem ipsum dolor,</Link>
              </div>
            <hr />
            <div className="postDate">one hour ago</div>
            <p className="postDesc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
            </p>
        </div>
        <img  src="https://images.pexels.com/photos/12641743/pexels-photo-12641743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="postImg" />
        <div className="postInfo">
            <div className="ponCats">
                <span className="postCat">Music</span>
                <span className="postCat">LIFE</span>
            </div>
            <div className="postTitle">
              <Link className="link" to={"Post/:PostId"}> Lorem ipsum dolor,</Link>
              </div>
            <hr />
            <div className="postDate">one hour ago</div>
            <p className="postDesc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
            </p>
        </div>
        <img  src="https://images.pexels.com/photos/11295164/pexels-photo-11295164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="postImg" />
        <div className="postInfo">
            <div className="ponCats">
                <span className="postCat">Music</span>
                <span className="postCat">LIFE</span>
            </div>
            <div className="postTitle">
              <Link className="link" to={"Post/:PostId"}> Lorem ipsum dolor,</Link>
              </div>
            <hr />
            <div className="postDate">one hour ago</div>
            <p className="postDesc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id neque omnis at deleniti non eveniet atque amet totam modi dolorum!
            </p>
        </div>
        
    </div>
    

  )
}
