package com.elearn.app.service;

import com.elearn.app.dtos.CategoryDto;
import com.elearn.app.dtos.CourseDto;
import com.elearn.app.dtos.CustomPageResponse;
import com.elearn.app.entities.Category;

import java.util.List;

public interface CategoryService {

    CategoryDto insert(CategoryDto categoryDto);

    CustomPageResponse<CategoryDto> getAll(int pageNumber, int pageSize,String sortBy);

    CategoryDto get(String categoryId);

    void delete(String categoryId);

    void addCourseToCategory(String categoryId,String courseId);

    CategoryDto update(String categoryId,CategoryDto categoryDto);

    List<CourseDto> getCoursesofCategory(String categoryId);


}
