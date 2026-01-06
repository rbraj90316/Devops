import { useNavigate } from "react-router-dom"

export const Home=()=>{
    const navigate=useNavigate();
    function handleSubmit(){
navigate('/register');

    }
    return (
        <>
 <button onClick={handleSubmit} className="g-indigo-600 text-black px-6 py-3 rounded-md bg-blue-500 hover:bg-emerald-300" >Go for Register</button>       
        </>
    )
}