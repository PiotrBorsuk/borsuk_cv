import os
from flask import Flask, jsonify, render_template

app = Flask(__name__, 
            static_folder='.', 
            template_folder='.')

cv_data = {
    "status": "success",
    "data": {
        "name": "Piotr Borsuk",
        "role": "Data Engineer",
        "specialization": "Google Cloud Platform",
        "experience_years": 3,
        "skills": [
            "BigQuery", "Airflow", "Python", 
            "Cloud Run", "CI/CD", "SQL", "Docker"
        ],
        "education": "Uniwersytet Gdański - Ekonomia",
        "languages": {
            "polish": "native",
            "english": "B2"
        },
        "remote": True,
        "status": "open_to_work",
        "socials": {
            "github": "https://github.com/PiotrBorsuk",
            "linkedin": "https://www.linkedin.com/in/piotr-borsuk/"
        }
    }
}

@app.route("/")
def index():
    """Serwuje główną stronę wizualną CV."""
    return render_template("index.html")

@app.route("/api/v1/cv", methods=["GET"])
def get_cv_api():
    """Endpoint API zwracający dane w formacie JSON."""
    return jsonify(cv_data)

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"error": "Endpoint not found"}), 404

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(debug=False, host="0.0.0.0", port=port)