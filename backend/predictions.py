import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib  # Use joblib directly to load the SVM model

# Load the SVM model
# Replace 'svm_model.pkl' with the correct path
svm_model = joblib.load('svm_model.pkl')

# Define a function to process and predict the data


def process_data(data):
    # Assuming 'data' is a dictionary with the required features
    # Example: data = {'feature1': 10, 'feature2': 20, ...}

    # Convert 'ADHD of blood relative?' to numeric using label encoding
    # 0 for no, 1 for yes
    label_encoder = LabelEncoder()
    # data['ADHD of blood relative?'] = label_encoder.transform([data['ADHD of blood relative?']])

    # Create a DataFrame from the data
    # Index [0] to create a single-row DataFrame
    new_data = pd.DataFrame(data, index=[0])

    # Drop unnecessary columns (if needed)
    columns_to_drop = ['Username']
    new_data = new_data.drop(columns=columns_to_drop)

    # Make predictions using the loaded SVM model
    y_pred_new = svm_model.predict(new_data)

    # Now, y_pred_new contains the predicted labels for the new data
    # Print the predicted results for debugging purposes
    # print(y_pred_new.tolist())

    # You can return these predictions as a list
    return y_pred_new.tolist()

# Example usage in server.py:
# data = {'feature1': 10, 'feature2': 20, 'ADHD of blood relative?': 'Yes'}
# predicted_results = process_data(data)
# return jsonify({'predicted_results': predicted_results})
