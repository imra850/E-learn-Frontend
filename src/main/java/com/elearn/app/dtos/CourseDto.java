package com.elearn.app.dtos;

import com.elearn.app.entities.Category;
import com.elearn.app.entities.Video;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto {

    private String id;

    private String title;

    private String shortDesc;

    @Column(length = 2000)
    private String longDesc;

    private double price;

    private boolean live;

    private double discount;

    private Date createdDate;

    private String banner;

    private List<VideoDto> videos=new ArrayList<>();

    private List<CategoryDto> categoryList;

    public String getBannerUrl(){
        return "http://localhost:8081/api/v1/courses/"+id+"/banner";  //imran
    }
}
