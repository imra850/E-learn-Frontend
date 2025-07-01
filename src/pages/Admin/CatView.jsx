import React, { useState } from 'react'
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const CatView = ({category,deleteCat,openEditModal}) => {
    const banner =
    "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg";
    const [confirmModal,setConfirmModal]=useState(false);

    const handleDelete = () => {
      deleteCat(category);
      setConfirmModal(false);
    };
    
  return (
    <div
           
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105 flex flex-col h-full"
          >
           
            <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
              <img
                src={ banner}
                alt={category.title}
                className="w-full h-full object-cover"
              />
            </div>

           
            <div className="flex flex-col flex-grow p-4">
            
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {category.title}
              </h2>

             
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {category.desc}
              </p>

             
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
                Added on: {new Date(category.addedDate).toLocaleDateString()}
              </p>

          
              <div className="flex mt-auto justify-around">
                <button
                  className="bg-blue-500 text-white text-sm py-1.5 px-3 rounded-lg hover:bg-blue-600 transition-all"
                  onClick={() => 
                    openEditModal(category)
                   
                  }
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white text-sm py-1.5 px-3 rounded-lg hover:bg-red-600 transition-all"
                  onClick={() =>{ setConfirmModal(true);
                    
                  }

                  }
                >
                  Delete
                </button>
              </div>
            </div>
            {confirmModal && (
        <Modal
          show={confirmModal}
          size="md"
          onClose={() => setConfirmModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this category?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDelete}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setConfirmModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
            </div>
  )
}

export default CatView