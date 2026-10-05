import React,{useState} from "react"

const AddCourse=()=>{

const[name,setName]=useState("")
const[image,setImage]=useState(null)

const handleSubmit=async()=>{

const fd=new FormData()

fd.append("name",name)
fd.append("image",image)

await fetch("http://localhost/notes-backend/courses/addCourse.php",{
method:"POST",
body:fd,
credentials:"include"
})

alert("Course Added")

}

return(

<div className="p-10">

<h2 className="text-2xl font-bold mb-5">Add Course</h2>

<input
placeholder="Course Name"
className="border p-2 mr-3"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
/>

<button
onClick={handleSubmit}
className="ml-3 bg-green-500 text-white px-4 py-2 rounded"
>
Add Course
</button>

</div>

)

}

export default AddCourse  