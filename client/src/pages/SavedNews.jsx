import { useEffect, useState } from "react";
import axios from "axios";

function SavedNews() {
  const [savedNews, setSavedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedNews() {
      try {
        const response = await axios.get(
          "https://omninews-qs4j.onrender.com/api/saved-news"
        );

        setSavedNews(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedNews();
  }, []);


  async function handleDelete(id) {
  try {
    await axios.delete(`https://omninews-qs4j.onrender.com/api/saved-news/${id}`);

    setSavedNews(
      savedNews.filter((article) => article._id !== id)
    );

    alert("✅ News removed successfully!");
  } catch (error) {
    console.log(error);
    alert("❌ Failed to remove news.");
  }
}

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-primary mb-4">
        ⭐ Saved News
      </h2>

      {loading && (
        <p className="fw-bold text-center">
          Loading saved news...
        </p>
      )}

      {!loading && savedNews.length === 0 && (
        <div className="alert alert-info">
          No saved news yet.
        </div>
      )}

      <div className="row">
        {savedNews.map((article) => (
          <div className="col-md-4 mb-4" key={article._id}>
            <div className="card shadow-sm h-100">

              <img
                src={
                  article.image ||
                  "https://placehold.co/600x350?text=No+Image"
                }
                className="card-img-top"
                alt={article.title}
                style={{ height: "250px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x350?text=No+Image";
                }}
              />

              <div className="card-body">
                <h5 className="card-title">
                  {article.title}
                </h5>

                <p className="text-muted">
                  {article.source}
                </p>

                <p className="card-text">
                  {article.description}
                </p>

                <div className="d-flex justify-content-between">

  <a
    href={article.url}
    target="_blank"
    rel="noreferrer"
    className="btn btn-primary"
  >
    Read Article
  </a>

  <button
    className="btn btn-outline-danger"
    onClick={() => handleDelete(article._id)}
  >
    🗑️ Remove
  </button>

</div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedNews;