import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addToHistory, deleteAVideo, deleteCVideo,getAVideo,deleteACategory } from '../services/allAPI';


function ViewCard({displayVideo,setDeleteVideoStatus,ispresent,removeCVideo,categories,allCategory,id}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {setShow(true)

    const {caption,embedlink} = displayVideo
    let today = new Date()
    console.log(today);
    let timestamp = new Intl.DateTimeFormat('en-GB', { year:'numeric' ,month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'
}).format(today)
console.log(timestamp);
 let videoDetails = {
  caption,embedlink,timestamp
 }
 await addToHistory(videoDetails)
  }

  const removeVideo = async(id)=>{
    const response = await deleteAVideo(id)
    setDeleteVideoStatus(true)
  }

  //function to drag the videocard

  const cardDrag = (e,id)=>{
    console.log(`id is ${id}`);
    //to send data
    e.dataTransfer.setData("videoId",id)
  }

  const videoDrop = async(e,categoryID)=>{
    console.log(`dropped on the category Id :${categoryID}`);
    let videoID = e.dataTransfer.getData("videoId")
   //to get the data from videocard
   console.log(videoID);
   const selectCategory = categories.find(item=>item.id===categoryID)
   console.log(selectCategory);
   await deleteACategory(categoryID,id)
  
  }
   //function to prevent reload so that the data we send wont lost
   const dragOver= (e)=>{
    e.preventDefault()
  }

  return (
    <div droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,displayVideo?.id)}>
        <Card className='mb-5 ' style={{ width: '220px',height:'300px'}} draggable onDragStart={(e)=>cardDrag(e,displayVideo?.id)} >
        <Card.Img variant="top" onClick={handleShow} style={{height:'230px'}} src={displayVideo.url} />
        <Card.Body>
          <Card.Text className='justify-content-evenly' >
           {displayVideo.caption}
           {!ispresent?
            <button onClick={()=>removeVideo(displayVideo?.id)} style={{float:'right'}} className='btn btn-danger  '><i class="fa-solid fa-trash"></i></button>:
            <button onClick={()=>removeCVideo(displayVideo?.id)} style={{float:'right'}} className='btn btn-warning  '><i class="fa-solid fa-trash"></i></button>
           }
          </Card.Text>
        </Card.Body>
      </Card>
  
  <Modal
  show={show}
  onHide={handleClose}
  backdrop="static"
  keyboard={false}
  >
  <Modal.Header closeButton>
    <Modal.Title>{displayVideo.caption}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <iframe width="460" height="315" src={`${displayVideo.embedlink}?autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </Modal.Body>
  </Modal>
  
  
      
       
    </div>
  )
}

export default ViewCard