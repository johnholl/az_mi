import white from './imgs/white.png';
import greenblack from './imgs/greenblack.png';
import green from './imgs/green.png';
import blue from './imgs/blue.png';
import redblack from './imgs/redblack.png';
import yellow from './imgs/yellow.png';
import './App.css';
import { Divider, Col, Row } from 'antd';
import Uploader from './components/Uploader';
import AudioList from './components/AudioList';


function App() {
  return (
    <Row className="App" style={{paddingTop:50}}>
      <Col span={4}>
        <AudioList/>
      </Col>
      <Divider type="vertical" style={{ height: "810px"}}/>
      <Col span={18}>
      <Row justify={"center"} align={"middle"} style={{paddingBottom:20}}>
        {"Looking for a good audio file? Try "} <a style={{paddingLeft: 10}} href="https://www.wavsource.com/" target="_blank" rel="noreferrer">wavsource.com</a>
      </Row>
      <Divider/>
      <Row align={"middle"}>
        <Col span={8}>
        <img src={white} alt="white" style={{width:100, height:100}}/>
        </Col>
        <Col span={16}>
          <Uploader number={1}/>
        </Col>
      </Row>
      <Divider/>
      <Row align={"middle"}>
        <Col span={8}>
        <img src={blue} alt="blue" style={{width:100, height:100}}/>
        </Col>
        <Col span={16}>
          <Uploader number={2}/>
        </Col>
      </Row>
      <Divider/>
      <Row align={"middle"}>
        <Col span={8}>
        <img src={green} alt="green" style={{width:100, height:100}}/>
        </Col>
        <Col span={16}>
          <Uploader number={3}/>
        </Col>
      </Row>
      <Divider/>
      <Row align={"middle"}>
        <Col span={8}>
        <img src={yellow} alt="yellow" style={{width:100, height:100}}/>
        </Col>
        <Col span={16}>
          <Uploader number={4}/>
        </Col>
      </Row>
      <Divider/>
      <Row align={"middle"}>
        <Col span={8}>
        <img src={redblack} alt="redblack" style={{width:100, height:100}}/>
        </Col>
        <Col span={16}>
          <Uploader number={5}/>
        </Col>
      </Row>
      <Divider/>
      </Col>
    </Row>
  );
}

export default App;
