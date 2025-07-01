package com.elearn.app.service;

import com.elearn.app.dtos.CourseDto;
import com.elearn.app.dtos.CustomPageResponse;
import com.elearn.app.dtos.ResourceContentType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CourseService {

    CourseDto create(CourseDto courseDto);

    CustomPageResponse<CourseDto> getAll(int pageNumber, int pageSize,String sortBy);

    CourseDto getSingle(String courseId);

    void delete(String courseId);

    CourseDto update(CourseDto courseDto,String courseId);

    List<CourseDto> search(String title);

    public CourseDto saveBanner(MultipartFile file,String courseId) throws IOException;

    public ResourceContentType getCourseBannerById(String courseId);

    public void addVideoToCourse(String courseId,String videoId);
}
