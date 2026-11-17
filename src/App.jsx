
import { useState } from "react";
import "./design.css";

function App() {

  // TRAINEE INFORMATION
  const [trainees, setTrainees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // APPLICATION INFORMATION
  const [applications, setApplications] = useState([]);

  // PAGE NAVIGATION
  const [page, setPage] = useState("home");
  const [message, setMessage] = useState("");

  // REGISTRATION FORM
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  // SIGN IN FORM
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // TRAINING APPLICATION
  const [selectedProgram, setSelectedProgram] = useState("");

  const programs = [
    "Cutting Program",
    "Sewing Program",
    "Designing Program"
  ];


  // 1. CREATE TRAINEE ACCOUNT

  function registerTrainee(e) {
    e.preventDefault();

    if (!name || !email || !password || !contact || !address) {
      setMessage("Please complete all fields.");
      return;
    }

    const existingTrainee = trainees.find(
      trainee => trainee.email === email
    );

    if (existingTrainee) {
      setMessage("Email is already registered.");
      return;
    }

    const newTrainee = {
      id: Date.now(),
      name,
      email,
      password,
      contact,
      address
    };

    setTrainees([...trainees, newTrainee]);
    setCurrentUser(newTrainee);

    setName("");
    setEmail("");
    setPassword("");
    setContact("");
    setAddress("");

    setMessage("");
    setPage("dashboard");
  }


  // SIGN IN EXISTING APPLICANT

  function signIn(e) {
    e.preventDefault();

    const trainee = trainees.find(
      trainee =>
        trainee.email === loginEmail &&
        trainee.password === loginPassword
    );

    if (trainee) {
      setCurrentUser(trainee);
      setPage("dashboard");
      setMessage("");
      setLoginEmail("");
      setLoginPassword("");
    } else {
      setMessage("Incorrect email or password.");
    }
  }


  // 2. TRAINING APPLICATION

  function submitApplication(e) {
    e.preventDefault();

    if (!selectedProgram) {
      setMessage("Please select a training program.");
      return;
    }

    const newApplication = {
      id: Date.now(),
      traineeId: currentUser.id,
      traineeName: currentUser.name,
      email: currentUser.email,
      program: selectedProgram,
      status: "Pending"
    };

    setApplications([...applications, newApplication]);

    setSelectedProgram("");
    setMessage("Application submitted successfully!");
    setPage("resources");
  }


  // 3. VIEW TRAINING APPLICATION STATUS

  function viewApplicationStatus() {

    return applications.filter(
      app => app.traineeId === currentUser.id
    );
  }


  // LOGOUT

  function logout() {
    setCurrentUser(null);
    setPage("home");
    setMessage("");
  }


  return (
    <div className="app">

      {/* NAVIGATION BAR */}

      <header className="navbar">
        <h2>TEN Foundation</h2>

        {currentUser && (
          <nav>
            <button onClick={() => setPage("dashboard")}>
              Dashboard
            </button>

            <button onClick={() => setPage("apply")}>
              Apply for Training
            </button>

            <button onClick={() => setPage("resources")}>
              Training Resources
            </button>

            <button className="logout" onClick={logout}>
              Logout
            </button>
          </nav>
        )}
      </header>


      <main className="container">


        {/* WELCOME PAGE */}

        {page === "home" && (
          <section className="form-card">

            <h1>Welcome to TEN Foundation!</h1>

            <p>
              Where every opportunity is a chance to learn, grow, and build a better future. Whether you are just starting your journey or looking to develop new skills, we are here to support you every step of the way. Through our training programs, we hope to help you discover your potential, gain valuable knowledge, and create more opportunities for yourself.
            </p>

            <p>
              Get started by creating an account or signing in to explore the available programs and begin your application. We look forward to being part of your journey!
            </p>

            <button
              className="primary-btn"
              onClick={() => {
                setPage("register");
                setMessage("");
              }}
            >
              Create Account
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                setPage("login");
                setMessage("");
              }}
            >
              Sign In
            </button>

          </section>
        )}


        {/* 1. TRAINEE REGISTRATION */}

        {page === "register" && (
          <section className="form-card">

            <h1>Create Account</h1>
            <p>Register as a new trainee applicant.</p>

            <form onSubmit={registerTrainee}>

              <label>Full Name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />

              <label>Contact Number</label>
              <input
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="Enter your contact number"
                required
              />

              <label>Address</label>
              <input
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter your address"
                required
              />

              <button type="submit" className="primary-btn">
                Create Account
              </button>

            </form>

            {message && <p className="message">{message}</p>}

            <p>
              Already have an account?
              <button onClick={() => {
                setPage("login");
                setMessage("");
              }}>
                Sign In
              </button>
            </p>

          </section>
        )}


        {/* EXISTING APPLICANT SIGN IN */}

        {page === "login" && (
          <section className="form-card">

            <h1>Applicant Sign In</h1>
            <p>Enter your registered account details.</p>

            <form onSubmit={signIn}>

              <label>Email Address</label>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

              <button type="submit" className="primary-btn">
                Sign In
              </button>

            </form>

            {message && <p className="message">{message}</p>}

            <p>
              Don't have an account?
              <button onClick={() => {
                setPage("register");
                setMessage("");
              }}>
                Create Account
              </button>
            </p>

          </section>
        )}


        {/* TRAINEE DASHBOARD */}

        {page === "dashboard" && currentUser && (
          <section>

            <div className="welcome">
              <h1>Welcome, {currentUser.name}!</h1>
              <p>Manage your training applications here.</p>
            </div>

            <div className="section-card">

              <h2>Quick Actions</h2>

              <button
                className="primary-btn"
                onClick={() => setPage("apply")}
              >
                Apply for Training
              </button>

              <button
                className="secondary-btn"
                onClick={() => setPage("resources")}
              >
                View Application Status
              </button>

            </div>

          </section>
        )}


        {/* 2. TRAINING APPLICATION */}

        {page === "apply" && currentUser && (
          <section className="section-card">

            <h1>Training Application</h1>
            <p>Select your preferred training program.</p>

            <form onSubmit={submitApplication}>

              <label>Available Training Programs</label>

              {programs.map(program => (
                <div className="program-card" key={program}>

                  <input
                    type="radio"
                    name="program"
                    value={program}
                    onChange={e => setSelectedProgram(e.target.value)}
                  />

                  <span>{program}</span>

                </div>
              ))}

              <button type="submit" className="primary-btn">
                Submit Application
              </button>

            </form>

            {message && <p className="message">{message}</p>}

          </section>
        )}


        {/* 3. TRAINING RESOURCES / APPLICATION STATUS */}

        {page === "resources" && currentUser && (
          <section className="section-card">

            <h1>Training Resources</h1>
            <p>Check the current status of your applications.</p>

            {viewApplicationStatus().length === 0 ? (

              <p>You have no submitted applications.</p>

            ) : (

              viewApplicationStatus().map(app => (

                <div className="application-card" key={app.id}>

                  <h3>{app.program}</h3>

                  <p>
                    <strong>Trainee Name:</strong> {app.traineeName}
                  </p>

                  <p>
                    <strong>Application Status:</strong>
                  </p>

                  <span className={
                    app.status === "Accepted" ? "status accepted" :
                    app.status === "Rejected" ? "status rejected" :
                    app.status === "For CI" ? "status for-ci" :
                    "status pending"
                  }>
                    {app.status}
                  </span>

                  <p>
                    {app.status === "Pending" &&
                      "Your application is awaiting evaluation."}

                    {app.status === "Accepted" &&
                      "Congratulations! Your application has been accepted."}

                    {app.status === "Rejected" &&
                      "Your application was not approved."}

                    {app.status === "For CI" &&
                      "Undergoing Character Investigation."}
                  </p>

                </div>

              ))

            )}

          </section>
        )}

      </main>

    </div>
  );
}

export default App;