package com.example.project_01.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookReviewDTO {

    private Long id;
    private String title;
    private String author;
    private short rating;
    private String review;
    private Date date;
    private long userId;
}
