import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import '../cssFiles/style_for_manager.css';
import ReactLogo from '../logout_black_24dp.svg';
import ReactLogo2 from '../person_outline_black_24dp.svg';
import ReactLogo3 from '../create_black_24dp.svg';

function Manager(){

    const [imgNew, setImgNew] = useState('');
    const [nameNew, setNameNew] = useState('');
    const [modelNew, setModelNew] = useState('');
    const [priceNew, setPriceNew] = useState('');
    const [quantityNew, setQuantityNew] = useState('');
    const [statusNew, setStatusNew] = useState('true');
    const [selectCategoryNew, setSelectCategoryNew] = useState('1');

    const [idUpdate, setIdUpdate] = useState(0);
    const [imgUpdate, setImgUpdate] = useState('');
    const [nameUpdate, setNameUpdate] = useState('');
    const [modelUpdate, setModelUpdate] = useState('');
    const [priceUpdate, setPriceUpdate] = useState('');
    const [quantityUpdate, setQuantityUpdate] = useState('');
    const [soldUpdate, setSoldUpdate] = useState('');
    const [statusUpdate, setStatusUpdate] = useState('true');
    const [selectCategoryUpdate, setSelectCategoryUpdate] = useState('1');

    const [form1Inline, setForm1Inline] = useState('none');
    const [form2Inline, setForm2Inline] = useState('none');
    const [btnAddInline, setBtnAddInline] = useState('inline');

    const [categories, setCategories] = useState([]);
    const [gadgets, setGadgets] = useState([]);
    const [flag, setFlag] = useState(0);
    
    function getAllGadgets(){
        
        if(flag == 0)
        {
            axios({
                method:'get',
                url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/GetGadgets",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            })
            .then(data=>
            {
                setGadgets(data.data);    
            })
            setFlag(1);
            
        }
    }
    function getCategorys()
    {
        
        if(flag == 0)
        {
            axios({
                method:'get',
                url: "https://webapplicationclient20230302194755.azurewebsites.net/Category/GetCategorys",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            })
            .then(data=>
            {
                setCategories(data.data);
            })
            setFlag(1);
        }
    }
    function getGadgetsById(id)
    {
        setBtnAddInline('inline');
        setForm1Inline('none');
        setForm2Inline('none');
        axios({
            method:'get',
            url: `https://webapplicationclient20230302194755.azurewebsites.net/Gadget/GetGadgetbyId_Category?id=${id}`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setGadgets(data.data);    
        });
        
    }
    function btnFormAddGadget(){

        setForm1Inline('inline');
        setBtnAddInline('none');
    }
    function btnFormUpdate(id, img, name, model, price, quantity, sold, status, idCategory){
        window.scrollTo(0, 0);
        setIdUpdate(id);
        setImgUpdate(img);
        setNameUpdate(name);
        setModelUpdate(model);
        setPriceUpdate(price);
        setQuantityUpdate(quantity);
        setSoldUpdate(sold);
        setStatusUpdate(status);
        setSelectCategoryUpdate(idCategory);
        setForm2Inline('inline');
    }
    function btnAddGadget(){
        
        setForm1Inline('none');
        let new_gadget = {
            Image: imgNew,
            Name: nameNew,
            Model: modelNew,
            Price: parseFloat(priceNew),
            Quantity: parseInt(quantityNew),
            Status: (statusNew === "true"),
            IdCategory: parseInt(selectCategoryNew)
        };
        axios({
            method:'post',
            url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/Add Gadget",
            data: JSON.stringify(new_gadget),
            dataType: "dataType",
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
    function btnDell(id){
        axios({
            method:'post',
            url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/RemoveGadgetbyId",
            data: JSON.stringify(id),
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            }
        })
        .then(data=>{
           console.log(data);
        })
    }
    function btnUodateGadget(){
        setForm2Inline('none');
        let update_gadget = {
            Id: parseInt(idUpdate),
            Image: imgUpdate,
            Name: nameUpdate,
            Model: modelUpdate,
            Price: parseFloat(priceUpdate),
            Quantity: parseInt(quantityUpdate),
            Sold: parseInt(soldUpdate),
            Status: (statusUpdate === "true"),
            IdCategory: parseInt(selectCategoryUpdate)
        };
        axios({
            method:'post',
            url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/UpdateGadgetbyId",
            data: JSON.stringify(update_gadget),
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
        console.log(window.sessionStorage.getItem('token'));
    }
    function getOut(){
        if(window.sessionStorage.getItem('token')==null|| window.sessionStorage.getItem('token')=='null')
        {
            alert('You don`t login!');
        }
        else{
            
            console.log(window.sessionStorage.getItem('token'));
            window.sessionStorage.setItem('token', null)
            window.location.href = '/login';
        }
       
    }
    return(
        <div className="App-header1">
            <div id="DivRegisAndLoginLinks">
                <div>
                    <Link className="link" to="/registManager">
                        Regist Manager 
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
                <span className="top" onClick={()=>window.location.href='/'}>STORE OF GADGETS</span>
            </div>
            <br></br>
        <div className="container-menu" id="container"  style={{cursor: 'pointer'}}>
            <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() =>btnFormAddGadget()} >Add Gadget</div>
            <div className = "name_category" onClick={() => window.location.reload()} >Show All</div>
            {getCategorys()}
            {
                categories.map((item, index)=>(
                    <div key={index}  className = "name_category" id={item.id} onClick={() => getGadgetsById(item.id)}>
                    {item.name}
                    </div>
                ))
            } 
        </div>
        <br></br>
        <div id="container_for_form">
            <div id="form1" style={{display: form1Inline}}>
                <br></br>
                <button className = "Btn" id = "DellBtn" onClick={()=>setForm1Inline('none')} style={{marginLeft:'100px', marginTop: '-15px', position: 'absolute'}} >X</button>
                <label>Image url:</label>
                <input className="new_gadget" id="img_new_gadget" onChange={(e)=>{setImgNew(e.target.value)}}></input>
                <label>Name:</label>
                <input className="new_gadget" id="name_new_gadget" onChange={(e)=>{setNameNew(e.target.value)}}></input>
                <label>Model:</label>
                <input className="new_gadget" id="model_new_gadget" onChange={(e)=>{setModelNew(e.target.value)}}></input>
                <label>Price:</label>
                <input className="new_gadget" id="price_new_gadget" onChange={(e)=>{setPriceNew(e.target.value)}}></input>
                <label>Quantity:</label>
                <input className="new_gadget" id="quantity_new_gadget" onChange={(e)=>{setQuantityNew(e.target.value)}}></input>
                <label>Status:</label>
                <select id="status_new_gadget" defaultValue='true' onChange={(e)=>{setStatusNew(e.target.value)}}>
                    <option value="true">Enablet</option>
                    <option value="false">Disabled</option>
                </select>
                <label>Category:</label>
                <select id="select_category" defaultValue="1" onChange={(e)=>{setSelectCategoryNew(e.target.value)}}>
                    <option value="1">Smartphone</option>
                    <option value="2">TV</option>
                    <option value="3">Tablets</option>
                </select>
                <br></br>
                <br></br>
                <button className="btn_gadget" id="create_gadget"  onClick={() =>btnAddGadget()}>Add</button>
            </div>
            <div id="form2" style={{display: form2Inline}}>
                <br></br>
                <button className = "Btn" id = "DellBtn" onClick={()=>setForm2Inline('none')} style={{marginLeft:'100px', marginTop: '-15px', position: 'absolute'}}>X</button>
                <label>Image url:</label>
                <input className="new_gadget" id="img_update_gadget" value={imgUpdate} onChange={(e)=>{setImgUpdate(e.target.value)}}></input>
                <label>Name:</label>
                <input className="new_gadget" id="name_update_gadget" value={nameUpdate} onChange={(e)=>{setNameUpdate(e.target.value)}}></input>
                <label>Model:</label>
                <input className="new_gadget" id="model_update_gadget" value={modelUpdate} onChange={(e)=>{setModelUpdate(e.target.value)}}></input>
                <label>Price:</label>
                <input className="new_gadget" id="price_update_gadget" value={priceUpdate} onChange={(e)=>{setPriceUpdate(e.target.value)}}></input>
                <label>Quantity:</label>
                <input className="new_gadget" id="quantity_update_gadget" value={quantityUpdate} onChange={(e)=>{setQuantityUpdate(e.target.value)}}></input>
                <label>Sold:</label>
                <input className="new_gadget" id="sold_update_gadget" value={soldUpdate} onChange={(e)=>{setSoldUpdate(e.target.value)}}></input>
                <label>Status:</label>
                <select id="status_update_gadget" defaultValue={statusUpdate} onChange={(e)=>{setStatusUpdate(e.target.value)}}>
                    <option value="true">Enablet</option>
                    <option value="false">Disabled</option>
                </select>
                <label>Category:</label>
                <select id="select_update_category" defaultValue={selectCategoryUpdate} onChange={(e)=>{setSelectCategoryUpdate(e.target.value)}}>
                    <option value="1">Smartphone</option>
                    <option value="2">TV</option>
                    <option value="3">Tablets</option>
                </select>
                <br></br>
                <br></br>
                <button className="btn_gadget" id="update_gadget" onClick={() =>btnUodateGadget()}>Update</button>
                <br></br>
            </div>
        </div>
        <br></br>
        <div id="container-table">
            <table id="table_gadgets">
                <tbody>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Price ₴</th>
                        <th>Quantity</th>
                        <th>Sold</th>
                        <th>Enabled</th>
                        <th>Edit</th>
                    </tr>
                    {getAllGadgets()}
                    {
                    gadgets.map((item, index)=>(
                        <tr key={index} className = "row" id={item.id}>
                            <td><img className = "img_gadget-table"  src={item.image}></img></td>
                            <td className="cart_gadget-table">{item.name}</td>
                            <td className="cart_gadget-table">{item.model}</td>
                            <td className="cart_gadget-table">{item.price}₴</td>
                            <td className="cart_gadget-table">{item.quantity}</td>
                            <td className="cart_gadget-table">{item.sold}</td>
                            <td className="cart_gadget-table">{`${item.status}`}</td>
                            <td className="form_for_btns-table">
                                <button className = "Btn" id = "UpdateBtn" onClick={()=>btnFormUpdate(
                                        item.id, item.image, item.name, item.model, item.price, item.quantity, item.sold, item.status, item.idCategory
                                    )}>Update</button>
                                <button className = "Btn" id = "DellBtn" onClick={()=>btnDell(item.id)}>X</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
        <br></br>
    </div>
        
    );
}
export default Manager;