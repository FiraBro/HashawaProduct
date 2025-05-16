// // src/components/Auth/AuthForm.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import styles from "./AuthForm.module.css";

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Email is invalid";

//     if (!formData.password) newErrors.password = "Password is required";
//     else if (formData.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";

//     if (!isLogin) {
//       if (!formData.name) newErrors.name = "Name is required";
//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Replace with your actual API call
//       // const response = isLogin
//       //   ? await authService.login(formData)
//       //   : await authService.signup(formData);

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       navigate("/");
//     } catch (error) {
//       setErrors({
//         general: error.message || `Failed to ${isLogin ? "login" : "sign up"}`,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//     setErrors({});
//   };

//   return (
//     <div className={styles.authContainer}>
//       <div className={styles.authCard}>
//         <div className={styles.authHeader}>
//           <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
//           <p>{isLogin ? "Log in to continue" : "Sign up to get started"}</p>
//         </div>

//         {errors.general && (
//           <div className={styles.errorMessage}>{errors.general}</div>
//         )}

//         <form onSubmit={handleSubmit} className={styles.authForm}>
//           {!isLogin && (
//             <div className={styles.formGroup}>
//               <label htmlFor="name">Full Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={errors.name ? styles.errorInput : ""}
//                 placeholder="Enter your full name"
//               />
//               {errors.name && (
//                 <span className={styles.errorText}>{errors.name}</span>
//               )}
//             </div>
//           )}

//           <div className={styles.formGroup}>
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={errors.email ? styles.errorInput : ""}
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <span className={styles.errorText}>{errors.email}</span>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={errors.password ? styles.errorInput : ""}
//               placeholder={
//                 isLogin
//                   ? "Enter your password"
//                   : "Create a password (min 6 characters)"
//               }
//             />
//             {errors.password && (
//               <span className={styles.errorText}>{errors.password}</span>
//             )}
//           </div>

//           {!isLogin && (
//             <div className={styles.formGroup}>
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className={errors.confirmPassword ? styles.errorInput : ""}
//                 placeholder="Confirm your password"
//               />
//               {errors.confirmPassword && (
//                 <span className={styles.errorText}>
//                   {errors.confirmPassword}
//                 </span>
//               )}
//             </div>
//           )}

//           {isLogin && (
//             <div className={styles.forgotPassword}>
//               <Link to="/forgot-password">Forgot password?</Link>
//             </div>
//           )}

//           {!isLogin && (
//             <div className={styles.terms}>
//               <input type="checkbox" id="terms" name="terms" required />
//               <label htmlFor="terms">
//                 I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
//                 <Link to="/privacy">Privacy Policy</Link>
//               </label>
//             </div>
//           )}

//           <button
//             type="submit"
//             className={styles.submitButton}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className={styles.spinner}></span>
//             ) : isLogin ? (
//               "Log In"
//             ) : (
//               "Sign Up"
//             )}
//           </button>
//         </form>

//         <div className={styles.authFooter}>
//           <p>
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <button
//               type="button"
//               onClick={toggleAuthMode}
//               className={styles.switchButton}
//               disabled={isLoading}
//             >
//               {isLogin ? " Sign up" : " Log in"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

// src/components/Auth/AuthForm.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../Service/authService";
import styles from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        // Handle login
        const { email, password } = formData;
        await authService.login({ email, password });
        navigate("/");
      } else {
        // Handle registration
        const { name, email, password } = formData;
        await authService.register({ name, email, password });
        // Optionally login after registration
        await authService.login({ email, password });
        navigate("/");
      }
    } catch (error) {
      setErrors({
        general:
          error.message ||
          (isLogin
            ? "Login failed. Please check your credentials."
            : "Registration failed. Please try again."),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>{isLogin ? "Log in to continue" : "Sign up to get started"}</p>
        </div>

        {errors.general && (
          <div className={styles.errorMessage}>{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? styles.errorInput : ""}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.errorInput : ""}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.errorInput : ""}
              placeholder={
                isLogin
                  ? "Enter your password"
                  : "Create a password (min 6 characters)"
              }
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? styles.errorInput : ""}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <span className={styles.errorText}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          )}

          {isLogin && (
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          )}

          {!isLogin && (
            <div className={styles.terms}>
              <input type="checkbox" id="terms" name="terms" required />
              <label htmlFor="terms">
                I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : isLogin ? (
              "Log In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleAuthMode}
              className={styles.switchButton}
              disabled={isLoading}
            >
              {isLogin ? " Sign up" : " Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;


