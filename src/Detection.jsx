import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as Speech from 'expo-speech'

const TensorCamera = cameraWithTensors(Camera);

const textureDims = Platform.OS === 'ios'
  ? { height: 1920, width: 1080 }
  : { height: 1200, width: 1600 };

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [net, setNet] = useState(null);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechQueue, setSpeechQueue] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      // Initialize TensorFlow
      await tf.ready();
      await initialiseTensorflow();
      // Load the model
      setNet(await mobilenet.load());
    })();
  }, []);

  useEffect(() => {
    if (speechQueue.length > 0 && !isSpeaking) {
      speakNextObject();
    }
  }, [speechQueue]);

  const initialiseTensorflow = async () => {
    // Add any necessary TensorFlow initialization code here
    // This function is optional and depends on your specific requirements
  };

  const handleCameraStream = async (images) => {
    const loop = async () => {
      if (net && !isSpeaking) {
        const nextImageTensor = images.next().value;
        if (nextImageTensor) {
          const objects = await net.classify(nextImageTensor);
          const filteredObjects = objects.filter((object) => object.probability > 0.8);
          setDetectedObjects(filteredObjects);
          if (filteredObjects.length > 0) {
            const objectNames = filteredObjects.map((object) => object.className).join(', ');
            console.log(objectNames);
            alert(objectNames);
            addToSpeechQueue(objectNames);
          }
          tf.dispose([nextImageTensor]);
        }
      }
      requestAnimationFrame(loop);
    };
    loop();
  };

  const addToSpeechQueue = (text) => {
    setSpeechQueue((prevQueue) => [...prevQueue, text]);
  };

  const speakNextObject = () => {
    if (speechQueue.length > 0) {
      const objectNames = speechQueue[0];
      setIsSpeaking(true);
     Speech.speak(objectNames, {
       onDone: () => {
        setIsSpeaking(false);
        setSpeechQueue((prevQueue) => prevQueue.slice(1));
      }
      });
     }
  };

  if (hasPermission === null) {
    return <View><Text>Could not ask camera permission</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>Rejected access to camera</Text>;
  }
  if (!net) {
    return <Text>Model not loaded</Text>;
  }

  return (
    <View style={styles.container}>
      <TensorCamera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onReady={handleCameraStream}
        resizeHeight={150}
        resizeWidth={152}
        resizeDepth={3}
        autorender={true}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});