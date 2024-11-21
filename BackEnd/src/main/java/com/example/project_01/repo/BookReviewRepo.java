package com.example.project_01.repo;

import com.example.project_01.entity.BookReview;
import com.example.project_01.entity.Task;
import com.example.project_01.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookReviewRepo extends JpaRepository<BookReview, Long> {
    List<BookReview> findAllByUser(User user);
}
