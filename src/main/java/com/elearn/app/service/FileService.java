package com.elearn.app.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    String saveFile(MultipartFile file,String outputPath,String fileName) throws IOException;
}
