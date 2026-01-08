import { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      alert("Login successful ✅");
      console.log(data);
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex bg-amber-400 justify-center items-center">
      <div className="bg-blue-700 w-full max-w-md p-6 rounded-lg shadow-md">
        <h1 className="text-3xl text-cyan-400 font-semibold text-center mb-4">
          Login Here
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            type="submit"
            className="w-full bg-cyan-600 text-amber-800 py-2 rounded-md hover:bg-fuchsia-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
