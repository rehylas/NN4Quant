# -*- coding: UTF-8 -*-
print(__doc__)


# Code source: Jaques Grobler
# License: BSD 3 clause

import sys
#import matplotlib.pyplot as plt
import numpy as np
from sklearn import datasets, linear_model

from  sklearn.neural_network  import MLPRegressor

from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.utils import np_utils

'''''''''

说明：
学习和精通各种 rnn , 在 mnist 上的效果
基础应用， 以便扩展到 stock

'''''''''
scorelist = []

import keras
from sklearn.datasets import fetch_mldata
from keras.optimizers import SGD
from keras.models import load_model
from keras.layers import Dropout
from keras.layers import Embedding
from keras.models import Sequential
from keras.layers import LSTM, Dense

nbatch_size =32
nEpoches = 10

def buildrnn():
    pass

def buildlstm():

    import numpy as np

    data_dim = 28
    timesteps = 28
    num_classes = 10

    # expected input data shape: (batch_size, timesteps, data_dim)
    model = Sequential()
    model.add(LSTM(32, return_sequences=True,   input_shape=(timesteps, data_dim+14)))  # returns a sequence of vectors of dimension 32
    model.add(LSTM(32, return_sequences=True))  # returns a sequence of vectors of dimension 32
    model.add(LSTM(32))  # return a single vector of dimension 32
    model.add(Dense(10, activation='softmax'))

    model.compile(loss='categorical_crossentropy',
                  optimizer='rmsprop',
                  metrics=['accuracy'])
    print model.summary()
    return  model
    pass

def makedata():
    img_rows, img_cols = 28, 28

    mnist = fetch_mldata("MNIST original")
    # rescale the data, use the traditional train/test split
    X_1D, y_int = mnist.data / 255., mnist.target
    y = np_utils.to_categorical(y_int, num_classes=10)

    X = X_1D.reshape(X_1D.shape[0], img_rows, img_cols )

    input_shape = (img_rows, img_cols, 1)
    x_train, x_test = X[:60000], X[60000:]
    y_train, y_test = y[:60000], y[60000:]

    return X, y
    pass

def makedata2():
    img_rows, img_cols = 28, 28

    mnist = fetch_mldata("MNIST original")
    # rescale the data, use the traditional train/test split
    X_1D, y_int = mnist.data / 255., mnist.target
    y = np_utils.to_categorical(y_int, num_classes=10)

    X = X_1D.reshape(X_1D.shape[0], img_rows, img_cols )

    c =  np.zeros(  (X.shape[0], X.shape[1], 14)   )
    b = np.c_[X, c]

    print X[0,0]
    print b[0, 0]

    x_train, x_test = X[:60000], X[60000:]
    y_train, y_test = y[:60000], y[60000:]

    return b, y
    pass

def runTrain(model, x_train, x_test, y_train, y_test):
    model.fit(x_train, y_train,  batch_size= nbatch_size, epochs= nEpoches)
    score = model.evaluate(x_test, y_test, batch_size=nbatch_size)
    print 'evaluate score:', score
    pass

def testAccRate(model, x_test, y_test ):
    pass


def test():

    X,y = makedata2()
    x_train, x_test = X[:60000], X[60000:]
    y_train, y_test = y[:60000], y[60000:]
    model = buildlstm()
    runTrain(model, x_train, x_test, y_train, y_test )
    pass


def dataInfo(data):
    print type(data)
    if (  isinstance (	data,  np.ndarray  ) ):
        print data.shape

def dataDetail(data):
    print data

if __name__ == "__main__":
    sys_code_type = sys.getfilesystemencoding()
    #print mystr.decode('utf-8').encode(sys_code_type)
    test()

'''
总结：
结果：
base    lstm for mnist
acc : 98.56%

结果2：
把数据最后增加 50%  的 0 ， (dim X 0.5)
acc : 98.39%
结果基本上 与原数据一致

结构：
Layer (type)                 Output Shape              Param #
=================================================================
lstm_1 (LSTM)                (None, 28, 32)            7808
_________________________________________________________________
lstm_2 (LSTM)                (None, 28, 32)            8320
_________________________________________________________________
lstm_3 (LSTM)                (None, 32)                8320
_________________________________________________________________
dense_1 (Dense)              (None, 10)                330
=================================================================
Total params: 24,778
Trainable params: 24,778
Non-trainable params: 0
_________________________________________________________________

'''
