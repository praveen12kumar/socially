import React from 'react'
import { Button, Modal } from 'antd';
import { useState } from 'react';
import "./modalComponent.scss";


const ModalComponent = ({modalOpen, setModalOpen,post, setPost}) => {
  return (
    <div>
    <Modal
        title="Write Post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
            <Button 
                key="submit" 
                type="primary" 
                disabled={post.length > 0 ? false : true} 
                //onClick={sendStatus}
                >
              Post
            </Button>
          ]}
      >
         <input  
            className="modal-input" 
            type="text" 
            placeholder='Write something...'
            onChange={(e)=> setPost(e.target.value)}
            value={post}
        />
        
      </Modal>
    </div>
  )
}

export default ModalComponent
