import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful ✅");
      console.log(data);

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-400">
      <div className="w-full max-w-md bg-red-500 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-emerald-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-4 focus:ring-cyan-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-4 focus:ring-cyan-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-4 focus:ring-cyan-500"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-4 focus:ring-cyan-500"
          />

          <button
            type="submit"
            className="w-full bg-cyan-600 text-amber-800 py-2 rounded-md hover:bg-fuchsia-700 transition"
          >
            Register
          </button>

          <p className="text-center text-black">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800 font-semibold">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
