import React from "react";
import {Menu} from "antd";
import { AppstoreOutlined, SettingOutlined,UserOutlined,  UserAddOutlined,LogoutOutlined } from '@ant-design/icons';
import {useState } from "react";
import {Link} from "react-router-dom";
import firebase from "firebase";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux"; //used to get the data from redux state

const { SubMenu, Item } = Menu;

const Header =() =>{    //we can not access the history as we accessed in registration complete page because history as a prop can only be accessed in the routes components
    let dispatch= useDispatch();
    let history=useHistory(); //thats why we are using history from usehistory
    //let state=useSelector((state)=> state); // grab the whole state using this 
    let {user} =useSelector((state)=>({... state})) //spreading the whole state using ... and picking only user from the state

    const [current, setCurrent]= useState("home")       //for antd design highlighting the current chosen one in navbar
    
    const handleClick = (e) =>{
        setCurrent(e.key);
    }

    const logout =()=>{
        firebase.auth().signOut();
        //changing the redux store
        //removing the user from the redux store
        dispatch({
            type: "LOGOUT",
            payload: null
        });

        history.push("/login")

    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]}  mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">Register</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login </Link>
                </Item>
            )}

            {user && (
                <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split("@")[0]} className="float-right">
                    <Item key="setting:1">Option 1</Item>
                    <Item key="setting:2">Option 2</Item>
                    <Item icon={<LogoutOutlined />} onClick={logout}>
                        Logout
                    </Item>

                </SubMenu>
            )}   
            
      </Menu>
    )
}

export default Header;