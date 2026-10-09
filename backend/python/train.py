from pathlib import Path
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# ==========================
# File Paths
# ==========================

BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = BASE_DIR / "dataset" / "student_data.csv"
MODEL_PATH = BASE_DIR / "models" / "student.pkl"

# ==========================
# Load Dataset
# ==========================

df = pd.read_csv(DATASET_PATH)

print(f"Dataset Loaded Successfully: {len(df)} Records")

# ==========================
# Prepare Data
# ==========================

X = df.drop("category", axis=1)
y = df["category"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ==========================
# Train Model
# ==========================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# ==========================
# Evaluate Model
# ==========================

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# ==========================
# Save Model
# ==========================

MODEL_PATH.parent.mkdir(exist_ok=True)

joblib.dump(model, MODEL_PATH)

print("✅ AI Model Trained Successfully")
print(f"Model Saved At: {MODEL_PATH}")