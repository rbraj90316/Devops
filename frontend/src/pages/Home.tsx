import { useNavigate } from "react-router-dom"

export const Home=()=>{
    const navigate=useNavigate();
    function handleSubmit(){
navigate('/register');

    }
    return (
        <>
 <button onClick={handleSubmit} className="g-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700" ></button>       
        </>
    )
}