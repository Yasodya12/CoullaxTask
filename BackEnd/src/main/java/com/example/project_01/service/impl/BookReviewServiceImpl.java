package com.example.project_01.service.impl;

import com.example.project_01.dto.BookReviewDTO;
import com.example.project_01.dto.TaskDTO;
import com.example.project_01.entity.BookReview;
import com.example.project_01.entity.Task;
import com.example.project_01.entity.User;
import com.example.project_01.entity.enums.Status;
import com.example.project_01.repo.BookReviewRepo;
import com.example.project_01.repo.TaskRepo;
import com.example.project_01.repo.UserRepo;
import com.example.project_01.service.BookReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookReviewServiceImpl implements BookReviewService {
    private final BookReviewRepo bookReviewRepo;
    private final UserRepo userRepo;

    @Autowired
    public BookReviewServiceImpl(BookReviewRepo bookReviewRepo, UserRepo userRepo) {
        this.bookReviewRepo = bookReviewRepo;
        this.userRepo=userRepo;
    }

    @Override
    public List<BookReviewDTO> getFilterdReviews() {
        List<BookReview> all = bookReviewRepo.findAll();
        return convertEntityListToDtoList(all);

    }

    public List<BookReviewDTO> getFilterdReviewsByID(int id) {
        User byId = userRepo.findById(id).get();
        List<BookReview> all = bookReviewRepo.findAllByUser(byId);
        return convertEntityListToDtoList(all);

    }

    public BookReviewDTO saveBook(BookReviewDTO bookReviewDTO){
        BookReview save = bookReviewRepo.save(convertToEntity(bookReviewDTO));
        return convertToDto(save);
    }

    public void deleteTask(Long id) {
        if (!bookReviewRepo.existsById(id)) {
            throw new IllegalArgumentException("Review not found");
        }
        bookReviewRepo.deleteById(id);
    }

    public BookReviewDTO updateTask(Long id, BookReviewDTO bookReviewDTO) {
        BookReview bookReview = bookReviewRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));

        bookReview.setTitle(bookReviewDTO.getTitle());
        bookReview.setAuthor(bookReview.getAuthor());
        bookReview.setReview(bookReview.getReview());
        bookReview.setRating(bookReview.getRating());

        return convertToDto(bookReviewRepo.save(bookReview));
    }

    public BookReviewDTO convertToDto(BookReview bookReview) {
        BookReviewDTO dto = new BookReviewDTO();
        dto.setId(bookReview.getId());
        dto.setTitle(bookReview.getTitle());
        dto.setAuthor(bookReview.getAuthor());
        dto.setRating(bookReview.getRating());
        dto.setReview(bookReview.getReview());
        dto.setDate(bookReview.getDate());
        dto.setUserId(bookReview.getUser().getId());
        return dto;
    }
    public BookReview convertToEntity(BookReviewDTO bookReviewDTO) {
        System.out.println("user id at to entity"+bookReviewDTO.getUserId());
        BookReview bookReview = new BookReview();
        bookReview.setId(bookReviewDTO.getId());
        bookReview.setTitle(bookReviewDTO.getTitle());
        bookReview.setAuthor(bookReviewDTO.getAuthor());
        bookReview.setRating(bookReviewDTO.getRating());
        bookReview.setReview(bookReviewDTO.getReview());
        bookReview.setDate(new Date());
        User byId = userRepo.findById((int) bookReviewDTO.getUserId()).get();
        bookReview.setUser(byId);
        return bookReview;
    }
    public List<BookReviewDTO> convertEntityListToDtoList(List<BookReview> bookReviews) {
        return bookReviews.stream()
                .map(bookReview -> {
                    BookReviewDTO dto = new BookReviewDTO();
                    dto.setId(bookReview.getId());
                    dto.setTitle(bookReview.getTitle());
                    dto.setAuthor(bookReview.getAuthor());
                    dto.setRating(bookReview.getRating());
                    dto.setReview(bookReview.getReview());
                    dto.setDate(bookReview.getDate());
                    return dto;
                })
                .collect(Collectors.toList());
    }


}
