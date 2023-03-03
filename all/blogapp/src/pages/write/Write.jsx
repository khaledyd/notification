import "./write.css"

export default function Write() {
  return (
    <div className="write">
        <img src="https://images.pexels.com/photos/11660966/pexels-photo-11660966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="writeImg" />
        <form className="write">
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                <i className=" writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="text" placeholder="title" className="writeInput" autoFocus={true} />
                <input type="file" id="fileInput" style={{display :"none"}} />
            </div>
            <div className="writeFormGroup">
                <textarea placeholder="tell your story .." type = "text" className="writeInput writeText"  ></textarea>
            </div>
            <button className="writeSubmit">Publish</button>

        </form>
    </div>
  )
}
