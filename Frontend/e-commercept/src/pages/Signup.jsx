import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${BASE}/api/register/`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if(res.ok) {
        setMsg("Account created. Redirecting to login...");
        setTimeout(()=>nav("/login"), 1200);
      } else {
        setMsg(data.username || data.password || JSON.stringify(data));
      }
    } catch(err) {
      console.error(err);
      setMsg("Signup failed");
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
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg
                h-[500px] flex flex-col justify-center
                animate-[fadeSlide_0.4s_ease_both]">
        <h2 className="text-2xl font-bold mb-4 text-center uppercase text-amber-500">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="username" onChange={handleChange} value={form.username}
            placeholder="Username" required
            className="w-full p-2 border rounded-lg transition focus:outline-none
                       focus:ring-2 focus:ring-blue-400 focus:border-transparent"/>
          <input name="email" type="email" onChange={handleChange} value={form.email}
            placeholder="Email"
            className="w-full p-2 border rounded-lg transition focus:outline-none
                       focus:ring-2 focus:ring-blue-400 focus:border-transparent"/>
          <input name="password" type="password" onChange={handleChange} value={form.password}
            placeholder="Password" required
            className="w-full p-2 border rounded-lg transition focus:outline-none
                       focus:ring-2 focus:ring-blue-400 focus:border-transparent"/>
          <input name="password2" type="password" onChange={handleChange} value={form.password2}
            placeholder="Confirm Password" required
            className="w-full p-2 border rounded-lg transition focus:outline-none
                       focus:ring-2 focus:ring-blue-400 focus:border-transparent"/>
                       <div className='flex justify-center'>
                         <button className="bg-amber-500 text-white py-2 px-3 rounded-lg
                             hover:bg-blue-500 active:scale-95 transition-all duration-150">
            Create Account
          </button>
                       </div>
         
        </form>
        {msg && <p className="mt-3 text-sm text-center">{msg}</p>}

         <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;