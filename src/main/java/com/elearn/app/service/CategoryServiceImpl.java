package com.elearn.app.service;

import com.elearn.app.dtos.CategoryDto;
import com.elearn.app.dtos.CourseDto;
import com.elearn.app.dtos.CustomPageResponse;
import com.elearn.app.entities.Category;
import com.elearn.app.entities.Course;
import com.elearn.app.exception.ResourceNotFoundException;
import com.elearn.app.repositories.CategoryRepo;
import com.elearn.app.repositories.CourseRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService{

    private ModelMapper modelMapper;

    private CategoryRepo repo;

    private CourseRepo courseRepo;
    public CategoryServiceImpl(ModelMapper modelMapper, CategoryRepo repo,CourseRepo courseRepo) {
        this.modelMapper = modelMapper;
        this.repo = repo;
        this.courseRepo=courseRepo;
    }

    @Override
    public CategoryDto insert(CategoryDto categoryDto) {

        String id= UUID.randomUUID().toString();
        categoryDto.setId(id);
        categoryDto.setAddedDate(new Date());

        Category save=repo.save(this.dtoToEntity(categoryDto));
        return this.entityToDto(save);
    }

    @Override
    public CustomPageResponse<CategoryDto> getAll(int pageNumber,int pageSize,String sortBy) {

        Sort sort=Sort.by(sortBy).ascending();
       PageRequest pageRequest= PageRequest.of(pageNumber,pageSize);
        Page<Category> categoryPage=repo.findAll(pageRequest);
        List<Category> all=categoryPage.getContent();
        List<CategoryDto> categoryDtoList=all.stream().map(category -> entityToDto(category)).toList();

        CustomPageResponse<CategoryDto> customPageResponse=new CustomPageResponse<CategoryDto>();
        customPageResponse.setContent(categoryDtoList);
        customPageResponse.setLast(categoryPage.isLast());
        customPageResponse.setTotalElements(categoryPage.getTotalElements());
        customPageResponse.setTotalPages(categoryPage.getTotalPages());
        customPageResponse.setPageNumber(pageNumber);
        customPageResponse.setPageSize(pageSize);
        return customPageResponse;
    }

    @Override
    public CategoryDto get(String categoryId) {
        Category category=repo.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("category not found"));
        CategoryDto categoryDto=entityToDto(category);
        return categoryDto;
    }

    @Override
    public void delete(String categoryId) {
        Category category=repo.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category not found"));
        repo.delete(category);
    }

    @Override
    public CategoryDto update(String categoryId, CategoryDto categoryDto) {
        Category category=repo.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category not found"));
        category.setTitle(categoryDto.getTitle());
        category.setDesc(categoryDto.getDesc());
        repo.save(category);
        return entityToDto(category);
    }

    @Override
    @Transactional
    public void addCourseToCategory(String categoryId, String courseId) {
        Category category=repo.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("category not found"));

        Course course=courseRepo.findById(courseId).orElseThrow(()->new ResourceNotFoundException("Course not found"));

        category.addCourse(course);
        repo.save(category);

    }

    @Override
    @Transactional
    public List<CourseDto> getCoursesofCategory(String categoryId) {
        Category category=repo.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category not Found"));
        List<Course> courses=category.getCourses();

        return courses.stream().map(course -> modelMapper.map(course, CourseDto.class)).toList();
    }

    public CategoryDto entityToDto(Category category){
        CategoryDto categoryDto=modelMapper.map(category, CategoryDto.class);
        return categoryDto;
    }

    public Category dtoToEntity(CategoryDto categoryDto){
        Category category=modelMapper.map(categoryDto, Category.class);
        return category;
    }
}
