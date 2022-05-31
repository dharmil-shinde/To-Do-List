import React from 'react'
import './Todo.css'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditTwoToneIcon from  '@mui/icons-material/EditTwoTone';
import DeleteForeverRoundedIcon from'@mui/icons-material/DeleteForeverRounded';

const ListItems = ({name, id, zoom, di,ei}) => {
  return (
    <>
      <div   className={zoom ? "todo-bookmark":"todo-bookmark2"}>
                                  <BookmarkIcon style={{fontSize:"3rem"}} className='todo-icon-bookmark'/>
                                 
                                  <p className='bookmarked-p' >{name}</p>
                                  <DeleteForeverRoundedIcon style={{fontSize:"3rem"}} className='todo-icon-delete' onClick={()=>{di(id)}}/>   
                                  <EditTwoToneIcon onClick={()=>{ei(id)}}className='todo-icon-edit'  style={{fontSize:"3rem"}}  />
                                </div>
    </>
  )
}

export default ListItems
