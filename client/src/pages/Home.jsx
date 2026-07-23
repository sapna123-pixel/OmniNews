import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import NewsCard from "../components/NewsCard";


function Home() {

  const categories = [
    "General",
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
    "Science",
  ];


  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("general");

  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  const [darkMode, setDarkMode] = useState(false);


  const navigate = useNavigate();
  const username = localStorage.getItem("username");

function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  alert("Logged out successfully!");

  navigate("/login");
}



  useEffect(() => {

    async function fetchNews() {

      try {

        setLoading(true);

        const response = await axios.get(
          `https://omninews-qs4j.onrender.com/api/news?category=${category}`
        );

        setNews(response.data.articles);


      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }


    fetchNews();


  }, [category]);




  async function handleSummary(article) {

    try {

      setSummaryLoading(true);
      setSummaryError("");
      setSummary("");


      const response = await axios.post(
        "https://omninews-qs4j.onrender.com/api/summary",
        {
          article: article
        }
      );


      setSummary(response.data.summary);


    } catch (error) {

      console.log(error);

      setSummaryError(
        "Unable to generate AI summary. Please try again."
      );


    } finally {

      setSummaryLoading(false);

    }

  }





  return (

    <div
      className={
        darkMode
          ? "bg-dark text-light min-vh-100"
          : "bg-light min-vh-100"
      }
    >


      <nav
        className={`navbar navbar-expand-lg shadow-sm ${
          darkMode
            ? "navbar-dark bg-dark border-bottom border-secondary"
            : "navbar-light bg-white"
        }`}
      >

        <div className="container">


          <div className="d-flex align-items-center gap-4">

  <Link
    to="/"
    className={`navbar-brand fw-bold fs-3 mb-0 text-decoration-none ${
      darkMode ? "text-info" : "text-primary"
    }`}
  >
    OmniNews
  </Link>


</div>

<div className="d-flex gap-2">
  <button
    className={`btn rounded-pill px-4 ${
      darkMode ? "btn-light" : "btn-dark"
    }`}
    onClick={() => setDarkMode(!darkMode)}
  >
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>


  {username && (
  <div className="dropdown">
    <button
      className={`btn ${
        darkMode ? "btn-light" : "btn-dark"
      } dropdown-toggle`}
      type="button"
      data-bs-toggle="dropdown"
    >
      👤 {username}
    </button>

    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link className="dropdown-item" to="/saved">
          ⭐ Saved News
        </Link>
      </li>

      <li>
        <hr className="dropdown-divider" />
      </li>

      <li>
        <button
          className="dropdown-item text-danger"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </li>
    </ul>
  </div>
)}

</div>


        </div>

      </nav>





      <div className="container mt-4">


  <h2 className="fw-bold mb-3">
    Categories
  </h2>



        <div className="d-flex flex-wrap gap-2">


          {categories.map((item)=>(

            <button
              key={item}
              className="btn btn-outline-primary rounded-pill"
              onClick={()=>setCategory(item.toLowerCase())}
            >

              {item}

            </button>

          ))}


        </div>


      </div>





      {summaryLoading && (

        <div className="container mt-4">

          <div className="card shadow p-4 text-center">

            <h4 className="text-primary">
              🤖 Generating AI Summary...
            </h4>


            <div className="spinner-border text-primary mt-3"></div>


          </div>

        </div>

      )}







      {summaryError && (

        <div className="container mt-4">

          <div className="alert alert-danger">

            {summaryError}

          </div>

        </div>

      )}







      {summary && !summaryLoading && (

        <div className="container mt-4">

          <div
            className="card shadow border-0 rounded-4 p-4"
            style={{
              backgroundColor: darkMode ? "#1f2937" : "white",
              color: darkMode ? "white" : "black"
            }}
          >


            <h3 className="text-success fw-bold">
              🤖 AI Summary
            </h3>


            <hr />


            <p
              className="fs-5 mb-0"
              style={{
                color: darkMode ? "#d1d5db" : "#6c757d"
              }}
            >
              {summary}
            </p>


          </div>


        </div>

      )}







      <div className="container mt-5">


        <h2 className="fw-bold mb-4 text-primary">
          🔥 Trending Today
        </h2>



        {loading && (

          <p className="text-center fw-bold">
            Loading news...
          </p>

        )}





        <div className="row">


          {news.slice(0,3).map((article,index)=>(

            <NewsCard
              key={index}
              article={article}
              onSummary={handleSummary}
            />

          ))}


        </div>


      </div>


    </div>

  );

}


export default Home;