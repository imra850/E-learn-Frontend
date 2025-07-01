import React from 'react'
import { timeAgo } from '../../helper/TimeHelper';
import { getAllCourses,deleteCourse } from '../../services/Course.Service';
import { Helmet } from 'react-helmet';
import { useState,useEffect } from 'react';
import { PAGE_SIZE } from '../../helper/Constants';
import { Flowbite, Pagination } from "flowbite-react";
import { Checkbox, Table } from "flowbite-react";
import CustomConfirmModal from '../../Component/CustomConfirmModal';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import SingleCourseDisplay from '../../Component/SingleCourseDisplay';
import { MdDelete, MdPlayCircle, MdVideoFile } from "react-icons/md";
import { Button,List } from 'flowbite-react';
import { getVideoOfCourse } from '../../services/Video.service';
import VideoPlayer from '../../Component/VideoPlayer';
import { baseUrl } from '../../Config/axios.config';

const AllCourses = () => {
  const [courseData, setCourseData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  async function getCourses(page, size, sort) {
    try {
      const data = await getAllCourses(page, size, sort);
      console.log(data);
      setCourseData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const onPageChange = (page) => {
    console.log(page);
    // load the page data from the api
    getCourses(page - 1, PAGE_SIZE, "createdDate,desc");
  };

  useEffect(() => {
    getCourses(0, PAGE_SIZE, "createdDate,desc");
  }, []);

  const [confirmDeleteOpenModal, setConfirmDeleteOpenModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  async function callApiToDeleteCourse() {
    try {
      const reponse = await deleteCourse(courseToDelete.id);
      console.log(reponse);


      const newCourses = courseData.content.filter(
        (item) => item.id != courseToDelete.id
      );
      setCourseData({ ...courseData, content: newCourses });
      toast.success("courseDeleted");
      setCourseToDelete(null);
    } catch (error) {
      console.log(error);
      toast.error("courseDeleteFailed");
    } finally {
      setConfirmDeleteOpenModal(false);
    }
  }

  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [courseToDisplay, setCourseToDisplay] = useState(null);
  const [seeCourse,setSeeCourse]=useState(null);

  useEffect(() => {
    if (courseToDisplay && Object.keys(courseToDisplay).length > 0) {
      setOpenCourseModal(true); 
    }
  }, [courseToDisplay]);

  function handleUpdateButtonFromShowModal() {
    navigate(`/admin/courses/${courseToDisplay?.id}`);
  }

  const [courseVideos, setCourseVideos] = useState([]);

  async function loadCourseVideo(courseId) {
    const response = await getVideoOfCourse(courseId);
    setCourseVideos(response);
    console.log(response);
  }
  useEffect(() => {
    setCourseVideos([]);
  }, [courseToDisplay]);
  
  const [videoOfCourseModal, setVideoOfCourseModal] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState(null);



  return (
    <div className="mt-7">
      <Helmet>
        <title>All Courses</title>
      </Helmet>
      <div className="p-4">
        <div className="p-4">Courses : {courseData?.totalElements}</div>
        {courseData && (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Live</Table.HeadCell>
                <Table.HeadCell>Discount</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {courseData?.content?.map((course, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{course.title}</Table.Cell>
                    <Table.Cell>
                      {course?.categoryList?.length <= 0
                        ? "none"
                        : course?.categoryList[0]?.name}
                    </Table.Cell>
                    <Table.Cell>₹ {course.price} </Table.Cell>
                    <Table.Cell>{course.live ? "Live" : "Not Live"}</Table.Cell>
                    <Table.Cell>{course.discount} %</Table.Cell>
                    <Table.Cell>{timeAgo(course.createdDate)}</Table.Cell>
                  
                    <Table.Cell>
                    
                      <a
                       
                        className="ml-3 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => {
                          setCourseToDisplay(course);
                          console.log(courseToDisplay);
                          console.log(course);
                        }}
                      >
                        View
                      </a>
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
            <div className="flex mt-8 overflow-x-auto sm:justify-center">
              <Pagination
                layout="pagination"
                currentPage={courseData?.number + 1}
                totalPages={courseData?.totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
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

      <CustomConfirmModal
        isOpen={openCourseModal}
        heading={`Course Information : ${courseToDisplay?.title} `}
          confirmButtonText="Update"
        showConfirmButton={false}
        confirmButtonClicked={handleUpdateButtonFromShowModal}
        className={"w-full mx-auto"}
        size={"8xl"}
        declineButtonText="Close"
        closeModal={() => {
          setOpenCourseModal(false);
          setCourseToDisplay(null);
        }}
      >
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-7">
            <SingleCourseDisplay courseToDisplay={courseToDisplay} userView={false} />
          </div>
          <div className=" col-span-12 lg:col-span-5  ">
            <div className="flex justify-center flex-col items-center space-y-3">
              <h1>Videos of {courseToDisplay?.title}</h1>
              <Button
                onClick={() => {
                  loadCourseVideo(courseToDisplay?.id);
                }}
              >
                Load Videos
              </Button>

              <div className="list-container w-full">
                <List
                  unstyled
                  className=" w-full h-screen overflow-auto divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {courseVideos.map((video, index) => (
                    <List.Item
                      key={index}
                      className="p-3 rounded-lg   dark:bg-gray-950 sm:pb-4"
                    >
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div>
                          <MdVideoFile size={30} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {video.title}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {video.course.title}
                          </p>
                        </div>
                        <div className="inline-flex gap-2 items-center text-base font-semibold text-gray-900 dark:text-white">
                          <Button
                            onClick={() => {
                              setVideoToPlay(
                                `${baseUrl}/videos/stream/${video.id}`
                              );
                              setVideoOfCourseModal(true);
                            }}
                            color="red"
                            size="sm"
                            className="rounded-lg"
                          >
                            <MdPlayCircle size={20} />
                          </Button>
                          <Button
                            color="purple"
                            size="sm"
                            className="rounded-lg"
                          >
                            <MdDelete size={20} />
                          </Button>
                        </div>
                      </div>
                    </List.Item>
                  ))}
                </List>
              </div>
            </div>
          </div>
        </div>
      </CustomConfirmModal>
      <CustomConfirmModal
        isOpen={videoOfCourseModal}
        closeModal={() => {
          setVideoOfCourseModal(false);
        }}
        declineButtonText=""
        showDeclineButton={false}
        showConfirmButton={false}
        size="6xl"
      >
        <VideoPlayer videoUrl={videoToPlay} />
      </CustomConfirmModal>
    </div>
  );
}

export default AllCourses