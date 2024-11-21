package com.example.project_01.controller;

import com.example.project_01.dto.BookReviewDTO;
import com.example.project_01.dto.TaskDTO;
import com.example.project_01.entity.enums.Status;
import com.example.project_01.service.BookReviewService;
import com.example.project_01.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
@CrossOrigin
public class BookReviewController {
    private final BookReviewService bookReviewService;

    @Autowired
    public BookReviewController(BookReviewService bookReviewService) {
        this.bookReviewService = bookReviewService;
    }

    @GetMapping
    public List<BookReviewDTO> getAllTasks() {
        System.out.println("get function stared get");
        return bookReviewService.getFilterdReviews();
    }
    @GetMapping("/{id}")
    public List<BookReviewDTO> getFilterdTasks(@PathVariable int id) {
        System.out.println("id method "+id);
        List<BookReviewDTO> filterdReviewsByID = bookReviewService.getFilterdReviewsByID(id);
        return filterdReviewsByID;

    }


    @PostMapping
    public BookReviewDTO saveReview(@RequestBody BookReviewDTO bookReviewDTO){

        System.out.println("Inside post method"+bookReviewDTO);
       return bookReviewService.saveBook(bookReviewDTO);
    }
    @PutMapping("/{id}")
    public ResponseEntity<BookReviewDTO> updateTask(@PathVariable Long id, @RequestBody BookReviewDTO bookReviewDTO) {
        BookReviewDTO bookReviewDTO1 = bookReviewService.updateTask(id, bookReviewDTO);
        return ResponseEntity.ok(bookReviewDTO1);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        bookReviewService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
