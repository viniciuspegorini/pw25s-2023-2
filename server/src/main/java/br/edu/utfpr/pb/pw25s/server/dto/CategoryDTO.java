package br.edu.utfpr.pb.pw25s.server.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
public class CategoryDTO {

    private Long id;

    @NotNull
    @NotEmpty
    @Size(min = 2, max = 50)
    private String name;
}