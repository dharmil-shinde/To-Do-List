import React, { useEffect, useRef, useState } from 'react'
import './Todo.css'
import Metadata from './Metadata';
import{motion} from "framer-motion"
import CloseIcon from '@mui/icons-material/Close';


import FullscreenExitTwoToneIcon from '@mui/icons-material/FullscreenExitTwoTone';
import FullscreenTwoToneIcon from '@mui/icons-material/FullscreenTwoTone';
import ListItems from './ListItems';


//gettind data from localstorage
const getLocalData=()=>{
  const lists = localStorage.getItem("myToDoList")
  if(lists){
    return JSON.parse(lists)
  }else{
    return[];
  }
}


export default function TodoSearch() {
    

    const[input, newInput]= useState("")
    const[collect, newCollect]= useState(getLocalData())
    const [zoom, setZoom]= useState(true)
    const[add,setAdd]=useState("Add")
    const[isEditItem, setIsEditItem]= useState("")
   
    const inpRef = useRef(null)
    const closeRef = useRef(null)

    
    
   
    const removeAll=()=>{
        newCollect([]);
    
        closeRef.current.style.visibility= "hidden";

    }

    const adding=()=>{
        if(input && add==="Edit"){
          setAdd("Add") 
          newInput("")
              // console.log("dharmil")
              newCollect(
                collect.map((elem)=>{
                  if(elem.id===isEditItem){
                    return {...elem, name:input}
                  }
                  return elem;
            })
          )
              
          }else if(input){
            const newVarInput ={id: new Date().getTime().toString(),
                             name: input }
              closeRef.current.style.visibility ="visible"
              newCollect([...collect,newVarInput])
              newInput("")
         
        }
        else{
        // alert("Field is empty, Write something!")
        inpRef.current.focus()
    }}
    const deleteItem=(index)=>{
        const deleteFilter = collect.filter((element)=>{
          return element.id!==index;
        })
        newCollect(deleteFilter)
        if(collect.length>1){
        closeRef.current.style.visibility= "visible";}else{
            closeRef.current.style.visibility= "hidden"
           

        }


    }
    const openView=()=>{
      setZoom(false)
    }
    const closeView=()=>{
      setZoom(true)
    }
    const handleKeyPress = (event) => {
      if(input && add==="Edit"&& event.key === 'Enter'){
        setAdd("Add")
        newInput("")
            // console.log("dharmil")
            newCollect(
              collect.map((elem)=>{
                if(elem.id===isEditItem){
                  return {...elem, name:input}
                }
                return elem;
          })
        )
            
        }
      else if(event.key === 'Enter'&& input){
        closeRef.current.style.visibility ="visible"
      
        const newVarInput ={id: new Date().getTime().toString(),
          name: input }
        newCollect([...collect,newVarInput])
        newInput("")
      }else{
        inpRef.current.focus()
    }
    }
    //local storage using..
    const editItem=(id)=>{
      const edit= collect.find((ele)=>{
        return ele.id===id; 
      })
      setIsEditItem(id)
        newInput(edit.name);
        setAdd("Edit")
        
    }
    useEffect(()=>{
      localStorage.setItem("myToDoList",JSON.stringify(collect))

    },[collect])
  return (
    <div >
      <Metadata title="ToDo-List"/>
      <div className='todo-container' >
         
          <div className="todo-inp-btn" >

              <input type="text" ref={inpRef} placeholder="What's your plan! " value={input} onChange={(e)=>{newInput(e.target.value)}} onKeyPress={handleKeyPress}/>
              <button onClick={adding}>{add}</button>

          </div>
          
          {collect && 
          <div  className='icons-div' ref={closeRef}>
            <FullscreenTwoToneIcon  onClick={openView} className="fullscreen"style={{fontSize:"3rem"}}/>
            <FullscreenExitTwoToneIcon onClick={closeView}className="fullscreen-exit"style={{fontSize:"3rem"}}/>
            <CloseIcon className="todo-close-icon" style={{fontSize:"3rem"}} onClick={removeAll} title="Remove all" />
          </div>}

          {collect.length===0?<motion.div animate={{scale:1.2}} transition={{duration:1}} className='no-notes'>its Empty! </motion.div>: 
          <div className="todo-list">
            
              {collect.map((item)=>{
                        return (
                          <ListItems name={item.name} key={item.id} id={item.id} zoom={zoom} di={deleteItem} ei={editItem}/>
                        ) 
                    })} 
          </div>}
      </div>
    </div>
  ) 
}

