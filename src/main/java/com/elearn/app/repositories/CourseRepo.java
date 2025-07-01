package com.elearn.app.repositories;

import com.elearn.app.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepo extends JpaRepository<Course,String> {

    List<Course> findByTitleContainingIgnoreCaseOrShortDescContainingIgnoreCase(String keyword,String keyword1);

//    Optional<Course> findByTitle(String title);
//
//    List<Course> findByLive(String live);
//
//    List<Course> findByCategoryId(String id);
}
