package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.service.ICategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("categories")
public class CategoryController {

    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> findAll() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody @Valid Category category) {
        categoryService.save(category);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand( category.getId() ).toUri();

        return ResponseEntity.created( location ).body( category );
    }


}
