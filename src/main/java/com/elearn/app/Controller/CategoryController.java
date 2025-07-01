package com.elearn.app.Controller;

import com.elearn.app.configuration.AppConstant;
import com.elearn.app.dtos.CategoryDto;
import com.elearn.app.dtos.CourseDto;
import com.elearn.app.dtos.CustomMessage;
import com.elearn.app.dtos.CustomPageResponse;
import com.elearn.app.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {


    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryDto> insert(@Valid @RequestBody CategoryDto categoryDto){
        CategoryDto categoryDto1=categoryService.insert(categoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryDto1);
    }

    @GetMapping
    public CustomPageResponse<CategoryDto> getAll(@RequestParam (value = "pageNumber",required = false,defaultValue = AppConstant.DEFAULT_PAGE_NUMBER) int pageNumber,
                                     @RequestParam (value = "pageSize",required = false,defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int pageSize,
                                                  @RequestParam (value = "sortBy",required = false,defaultValue = AppConstant.DEFAULT_SORT_BY) String sortBy){
        return categoryService.getAll(pageNumber,pageSize,sortBy);
    }

    @GetMapping("/{categoryId}")
    public CategoryDto get(@PathVariable String categoryId){
         CategoryDto categoryDto=categoryService.get(categoryId);
         return categoryDto;

    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<CustomMessage> delete(@PathVariable String categoryId){
        categoryService.delete(categoryId);
        CustomMessage customMessage=new CustomMessage();
        customMessage.setMessage("Category deleted!!");
        customMessage.setSuccess(true);
        return ResponseEntity.status(HttpStatus.OK).body(customMessage);
    }

    @PutMapping("/{categoryId}")
    public CategoryDto update(@PathVariable String categoryId, @RequestBody CategoryDto categoryDto){
        CategoryDto categoryDto1=categoryService.update(categoryId,categoryDto);
        return categoryDto1;
    }

    @PostMapping("/{categoryId}/courses/{courseId}")
    public ResponseEntity<CustomMessage> addCourseToCategory(@PathVariable String categoryId,@PathVariable String courseId){
        categoryService.addCourseToCategory(categoryId,courseId);
        CustomMessage customMessage=new CustomMessage();
        customMessage.setMessage("Course added Successfully");
        customMessage.setSuccess(true);
        return ResponseEntity.ok(customMessage);
    }

    @GetMapping("/{categoryId}/courses")
    public ResponseEntity<List<CourseDto>> getCoursesOfCategory(@PathVariable String categoryId){
        return ResponseEntity.ok(categoryService.getCoursesofCategory(categoryId));
    }
}
