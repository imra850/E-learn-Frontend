package com.elearn.app.Controller;

import com.elearn.app.configuration.AppConstant;
import com.elearn.app.dtos.*;
import com.elearn.app.service.CourseService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

    private CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<CourseDto> create(@RequestBody CourseDto courseDto){
        CourseDto courseDto1=courseService.create(courseDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(courseDto1);
    }

    @GetMapping("/{courseId}")
    public CourseDto getSingle(@PathVariable String courseId){
        return courseService.getSingle(courseId);
    }

    @GetMapping
    public CustomPageResponse<CourseDto> getAll(@RequestParam (value = "pageNumber",required = false,defaultValue = AppConstant.DEFAULT_PAGE_NUMBER)int pageNumber,
                                                @RequestParam (value = "pageSize", required = false, defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int pageSize,
                                                @RequestParam (value = "sortBy", required = false, defaultValue = AppConstant.DEFAULT_SORT_BY) String sortBy){

        return courseService.getAll(pageNumber,pageSize,sortBy);
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<CustomMessage> delete(@PathVariable String courseId){
        courseService.delete(courseId);
        CustomMessage customMessage=new CustomMessage();
        customMessage.setMessage("Course deleted successfully");
        customMessage.setSuccess(true);
        return ResponseEntity.status(HttpStatus.OK).body(customMessage);
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<CourseDto> update(@PathVariable String courseId,@RequestBody CourseDto courseDto){
        return ResponseEntity.ok(courseService.update(courseDto,courseId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<CourseDto>> search(@RequestParam String keyword){
        return ResponseEntity.ok(courseService.search(keyword));
    }

    @PostMapping("/{courseId}/banner")
    public ResponseEntity<?> saveBanner(@PathVariable String courseId, @RequestParam("banner")MultipartFile banner) throws IOException {
        String contentType=banner.getContentType();
        if(contentType==null){
            contentType="image/png";
        } else if(contentType.equals("image/png") || contentType.equals("image/jpg")){

        } else {
            CustomMessage customMessage=new CustomMessage();
            customMessage.setMessage("invalid file");
            customMessage.setSuccess(false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(customMessage);
        }
        CourseDto courseDto=courseService.saveBanner(banner,courseId);
        return ResponseEntity.ok(courseDto);
    }

    @GetMapping("/{courseId}/banner")
    public ResponseEntity<Resource> serverBanner(@PathVariable String courseId){
        ResourceContentType resourceContentType=courseService.getCourseBannerById(courseId);

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(resourceContentType.getContentType())).body(resourceContentType.getResource());
    }

    @PostMapping("/{courseId}/video/{videoId}")
    public ResponseEntity<CustomMessage> addVideoToCourse(@PathVariable String courseId,@PathVariable String videoId){
        courseService.addVideoToCourse(courseId,videoId);
        CustomMessage customMessage=new CustomMessage();
        customMessage.setMessage("video added successfully");
        customMessage.setSuccess(true);

        return ResponseEntity.ok(customMessage);
    }
}
