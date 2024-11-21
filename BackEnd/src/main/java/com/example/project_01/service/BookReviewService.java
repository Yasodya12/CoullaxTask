package com.example.project_01.service;

import com.example.project_01.dto.BookReviewDTO;

import java.util.List;

public interface BookReviewService {
    List<BookReviewDTO> getFilterdReviews();
    BookReviewDTO saveBook(BookReviewDTO bookReviewDTO);
    void deleteTask(Long id);
    BookReviewDTO updateTask(Long id, BookReviewDTO bookReviewDTO);

    List<BookReviewDTO> getFilterdReviewsByID(int id);
}
