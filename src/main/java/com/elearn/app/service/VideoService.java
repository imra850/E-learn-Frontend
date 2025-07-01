package com.elearn.app.service;

import com.elearn.app.dtos.CustomPageResponse;
import com.elearn.app.dtos.VideoDto;

import java.util.List;

public interface VideoService {

     VideoDto createVideo(VideoDto videoDto);

     VideoDto updateVideo(String videoId,VideoDto videoDto);

     void deleteVideo(String videoId);

     VideoDto getSingle(String videoId);

     CustomPageResponse<VideoDto> getAll(int pageNumber,int pageSize,String sortBy);

     List<VideoDto> search(String title);
}
