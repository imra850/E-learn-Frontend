package com.elearn.app.service;

import com.elearn.app.configuration.AppConstant;
import com.elearn.app.dtos.CourseDto;
import com.elearn.app.dtos.CustomPageResponse;
import com.elearn.app.dtos.ResourceContentType;
import com.elearn.app.entities.Course;
import com.elearn.app.entities.Video;
import com.elearn.app.exception.ResourceNotFoundException;
import com.elearn.app.repositories.CourseRepo;
import com.elearn.app.repositories.VideoRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    private CourseRepo courseRepo;

    private ModelMapper modelMapper;

    private VideoRepo videoRepo;


    private FileService fileService;


    public CourseServiceImpl(CourseRepo courseRepo, ModelMapper modelMapper, VideoRepo videoRepo, FileService fileService) {
        this.courseRepo = courseRepo;
        this.modelMapper = modelMapper;
        this.videoRepo = videoRepo;
        this.fileService = fileService;
    }

    @Override
    public CourseDto create(CourseDto courseDto) {
        String id= UUID.randomUUID().toString();
        courseDto.setId(id);
        courseDto.setCreatedDate(new Date());
        Course course=courseRepo.save(this.dtoToEntity(courseDto));
        return this.entityToDto(course);
    }

    @Override
    public CustomPageResponse<CourseDto> getAll(int pageNumber,int pageSize,String sortBy) {
        Sort sort=Sort.by(sortBy).ascending();
       PageRequest pageRequest= PageRequest.of(pageNumber,pageSize);
        Page<Course> coursePage=courseRepo.findAll(pageRequest);
        List<Course> all=coursePage.getContent();
        List<CourseDto> courseDtoList=all.stream().map(course -> entityToDto(course)).toList();
        CustomPageResponse<CourseDto> response=new CustomPageResponse<>();
        response.setContent(courseDtoList);
        response.setLast(coursePage.isLast());
        response.setTotalElements(coursePage.getTotalElements());
        response.setTotalPages(coursePage.getTotalPages());
        response.setPageNumber(pageNumber);
        response.setPageSize(pageSize);
        return response;
    }

    @Override
    public void delete(String courseId) {
      Course delete= courseRepo.findById(courseId).orElseThrow(()->new ResourceNotFoundException("Course not found"));
      courseRepo.delete(delete);

    }

    @Override
    public CourseDto getSingle(String courseId) {
        Course course=courseRepo.findById(courseId).orElseThrow(()->new ResourceNotFoundException("Course not found"));
        return entityToDto(course);
    }

    @Override
    public CourseDto update(CourseDto courseDto, String courseId) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        modelMapper.map(courseDto, course);
        //one by one
        Course updatedCourse = courseRepo.save(course);
        return modelMapper.map(updatedCourse, CourseDto.class);
    }

    @Override
    public List<CourseDto> search(String keyword) {
        List<Course> searchCourses=courseRepo.findByTitleContainingIgnoreCaseOrShortDescContainingIgnoreCase(keyword,keyword);
        return searchCourses.stream().map(course -> entityToDto(course)).toList();
    }

    @Override
    public CourseDto saveBanner(MultipartFile file, String courseId) throws IOException {
        Course course=courseRepo.findById(courseId).orElseThrow(()->new ResourceNotFoundException("Course not found"));
        String filePath=fileService.saveFile(file, AppConstant.COURSE_BANNER_UPLOAD_DIR,file.getOriginalFilename());
        course.setBanner(filePath);
        course.setContentType(file.getContentType());
        courseRepo.save(course);
        return entityToDto(course);
    }

    @Override
    public ResourceContentType getCourseBannerById(String courseId) {
        Course course=courseRepo.findById(courseId).orElseThrow(()->new ResourceNotFoundException("Course not found"));
        String bannerPath=course.getBanner();
        Path path= Paths.get(bannerPath);
        Resource resource=new FileSystemResource(path);
        ResourceContentType resourceContentType=new ResourceContentType();
        resourceContentType.setResource(resource);
        resourceContentType.setContentType(course.getContentType());
        return resourceContentType;
    }

    @Override
    public void addVideoToCourse(String courseId, String videoId) {
      Course course=  courseRepo.findById(courseId).orElseThrow(()->new ResourceNotFoundException("course not found"));
        Video video=  videoRepo.findById(videoId).orElseThrow(()->new ResourceNotFoundException("Video not found"));

        course.addVideo(video);
        courseRepo.save(course);
    }

    public CourseDto entityToDto(Course course){
        CourseDto courseDto1=modelMapper.map(course,CourseDto.class);
        return courseDto1;
    }

    public Course dtoToEntity(CourseDto courseDto){
        Course course=modelMapper.map(courseDto,Course.class);
        return course;
    }
}
