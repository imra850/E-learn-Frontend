package com.elearn.app.Controller;

import com.elearn.app.configuration.AppConstant;
import com.elearn.app.dtos.CustomMessage;
import com.elearn.app.dtos.CustomPageResponse;
import com.elearn.app.dtos.VideoDto;
import com.elearn.app.entities.Video;
import com.elearn.app.service.VideoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/videos")
public class VideoController {

    private VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping
    public ResponseEntity<VideoDto> create(@RequestBody VideoDto videoDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(videoService.createVideo(videoDto));
    }

    @GetMapping("/{videoId}")
    public ResponseEntity<VideoDto> getSingle(@PathVariable String videoId){
        return ResponseEntity.ok(videoService.getSingle(videoId));
    }

    @DeleteMapping("/{videoId}")
    public ResponseEntity<CustomMessage> delete(@PathVariable String videoId){
        videoService.deleteVideo(videoId);
        CustomMessage customMessage=new CustomMessage();
        customMessage.setMessage("Video deleted Successfully");
        customMessage.setSuccess(true);
        return ResponseEntity.ok(customMessage);
    }


    @PutMapping("/{videoId}")
    public ResponseEntity<VideoDto> update(@PathVariable String videoId,@RequestBody VideoDto videoDto){
        return ResponseEntity.ok(videoService.updateVideo(videoId,videoDto));
    }

    @GetMapping
    public CustomPageResponse<VideoDto> getAll(@RequestParam(value = "pageNumber", required = false, defaultValue = AppConstant.DEFAULT_PAGE_NUMBER) int pageNumber,
                                               @RequestParam(value = "pageSize", required = false, defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int pageSize,
                                               @RequestParam(value = "sortBy", required = false, defaultValue = AppConstant.DEFAULT_SORT_BY) String sortBy){
        return videoService.getAll(pageNumber,pageSize,sortBy);
    }




}
