import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { RNCamera } from 'react-native-camera';


const TensorCamera = cameraWithTensors(RNCamera);

const ObjectDetection = async (frame) => {
  await tf.ready();

  const imageTensor = tf.browser.fromPixels({
    data: Buffer.from(frame.base64, 'base64'),
    width: frame.width,
    height: frame.height,
  });

  const model = await cocoSsd.load();

  const predictions = await model.detect(imageTensor);

  imageTensor.dispose();
  tf.disposeVariables();

  return predictions;
};

export default ObjectDetection;