import axios from "axios";

function NewsCard({ article, onSummary }) {
      
    async function handleSave() {
  try {
    await axios.post("https://omninews-qs4j.onrender.com/api/saved-news", {
      title: article.title,
      description: article.description,
      image: article.urlToImage,
      source: article.source?.name,
      publishedAt: article.publishedAt,
      url: article.url,
    });

    alert("✅ News saved successfully!");
  } catch (error) {
    console.log(error);
    alert("❌ Failed to save news.");
  }
}


  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <img
        src={article.urlToImage || "https://placehold.co/600x350?text=No+Image"}
        className="card-img-top"
        alt={article.title}
        style={{ height: "250px", objectFit: "cover" }}
        onError={(e) => {
        e.target.src = "https://placehold.co/600x350?text=No+Image";
      }}
      />

        <div className="card-body">
          <h5 className="card-title">
            {article.title}
          </h5>

          <p className="text-muted">
            {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
          </p>

          <p className="card-text">
            {article.description || "No description available"}
          </p>

          <div className="d-flex justify-content-between">
            <button
            className="btn btn-success"
            onClick={() => onSummary(article)}
            >
                AI Summary
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={handleSave}
              >
            ⭐ Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;