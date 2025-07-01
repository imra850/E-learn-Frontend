import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCourseById } from '../../services/Course.Service';
import { getVideoOfCourse } from '../../services/Video.service';
import { baseUrl } from '../../Config/axios.config';
import { Avatar, List } from "flowbite-react";
import { MdVideocam } from "react-icons/md";
import { Helmet } from "react-helmet";
import VideoPlayer from '../../Component/VideoPlayer';

const Learning = () => {
    const { courseId } = useParams();

    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);

    const loadCourse = async () => {
        const response = await getCourseById(courseId);
        setCourse(response);
    };

    const loadVideos = async () => {
        if (course) {
            const response = await getVideoOfCourse(course.id);
            setVideos(response);
            setCurrentVideo(response[0]);
        }
    };

    useEffect(() => {
        if (course) {
            loadVideos();
        } else {
            loadCourse();
        }
    }, [course]);

    function getActiveClass(video) {
        return video.id === currentVideo?.id
            ? "dark:bg-green-700 bg-gray-800 text-gray-50"
            : "dark:bg-gray-700";
    }

    return (
        <div className="mt-16 px-8">
            <Helmet>
                <title>{currentVideo?.title || 'Learning'}</title>
            </Helmet>
            <h1 className="text-2xl font-semibold mb-4 dark:text-gray-300">
                Learning: {course?.title}
            </h1>

            <div className="flex h-screen">
                {/* Left Section */}
                <div className="w-1/4 h-full overflow-y-auto border-r border-gray-300 dark:border-gray-700 pr-4">
                    <List unstyled className="divide-y divide-gray-200 dark:divide-gray-500">
                        {videos.map((video) => (
                            <List.Item
                                key={video.id}
                                onClick={() => setCurrentVideo(video)}
                                className={`cursor-pointer rounded-lg p-2 mb-2 ${getActiveClass(video)}`}
                            >
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <MdVideocam size={30} />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">
                                            {video.title}
                                        </p>
                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                            {course?.title}
                                        </p>
                                    </div>
                                </div>
                            </List.Item>
                        ))}
                    </List>
                </div>

                {/* Right Section */}
                <div className="w-3/4 h-full flex flex-col p-4 gap-4">
                    <div className="flex-1">
                        <VideoPlayer videoUrl={`${baseUrl}/videos/stream/${currentVideo?.id}`} />
                    </div>
                    <h1 className="text-3xl font-semibold">{currentVideo?.title}</h1>
                    <p className="text-gray-700 dark:text-gray-300">{currentVideo?.desc}</p>
                </div>
            </div>
        </div>
    );
};

export default Learning;
