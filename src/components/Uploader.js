import React, { useState } from 'react';
import { Upload, Button, message, Row, Col} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {storage, firestore} from '../firebase.js'
import {loc} from '../config';


export default function Uploader(props) {
  const num = props.number; 
  const [audioLoading, setAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioName, setAudioName] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);

  React.useEffect(() => {
    (async function () {
      const doc = await firestore.collection(loc).doc(String(num)).get();
      if (doc.exists && doc.data().url) {
          setAudioName(doc.data().name);
          setAudioUrl(doc.data().url);
          var a = new Audio(doc.data().url);
          a.addEventListener('ended', () => setIsPlaying(false));
          setAudio(a);
        }
        else {
          setAudioUrl(null);
        }
      })();
  }, [audioUrl]);

  const handleAudioPlay = () => {
    
    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }
    else {
      audio.pause() 
      setIsPlaying(false)
    }

  }


  const upProps = {
    beforeUpload: file => {
      if (file.type.split('/')[0] !== 'audio') {
        message.error(`${file.name} is not an audio file`);
      }
      return file.type.split('/')[0] === 'audio' ? true : Upload.LIST_IGNORE;
    },
    onChange: info => {
    },
    customRequest: async ({ onError, onSuccess, file }) => {
      const metadata = {
          contentType: 'audio/'
      }
      const storageRef = storage.ref();
      const soundFile = storageRef.child(`${loc}/${file.name}`);
      try {
        const audio = await soundFile.put(file, metadata);
        const url = await audio.ref.getDownloadURL();
        setAudioUrl(url);
        setAudioLoading(false);
        await firestore.collection(loc).doc(String(num)).set({url: url, name: file.name}, {merge: true});
        onSuccess(null, audio);
      } catch(e) {
        onError(e);
      }
  },
  };

  return (
    <Row>
      <Col span={12}>
        {audioUrl ? 
        <div>
        <Row justify={"center"}>{`${audioName}`}</Row>
        <Row justify={"center"}> 
          <Button onClick={handleAudioPlay}>{isPlaying ? "pause" : "play"}</Button>
        </Row></div>: 
        "empty"}
      </Col>
      <Col span={12}>
        <Upload {...upProps} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Col>
    </Row>

  );
};