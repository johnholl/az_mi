import React, { useState } from 'react';
import { Upload, Button, message, Row, Col} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {storage, firestore} from '../firebase.js'
import {loc} from '../config';
import { template } from '@babel/core';



export default function AudioList(props) {
  const num = props.number; 
  const [audioList, setAudioList] = useState([]);

  React.useEffect(() => {
    (async function () {
    //   console.log("loaded");
    //   var temp = [];
    //   const AZsnapshot = await firestore.collection('AZ').get()
    //   AZsnapshot.docs.map(doc => {
    //       temp.push(doc.data())});
    //       const MIsnapshot = await firestore.collection('MI').get()
    //       MIsnapshot.docs.map(doc => {
    //           temp.push(doc.data())});
    //   setAudioList(temp);
    var temp = [];
    const flist = await storage.ref("AZ").listAll();
    await Promise.all(flist.items.map(async (fref) => {
        const url = await fref.getDownloadURL();
        const metadata = await fref.getMetadata();
        temp.push({name: metadata.fullPath, url: url})
      }));
    setAudioList(temp);
      })();
  }, []);

  return (
    <div>
        <h1>old files</h1>
        {audioList.map(val => 
        <Row justify="center" key={val.url}>
            <a href={val.url}>{val.name}</a>
        </Row>)}
    </div>

  );
};