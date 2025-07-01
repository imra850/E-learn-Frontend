package com.elearn.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomPageResponse<T> {
    private int pageSize;
    private int pageNumber;

    private boolean isLast;
    private long totalElements;
    private int totalPages;

    private List<T> content;
}
