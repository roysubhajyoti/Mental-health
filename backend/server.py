import threading
import csv
import datetime
from flask import Flask, request, jsonify, render_template
import predictions  # Import the predictions module
from flask_cors import CORS
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
app = Flask(__name__)
CORS(app)

csv_file_path = 'output.csv'


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    gender = data.get('gender')
    dob = data.get('dob')
    # Handle the signup data received from the frontend
    # You can access data['username'] and data['password'] to process and store the user's information
    print(data)
    with open('credentials.csv', mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([username, password, gender, dob])
    # Return a response to the frontend if needed
    response_data = {'message': 'Signup successful'}
    return jsonify(response_data)


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the provided username and password match any entry in the credentials.csv file
    with open('credentials.csv', 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            if row['username'] == username and row['password'] == password:
                # Return a response indicating successful login
                response_data = {"status": 1}
                return jsonify(response_data)


@app.route('/send_obj_to_server', methods=['POST'])
def send_obj_to_server():
    data = request.get_json()
    print("hi")
    print("received data ", data)

    result = predictions.process_data(data)
    print(result)
    # Extract username and prediction from the data
    username = data.get('Username')
    Attention = data.get('Attentive Score')
    Hyperactivity = data.get('Hyperactivity Score')
    prediction = (Attention+Hyperactivity)/10
    # Append the username and prediction to the CSV file
    with open(csv_file_path, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([username, prediction])
    gender = None
    dob = None
    age = None
    with open('credentials.csv', mode='r') as credentials_file:
        csv_reader = csv.reader(credentials_file)
        for row in csv_reader:
            if row[0] == username:
                if row[2].lower() == 'female':
                    gender = 'F'
                elif row[2].lower() == 'male':
                    gender = 'M'
                dob_value = row[3][:4]

            # Check if DOB is valid before converting to an integer
        if dob_value.isdigit() and len(dob_value) == 4:
            last_4_digits_dob = int(dob_value)
            current_year = datetime.datetime.now().year
            age = current_year - last_4_digits_dob
        else:
            #     Handle invalid DOB or 'male'/'female' case
            # You can set age to a default value or handle it as needed
            age = None
        dob = dob_value

    if data.get('ADHD of blood relative?') == 0:
        adhd = 'NO'
    else:
        adhd = 'YES'
    with open('ADHD Data - Sheet1.csv', mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([username, age, gender, Attention, Hyperactivity, data.get('Game1 tries'), data.get(
            'Game1 time'), data.get('Game2 tries'), data.get('Game2 time'), adhd, result[0]])

        return jsonify({'result': result})
    # If no match was found, return a response indicating unsuccessful login
    response_data = {"status": 0}
    return jsonify(response_data)

    # result = python_function(data)
    # return jsonify({'result': result})
    print(data)


# Define a function to create and save the plot
# Create an empty dictionary to store the data
    # data_dict = {}

    # # Read data from the CSV file and populate the data_dict
    # with open(csv_file_path, mode='r') as file:
    #     csv_reader = csv.DictReader(file)
    #     for row in csv_reader:
    #         name = row['username']
    #         pred = row['prediction']
    #         if name in data_dict:
    #             data_dict[name].append(pred)
    #         else:
    #             data_dict[name] = [pred]
    # print(data_dict)

    # def create_and_save_plot(values, username):
    #     # Create a line graph using Matplotlib
    #     plt.plot(values, range(len(values)), marker='o', linestyle='-')
    #     plt.xlabel('Value')
    #     plt.ylabel('Index')
    #     plt.title(f'Line Graph for {username}')
    #     plt.grid(True)
    #     # Save the graph as an image in the "static" folder
    #     filename = f'static/{username}.png'
    #     plt.savefig(filename)
    #     plt.close()

# Define a route to display user profiles and line graphs


@app.route("/profile/<username>")
def profile(username):
    data_dict = {}
    # Read data from the CSV file and populate the data_dict
    with open(csv_file_path, mode='r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            name = row['username']
            pred = row['prediction']
            if name in data_dict:
                data_dict[name].append(pred)
            else:
                data_dict[name] = [pred]
    print(data_dict)

    def create_and_save_plot(values, username):
        # Create a line graph using Matplotlib
        plt.plot(values, range(len(values)), marker='o', linestyle='-')
        plt.xlabel('Value')
        plt.ylabel('Index')
        plt.title(f'Line Graph for {username}')
        plt.grid(True)
    # Save the graph as an image in the "static" folder
        filename = f'static/{username}.png'
        plt.savefig(filename)
        plt.close()

    print("Hi")
    if username in data_dict:
        values = data_dict[username]
        values = [float(value) for value in values]
        indexed_values = [(index, value) for index, value in enumerate(values)]

        # Create and save the plot in a separate thread
        plot_thread = threading.Thread(
            target=create_and_save_plot, args=(values, username))
        plot_thread.start()

        # Define the image URL
        image_url = f'{username}.png'

        # Render the user profile template with the graph
        return render_template("profile.html", username=username, indexed_values=indexed_values, image_url=image_url)
    else:
        return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
