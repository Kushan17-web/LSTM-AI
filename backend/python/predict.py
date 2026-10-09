import sys
import json
import joblib
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "models" / "student.pkl"

model = joblib.load(MODEL_PATH)

student = json.loads(sys.argv[1])

features = pd.DataFrame([student])

prediction = model.predict(features)

print(prediction[0])