from flask import Flask
from healthcheck import HealthCheck

app = Flask(__name__)
health = HealthCheck()

def basic_check():
    return True, "collector ok"

health.add_check(basic_check)
app.add_url_rule("/health", "healthcheck", view_func=lambda: health.run())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
