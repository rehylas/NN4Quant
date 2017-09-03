
# -*- coding: UTF-8 -*-
print(__doc__)

import sys
import os
from keras.utils import np_utils
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Dropout
import numpy as np
import PIL.Image as Image
import time

pngRootPath ='/home/hylas/dev/data/min5_png/'

imgWidth  =480
imgHeitht =480
nWidth  = 28
nHeight = 28
nCannle = 1
input_dim = (nWidth, nHeight, nCannle )


# 卷积层中使用的卷积核的个数
nb_filters = 32
# 卷积核的大小
kernel_size = (3, 3)
# 池化层操作的范围
pool_size = (2, 2)
nEpochs = 20
batch_size = 32

samples_per_epoch= 48000
#samples_per_epoch= 9600


def BuildMode_MLP(): #error

    model = Sequential()
    model.add(Dense(128, input_dim= input_dim, activation='relu'))
    model.add(Dropout(0.1))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.1))
    model.add(Dense(32, activation='relu'))
    model.add(Dropout(0.1))
    model.add(Dense(5, activation='sigmoid'))

    model.compile(loss='categorical_crossentropy',
              optimizer='adadelta',
              metrics=['accuracy'])

    return model

import keras
from sklearn.datasets import fetch_mldata
from keras.layers import Conv2D, MaxPooling2D
from keras.optimizers import SGD
from keras.models import load_model
from keras.layers import Dense, Dropout, Flatten
from keras.utils import np_utils

def BuildMode_CNN():

    model = Sequential()
    # input: 28x28 images with 1 channels -> (28, 28, 1) tensors.
    # this applies 32 convolution filters of size 3x3 each.
    # layer 1   Conv2D
    model.add(Conv2D( nb_filters , kernel_size,  activation='relu', border_mode='valid', input_shape=  input_dim   ))

    # layer 2 Maxpooling
    model.add( MaxPooling2D( pool_size= pool_size )  )
    model.add(Dropout(0.25))

    #  layer 3   2d 2 1d   用于下一阶段处理
    model.add( Flatten() )

    # layer 4 全连接层
    # 包含256个神经元的全连接层，激活函数为ReLu，dropout比例为0.5
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.5))

    # layer 5  output
    model.add(Dense(5, activation='softmax'))

    # 使用SGD + momentum
    # model.compile里的参数loss就是损失函数(目标函数)
    #sgd = SGD(l2=0.0, lr=0.05, decay=1e-6, momentum=0.9, nesterov=True)
    sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)


    model.compile(loss='categorical_crossentropy', optimizer=sgd)
    print model.summary()
    return  model

#  类似VGG的卷积神经网络：   Conv2D --> Conv2D --> MaxPooling2D --> Conv2D --> Conv2D --> MaxPooling2D
#   --> Flatten -->Dense(256) -->Dense(10)
def BuildMode_VGG():
    # Generate dummy data
    print 'input_dim:', input_dim
    model = Sequential()
    # input: 100x100 images with 3 channels -> (100, 100, 3) tensors.
    # this applies 32 convolution filters of size 3x3 each.
    model.add(Conv2D(nb_filters , kernel_size, activation='relu', input_shape= input_dim   ))
    model.add(Conv2D(nb_filters , kernel_size, activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Conv2D( nb_filters*2 , kernel_size,  activation='relu'))
    model.add(Conv2D( nb_filters*2 , kernel_size,  activation='relu'))
    model.add(MaxPooling2D(pool_size=  pool_size   ))
    model.add(Dropout(0.25))

    model.add(Flatten())
    model.add(Dense(256, activation='relu'))


    model.add(Dropout(0.5))
    model.add(Dense(5, activation='softmax'))

    print model.summary()
    #return

    sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
    model.compile(loss='categorical_crossentropy', optimizer=sgd)
    return model

def generate2mem( path,   size ,  testFlag= False ):
    #X,y = generate_arrays_from_file(path, batch_size)
    while 1:
        f = open( path )
        cnt = 0
        X =[]
        Y =[]
        lineCnt = 0

        testOffset = 0
        for line in f:
            if( testFlag == True  and  testOffset <=samples_per_epoch ):
                testOffset +=1
                continue
                pass


            #if( lineCnt>= samples_per_epoch ):
                #break
            # create Numpy arrays of input data
            # and labels, from each line in the file
            x, y = process_line(line)
            if(   x is None ):
                continue

            X.append(x)
            Y.append(y)
            cnt += 1
            lineCnt +=1
            if (cnt %100 ==0 ):
                print cnt

            if cnt==size:
                cnt = 0
                Y_5d = np_utils.to_categorical(np.array(Y), num_classes= 5 )
                f.close()
                return np.array(X),  Y_5d
                X = []
                Y = []
    f.close()
    return X, y

def generate_arrays_from_file( path,  batch_size ):
    while 1:
        f = open( path )
        cnt = 0
        X =[]
        Y =[]
        lineCnt = 0
        for line in f:
            if( lineCnt>= samples_per_epoch ):
                break
            # create Numpy arrays of input data
            # and labels, from each line in the file
            x, y = process_line(line)
            if(   x is None ):
                continue

            X.append(x)
            Y.append(y)
            cnt += 1
            lineCnt +=1
            if cnt==batch_size:
                cnt = 0
                Y_5d = np_utils.to_categorical(np.array(Y), num_classes= 5 )
                yield (np.array(X),  Y_5d )
                X = []
                Y = []
    f.close()

def process_line(line):

    tmp = [ str(val) for val in line.strip().split(',')]
    rec =[ tmp[2], tmp[3] ]
    #print  tmp[2], tmp[3]
    if( os.path.exists( pngRootPath + tmp[2] ) == False ):
        return None,None

    if( nCannle == 1 ):
        x = png2array1D_cj_28x28(pngRootPath + tmp[2])

        #x = png2array1D(pngRootPath + tmp[2])
        #x = png2array1D_cj(pngRootPath + tmp[2])


    if (nCannle == 3):
        x = png2array( pngRootPath + tmp[2] )


    y = np.array( tmp[3] )
    return x,y


def png2array( file ):
    png = Image.open( file )  #RGBA
    png.load()

    #图像太大处理太慢， 进行缩小
    png = png.resize(( nWidth, nHeight ), Image.ANTIALIAS)

    #print png.size
    newImg =   Image.new("RGB", png.size, (255, 255, 255))   #RGB



    newImg.paste(png, mask=png.split()[3])



    X_data = np.array( newImg ).reshape( nWidth, nHeight, nCannle )


    #dataInfo( X_data )
    #print  sys.getsizeof( X_data )
    #print X_data

    png.close()
    newImg.close()
    return X_data

nCount = 0
def png2array1D(file):
        png = Image.open(file)  # RGBA
        png.load()

        # 图像太大处理太慢， 进行缩小
        png = png.resize((nWidth, nHeight), Image.ANTIALIAS)
        newImg = png.convert('L')

        #tempName  = time.strftime('vgg_%Y-%m-%d-%H-%M-%S', time.localtime()) +'.jpg'
        #newImg.save('./temp/' + tempName )

        #nCount = nCount+1

        X_data = np.array(newImg).reshape(nWidth, nHeight, nCannle )

        # dataInfo( X_data )
        # print  sys.getsizeof( X_data )
        #print X_data

        png.close()
        newImg.close()
        return X_data

def png2array1D_cj(file):
    png = Image.open(file)  # RGBA
    png.load()

    # 裁切图片 只保留重要部分
    region = (60, 60, 428, 428 )
    png = png.crop(region)

    # 图像太大处理太慢， 进行缩小
    png = png.resize((nWidth, nHeight), Image.ANTIALIAS)
    newImg = png.convert('L')

    tempName  = time.strftime('vgg_%Y-%m-%d-%H-%M-%S', time.localtime()) +'.jpg'
    newImg.save('./temp/' + tempName )

    # nCount = nCount+1

    X_data = np.array(newImg).reshape(nWidth, nHeight, nCannle)

    # dataInfo( X_data )
    # print  sys.getsizeof( X_data )
    # print X_data

    png.close()
    newImg.close()
    return X_data
    pass

def png2array1D_cj_28x28(file ):
    png = Image.open(file)  # RGBA
    png.load()

    # 裁切图片 只保留重要部分
    region = (60, 60, 428, 428 )
    png = png.crop(region)

    # 图像太大处理太慢， 进行缩小
    png = png.resize((nWidth, nHeight), Image.ANTIALIAS)
    newImg = png.convert('L')

    #tempName  = time.strftime('vgg_%Y-%m-%d-%H-%M-%S', time.localtime()) +'.jpg'
    #newImg.save('./temp/' + tempName )

    # nCount = nCount+1

    X_data = np.array(newImg).reshape(nWidth, nHeight, nCannle)
    X_data = 255-X_data
    X_data = X_data.astype('float32')
    X_data = X_data/255

    #for i in range(0,28):
        #print X_data[i]
    #print X_data.reshape(784,1 )

    # dataInfo( X_data )
    # print  sys.getsizeof( X_data )
    # print X_data

    png.close()
    newImg.close()
    return X_data
    pass

def dataInfo(data):
    print type(data)
    if (  isinstance (	data,  np.ndarray  ) ):
        print data.shape

def dataDetail(data):
    print data

import  time

def do1_fit_generator():
    #model = BuildMode_CNN()
    model = BuildMode_VGG()

    #print generate_arrays_from_file('png_file_list.csv', batch_size  )

    model.fit_generator( generate_arrays_from_file('png_file_list.csv', batch_size  ),
                        samples_per_epoch= samples_per_epoch , nb_epoch= nEpochs,   max_q_size=1000,
                        verbose=1, nb_worker=1)

    model.save('stock_cnn1_'+ time.strftime('vgg_%Y-%m-%d-%X', time.localtime()) +'.h5')


def do2_fit_mem():

    t = time.time()
    #X,y = generate2mem( 'png_file_list.csv',  samples_per_epoch)
    X, y = loaddatafromdisk()

    print type(X), type(y)
    print X.shape ,  y.shape
    print 'time:' , time.time() - t

    model = BuildMode_VGG()

    #print generate_arrays_from_file('png_file_list.csv', batch_size  )
    model.fit(  X,y, batch_size,  nb_epoch= nEpochs,     verbose=1 , validation_split=0.10   )

    model.save('stock_vgg2_'+ time.strftime('vgg2_%Y-%m-%d-%X', time.localtime()) +'.h5')

    x_test=X[:1000]
    y_test=y[:1000]

    x_test, y_test = generate2mem('png_file_list.csv', 1000, testFlag=True)

    out_x_test =  x_test.reshape((1000, 784))

    np.savetxt('data_table_' + 'test' + '_x.txt', out_x_test )
    np.savetxt('data_table_' + 'test' +'_y.txt', y_test )

    testModle(model, x_test, y_test, batch_size= batch_size )


def loaddatafromdisk():

    data = np.loadtxt('data_table_' + str(samples_per_epoch) + '_x.txt' )
    print 'from:', data.shape

    data = data.reshape(  (samples_per_epoch, 28,28,1)   )
    print  'to:', data.shape
    y =  np.loadtxt('data_table_' + str(samples_per_epoch) + '_y.txt' )
    return  data,y


def savedata2disk():

    X, y = generate2mem('png_file_list.csv', samples_per_epoch)

    X = X.reshape((samples_per_epoch, 784))

    np.savetxt('data_table_' + str(samples_per_epoch) + '_x.txt',X )
    np.savetxt('data_table_' + str(samples_per_epoch) + '_y.txt', y)
    #print 't4:' ,  time.time() - t
    print X.shape
    print y.shape

    return

    data = np.loadtxt('data_table_X.txt' )
    print data.shape

    data = data.reshape(  (samples_per_epoch, 28,28,1)   )
    print data.shape

def testModle(model, x_test ,y_test, batch_size= 32 ):
    y_pret= model.predict(x_test , batch_size= batch_size  )
    test_accuracy = np.mean(np.equal(y_test, y_pret))
    print("accuarcy:", test_accuracy)
    dataInfo(y_test)
    dataInfo(y_pret)


    #print y_pret[ 0 ]

    y_pret[0] =  y_pret[0] / y_pret[0].max()
    #print y_pret[0]
    y_pret[0][(y_pret[0] != y_pret[0].max() )  ] = 0
    print y_pret[0]

    y_pret_ex =  y_pret.copy()

    for i  in range(0, len( y_pret ) ):
        y_pret_ex[i] = y_pret_ex[i] / y_pret_ex[i].max()
        y_pret_ex[i][(y_pret_ex[i] != y_pret_ex[i].max())] = 0
    print '------------------------------------'


    #print y_pret_ex[:10]
    #print y_pret[:10]

    test_accuracy = np.mean(np.equal(y_test, y_pret_ex))
    print("accuarcy:", test_accuracy)

def test():
    do2_fit_mem()

    #savedata2disk()
    #loaddatafromdisk()


    #dataInfo(X)
    #dataInfo(y)

    pass

if __name__ == "__main__":
    sys_code_type = sys.getfilesystemencoding()
    #print mystr.decode('utf-8').encode(sys_code_type)
    test()
