import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function Login() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); 
  const nav = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   setMsg("");
  //   try {
  //     const res = await fetch(`${BASE}/api/token/`, {
  //       method: "POST",
  //       headers: {"Content-Type":"application/json"},
  //       body: JSON.stringify(form),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       saveTokens(data);
  //       setMsg("Login successful!");
  //       setTimeout(()=>nav("/"), 800);
  //     } else {
  //       setMsg(data.detail || "Invalid credentials");
  //     }
  //   } catch(err) {
  //     console.error(err);
  //     setMsg("Login failed");
  //   }
  // };




const handleSubmit = async e => {
  e.preventDefault();
  setMsg("");
  try {
    const res = await fetch(`${BASE}/api/token/`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      saveTokens(data);
      setIsSuccess(true);           // ← success
      setMsg("Login successful!");
      setTimeout(() => nav("/"), 800);
    } else {
      setIsSuccess(false);          // ← fail
      setMsg(data.detail || "Invalid credentials");
    }
  } catch(err) {
    console.error(err);
    setIsSuccess(false);            // ← fail
    setMsg("Login failed");
  }
};


  return (
 <div
    className="min-h-screen flex items-center justify-center p-6"
    style={{
      backgroundImage: "url('./public/bg.jpg')",  // put image in /public folder
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg
                h-[500px] flex flex-col justify-center
                animate-[fadeSlide_0.4s_ease_both]">
        <h2 className="text-2xl font-bold mb-4 text-center text-amber-500 uppercase">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-7">
          <input name="username" onChange={handleChange} value={form.username}
            placeholder="Username" required
            className="w-full p-2 border rounded-lg transition focus:outline-none
                       focus:ring-2 focus:ring-blue-400 focus:border-transparent"/>
          <input name="password" type="password" onChange={handleChange} value={form.password}
            placeholder="Password" required
            className="w-full p-2 border rounded-lg transition focus:outline-none
                       focus:ring-2 focus:ring-blue-400 focus:border-transparent"/>

             <div className='flex justify-center'>
              <button className="bg-amber-500 text-white py-2 px-5 rounded-lg
                             hover:bg-blue-600 hover:uppercase active:scale-95 transition-all duration-150">
            Login
          </button>
             </div>

          
        </form>
        {/* {msg && <p className="mt-3 text-lg text-center text-green-600">{msg}</p>} */}

{msg && (
  <p className={`mt-3 text-xl text-center font-medium
    ${isSuccess ? "text-green-500" : "text-red-500"}`}>
    {isSuccess ? "✅ " : "❌ "}{msg}
  </p>
)}

        <div className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;