package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.service.ICategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
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

    @GetMapping("{id}") //http://localhost:8025/categories/1
    public ResponseEntity<Category> findOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(categoryService.findOne(id));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }

    @GetMapping("page")
    // http://localhost:8025/categories/page?page=1&size=5&order=name&asc=true
    public ResponseEntity<Page<Category>> findAllPaged(
                                @RequestParam int page,
                                @RequestParam int size,
                                @RequestParam(required = false) String order,
                                @RequestParam(required = false) Boolean asc
                                ) {
        PageRequest pageRequest = PageRequest.of(page, size);
        if (order != null && asc != null) {
            pageRequest = PageRequest.of(page, size,
                    asc ? Sort.Direction.ASC : Sort.Direction.DESC, order);
        }
        return ResponseEntity.ok(categoryService.findAll(pageRequest));


    }



}
