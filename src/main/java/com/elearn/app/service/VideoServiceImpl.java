package com.elearn.app.service;

import com.elearn.app.dtos.CustomPageResponse;
import com.elearn.app.dtos.VideoDto;
import com.elearn.app.entities.Video;
import com.elearn.app.exception.ResourceNotFoundException;
import com.elearn.app.repositories.VideoRepo;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VideoServiceImpl implements VideoService{

    private VideoRepo videoRepo;
    private ModelMapper modelMapper;

    public VideoServiceImpl(VideoRepo videoRepo, ModelMapper modelMapper) {
        this.videoRepo = videoRepo;
        this.modelMapper = modelMapper;
    }


    @Override
    public VideoDto createVideo(VideoDto videoDto) {
        String id= UUID.randomUUID().toString();
        videoDto.setId(id);
        Video video=videoRepo.save(this.dtoToEntity(videoDto));
        return this.entityToDto(video);
    }

    @Override
    public VideoDto updateVideo(String videoId, VideoDto videoDto) {
        Video video=videoRepo.findById(videoId).orElseThrow(()->new ResourceNotFoundException("Video not found"));
        dtoToEntity(videoDto);
        Video Saved=videoRepo.save(video);
        return entityToDto(video);
    }

    @Override
    public void deleteVideo(String videoId) {
        Video video=videoRepo.findById(videoId).orElseThrow(()->new ResourceNotFoundException("Video not found"));
        videoRepo.delete(video);

    }

    @Override
    public VideoDto getSingle(String videoId) {
        Video video=videoRepo.findById(videoId).orElseThrow(()->new ResourceNotFoundException("video not found"));

        return entityToDto(video);
    }

    @Override
    public CustomPageResponse<VideoDto> getAll(int pageNumber,int pageSize,String sortBy) {
        Sort sort=Sort.by(sortBy).ascending();
        PageRequest pageRequest=PageRequest.of(pageNumber,pageSize);
        Page<Video> videoDtoPage=videoRepo.findAll(pageRequest);
        List<Video> all=videoDtoPage.getContent();
        List<VideoDto> getAll=all.stream().map(video -> entityToDto(video)).toList();
        CustomPageResponse<VideoDto> customPageResponse=new CustomPageResponse<>();
        customPageResponse.setContent(getAll);
        customPageResponse.setLast(videoDtoPage.isLast());
        customPageResponse.setTotalElements(videoDtoPage.getTotalElements());
        customPageResponse.setPageNumber(pageNumber);
        customPageResponse.setTotalPages(videoDtoPage.getTotalPages());
        customPageResponse.setPageSize(pageSize);
        return customPageResponse;
    }

    @Override
    public List<VideoDto> search(String keyword) {
        List<Video> search=videoRepo.findByTitleContainingIgnoreCaseOrDescContainingIgnoreCase(keyword,keyword);
        return search.stream().map(video -> entityToDto(video)).toList();
    }

    public VideoDto entityToDto(Video video){
        VideoDto videoDto=modelMapper.map(video, VideoDto.class);
        return videoDto;
    }

    public Video dtoToEntity(VideoDto videoDto){
        Video video=modelMapper.map(videoDto,Video.class);
        return video;
    }
}
