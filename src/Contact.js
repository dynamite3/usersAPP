import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { EditAttributesRounded } from '@material-ui/icons';

const ourapiendpoint="https://userinfo-kaustubh.herokuapp.com/users"

export function Contact() {
    
    const [flag,setflag]=useState(true)
    const [id,setid]=useState(null)
    const [users,setusers]=useState([])
    const [username,setusername]=useState("")
    const [userpic,setuserpic]=useState("")


    function getUsers(){
        fetch(ourapiendpoint)
            .then((data)=>data.json())
            .then((users)=>setusers(users))
    }
    
    function deletUser(id){
        fetch("https://6118e9949bcfb4001716895d.mockapi.io/users/"+id,
        {method:"DELETE"}
        )
        .then(()=>getUsers())
    }

    function addUser(){
        
        fetch("https://6118e9949bcfb4001716895d.mockapi.io/users",
        {
            method:"POST",
            headers:{ 'Content-Type':"application/json" },
            body:JSON.stringify({name:username, url:userpic}),
        })
        .then((data)=>data.json())
        .then(()=>
            (
            getUsers(),
            removeContent()
            )
        )
    }
    function removeContent(){
        setusername("")
        setuserpic("")
    }

    function editUser(id,name,url){
        setflag(!flag)
        setid(id)
        flag ? setusername(name) :setusername("")
        flag ? setuserpic(url) : setuserpic("")
    }

    function update(){
        fetch("https://6118e9949bcfb4001716895d.mockapi.io/users/"+id,
        {
            method:"PUT",
            headers:{ 'Content-Type':"application/json"},
            body:JSON.stringify({name:username, url:userpic}),
        })
        .then((data)=>data.json())
        .then(()=>getUsers())
    }

    useEffect( ()=> {
            getUsers()
    },[]);

    
  return (
    <>
    <div className="form">
    <TextField  
    value={username} id="filled-basic" label="Name" variant="filled" 
    onChange={(event)=>setusername(event.target.value)}
    />
    <TextField 
    value={userpic} id="filled-basic" label="Profile" variant="filled" 
    onChange={(event)=>setuserpic(event.target.value)}
    />
    <Button variant="outlined"
    onClick={()=>username!=false && userpic!=false ?  flag ? addUser() : update() :""}
    >
        { flag ? "Add User" : "Update User"} 
    </Button>
    </div>
    <div className="ucontent">
        {
            users.map((user)=> <User id={user.id} name={user.name} url={user.avatar} deletUser={deletUser} editUser={editUser} />)
        }

    </div>
    </>
  )
}


function User({id,name,url,deletUser,editUser}){
    const history=useHistory();
    return(
        
        <Card 
        onClick={()=>history.push("/contact/"+id)}
        id="user_card" className="user_card"
        >
            <img className="profilepic" src={url}></img>
            <h2>{name}</h2>
            <div className="list_option">
            <Fab 
                    onClick={()=>editUser(id,name,url)}
                    color="secondary" aria-label="edit">
                <EditIcon />
            </Fab>
            <IconButton aria-label="delete" onClick={()=>deletUser(id)}>
                <DeleteIcon />
            </IconButton>
            </div>
            
        </Card>
    
        
    )
    
}