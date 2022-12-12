import pickle
from datetime import datetime
import sklearn
import pandas
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['POST'])
def predict_weather():
  data = request.get_json()

  data['date_and_time'] = datetime.utcfromtimestamp(data['date_and_time'])

  for i in range(1, 10):
    temp = data.copy()
    to_del = list(temp.keys())[i + 10]
    del temp[to_del]
    df = pandas.DataFrame([temp])
    df['date_and_time'] = pandas.to_numeric(df['date_and_time'])
    pickled_module = pickle.load(open(f'./models/model_{i}.pkl', 'rb'))
    df = pickled_module.predict(df)
    data[to_del] = df[0]

  return data
