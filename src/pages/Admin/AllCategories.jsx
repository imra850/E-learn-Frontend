import React, { useEffect, useState } from "react";
import { deleteCategory, getAllCategories, updateCategories } from "../../services/Category.service";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Table } from "flowbite-react";
import CustomConfirmModal from "../../Component/CustomConfirmModal";
import { HiOutlineExclamationCircle } from "react-icons/hi";





const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryResponse, setCategoryResponse] = useState(null);
  const { register, handleSubmit, watch, formState: { errors },setValue } = useForm();

  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [updateCategory,setUpdateCategory]=useState(null);

  function onCloseModal() {
    setOpenModal(false);
    setEmail('');
  }

  useEffect(() => {
    loadAllCategories();
  }, []);

  useEffect(()=>{
    if(updateCategory){
      setValue("title",updateCategory.title);
      setValue("desc",updateCategory.desc);
    }
  },[updateCategory])

  const loadAllCategories = async () => {
    const response = await getAllCategories();
    console.log(response);
    setCategories(response.content);
    setCategoryResponse(response);
  };

  const handleCloseModal=()=>{
    setOpenModal(false);
  }

   const [courseToDelete, setCourseToDelete] = useState(null);

   async function callApiToDeleteCourse() {
       try {
         const reponse = await deleteCategory(courseToDelete.id);
         console.log(reponse);
   
   
         const newCourses = categories.filter(
           (item) => item.id != courseToDelete.id
         );
         toast.success("courseDeleted");
         setCourseToDelete(null);
       } catch (error) {
         console.log(error);
         toast.error("courseDeleteFailed");
       } finally {
         setConfirmDeleteOpenModal(false);
       }
     }
   
 


  
   const openEditModal=(cat)=>{
      setOpenModal(true);
      setUpdateCategory(cat);
   }

   const onsubmit= async ()=>{
    try{
      const response=await updateCategories(updateCategory,updateCategory.id);
      const updatedCategories=categories.map((item)=>{
        if(item.id==updateCategory.id){
          return updateCategory;
        } 
       return item;
      })
      setCategories(updatedCategories);
      setTimeout(()=>{
        toast.success("Category Updated Successfully");
        setOpenModal(false);
      },1000);
     
    } catch(error){
      console.log(error);
      toast.error("Error in updating Category");
    }
   }

     const [confirmDeleteOpenModal, setConfirmDeleteOpenModal] = useState(false);
   

  const handleModal=()=>{
    return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
    <Modal.Header />
    <Modal.Body>
    <form onSubmit={handleSubmit(onsubmit)}  className="space-y-6">
    <div>
      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Update Category : <span>{updateCategory?.title}</span></label>
      <input
        type="text"
        id="title"
        defaultValue={updateCategory?.title}
        // value={title}
        // onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-yellow-400"
        placeholder="Enter category title"
        
        {...register("title", {
          required: "Title is Required !",
          onChange: (e)=>{
            setUpdateCategory({
              ...updateCategory,
              title: e.target.value,
            })
          }
         
        })}
      />
      {errors.title && (
          <span className="text-red-400  block px-2">
            {errors.title.message}
          </span>
        )}
    </div>

    <div>
      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Description</label>
      <textarea
        // value={description}
        // onChange={(e) => setDescription(e.target.value)}
        defaultValue={updateCategory?.desc}
        
        className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-yellow-400"
        placeholder="Enter category description"
        rows="4"
        
        {...register("desc", {
          required: "Description is Required !",
          onChange: (e)=>{
            setUpdateCategory({
              ...updateCategory,
              desc: e.target.value,
            })
          }
         
        })}
      ></textarea>
       {errors.desc && (
          <span className="text-red-400  block px-2">
            {errors.desc.message}
          </span>
        )}

    </div>

   

    <div className="text-center">
      <button
        type="submit"
        className="px-6 py-2 font-semibold bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition"
       
      >
       Save
      </button>
    </div>
  </form>
    </Modal.Body>
  </Modal>
    )
  }
  

  return <>
    <div className="mt-14 px-6 lg:px-16">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-12">
        All Categories: {categories.length}
      </h1>
      {/* <div className="grid scale-y-100  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <CatView key={index} openEditModal={openEditModal} deleteCat={deleteCat} category={category} />
          
        ))}
      </div>
        {handleModal()}
    </div> */}
     <div className="p-4">
            
            {categories && (
              <div className="overflow-x-auto">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>AddedDate</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>

                   
                  </Table.Head>
                  <Table.Body className="divide-y">
                    
                    {categories?.map((course, index) => (
                      <Table.Row
                        key={index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell>{course.title}</Table.Cell>
                        
                        <Table.Cell> {course.desc} </Table.Cell>
                        
                        <Table.Cell>{course.addedDate} </Table.Cell>
                      
                        <Table.Cell>
                         
                         
                          <a
                            href="#"
                            onClick={() => {
                              setConfirmDeleteOpenModal(true);
                              setCourseToDelete(course);
                            }}
                            className="ml-3 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          >
                            Delete
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                
              </div>
            )}
          </div>
          <CustomConfirmModal
        isOpen={confirmDeleteOpenModal}
        heading={"Delete Course"}
        confirmButtonText="Delete Course"
        declineButtonText="Close"
        confirmButtonClicked={() => {
          callApiToDeleteCourse();
        }}
        closeModal={() => {
          setConfirmDeleteOpenModal(false);
          setCourseToDelete(null);
        }}
        showConfirmButton={true}
        showDeclineButton={true}
      >
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
        </div>
      </CustomConfirmModal>
     
</div>


  
  </>

  
};

export default AllCategories;
