import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef} from "react";
import React from "react";
import Webcam from "react-webcam";
import ReactLogo from '../logout_black_24dp.svg';
import ReactLogo2 from '../person_outline_black_24dp.svg';
import ReactLogo3 from '../create_black_24dp.svg';

import '../cssFiles/style_main.css';

function Main(){
    const webcamRef = useRef(null);
    const [cordinate, setCordinate] = useState([]);
    const [leftC, setLeftC] = useState(0);
    const [topC, setTopC] = useState(0);
    const [widthC, setWidthC] = useState(0);
    const [heightC, setHeightC] = useState(0);
    const[text, setText] = useState("");

    const [file, setFile] = useState();
    const [screen, setScreen] = useState();
    const [imgSrc, setImgSrc] = useState(null);

    var img = document.getElementById("img");
    var can = document.getElementById("canvas");
    const canvas = useRef();
    const capture = React.useCallback(() => {
        try{
            console.log(webcamRef.canvas);
            const imageSrc = webcamRef.current.getScreenshot();
            const blob = dataURLtoBlob(imageSrc);
            setFile(blob);
            setScreen(true);
            clearCoord();
        }
       catch{ alert("Webcam not connected!")}

    }, [webcamRef, setImgSrc]);
    const saveFile = (e)=>{
        setFile(e.target.files[0]);
        setScreen(false);
        clearCoord();
    }

    
    function drawRectangle(array) {
        const context = canvas.current.getContext("2d");
        context.strokeStyle = "red";
        context.lineWidth = 2;
        console.log(array);
        for (const item of array) {
            context.strokeRect(
                (can.width/img.width)*item.left*img.width, 
                (can.height/img.height)*item.top*img.height, 
                (can.width/img.width)*item.width*img.width, 
                (can.height/img.height)*item.height*img.height
            );
        }
        
    }
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }
    function srcImg(){
       if(file!=null)
       {
            return URL.createObjectURL(file)
       }
    }
    function getOut(){
        if(window.sessionStorage.getItem('token')==null|| window.sessionStorage.getItem('token')=='null')
        {
            alert('You don`t login!');
        }
        else{
            window.sessionStorage.setItem('token', null)
            window.location.href = '/login';
        }
       
    }
    function findFace(){
        // postUserName()
        const formData = new FormData();
        formData.append("file", file);
        axios.post('https://localhost:7020/Recogin/UploadImg', formData,
        { 
            headers: 
            { 
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            } 
        }) 
        .then(data => { 
            drawRectangle(data.data);
        })
        .catch(error => { console.log(error.data)});
    }
    function postUserName(){
        console.log( window.sessionStorage.getItem('login'));
        axios({
            method:'post',
            url: "https://localhost:7020/Recogin/UserName",
            data: window.sessionStorage.getItem('login'),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            }
        })
        .then(data=>{
           console.log(data);
           window.location.reload();
        })
       
       
    }
    function clearCoord(){
        const context = canvas.current.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        setLeftC(0);
        setTopC(0);
        setWidthC(0);
        setHeightC(0);
    }
    function findText(){
        const formData = new FormData();
        formData.append("file", file);
        axios.post('https://localhost:7020/Recogin/UploadImgText', formData,
        { 
            headers: 
            { 
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            } 
        }) 
        .then(data => { 
            setText(data.data);
        })
        .catch(error => { console.log(error.data)});
    }
    return(
        <div className="App1">
            <div className="App-header1">
                <div className="hamburger">
                    <div className="hamburgerMenu">
                        <div><Link className="link" to="/regist">Regist</Link></div>
                        <div><Link className="link" to="/login">Login</Link></div>
                        <div><b className="link"  style={{ cursor: 'pointer'}} id="out" onClick={()=>getOut()}>Out</b></div> 
                    </div>
                </div>
                <div id="DivRegisAndLoginLinks">
                    <div>
                        <Link className="link" to="/regist">
                            Regist  
                            <img src={ReactLogo3} style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                        </Link>
                        
                        <b className="RegisAndLoginLinks" > or </b>
                        <Link className="link" to="/login">
                            Login   
                            <img src={ReactLogo2} style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                        </Link>
                        
                    </div>
                    <div onClick={()=>getOut()} style={{ cursor: 'pointer'}}>
                        <b className="link" id="out" >Out   </b>
                        <img src={ReactLogo} style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                    </div>
                    
                </div>
                <br></br>
                <div style={{textAlign: 'center'}}>
                    <span className="top" onClick={()=>(window.location.reload())}>FACE FIND</span>
                </div>
                <br></br>
                <div className="main-form-img">
                    <div>
                        <h2 style={{textAlign: "center"}}>Text</h2>
                        <div className="text-form">
                        {text}
                        </div>
                    </div>
                    <div>
                        <h2 style={{textAlign: "center"}}>WebCamera</h2>
                        <div className="web-cam-form">
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                height={220}
                                width={620}
                                screenshotFormat="image/jpeg"
                            />
                            <br></br>
                            <button className="BuyBtn" onClick={capture}>Capture photo</button>
                        </div>
                    </div>
                    <div>
                        <h2 style={{textAlign: "center"}}>Image</h2>
                        <div className="form-img">
                            <img className="image" id="img" style={{display: "none"}} src={srcImg()}></img>
                            <canvas className="canvas" ref={canvas} style={{backgroundImage: `url(${srcImg()})`}} id="canvas"></canvas>
                            <br></br>
                            <input type="file" className="file" onChange={saveFile} accept="image/*"></input>
                            
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="buttons">
                    <button className="BuyBtn" onClick={()=> (findFace())}>Find Face</button>
                    |
                    <button className="BuyBtn"  onClick={()=> (findText())}>Find Text</button>
                </div>
            </div>
        </div>
    );
}

export default Main;