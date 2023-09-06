package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.model.Product;
import br.edu.utfpr.pb.pw25s.server.service.IProductService;
import jakarta.validation.Valid;
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
@RequestMapping("products")
public class ProductController {

    private final IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody @Valid Product product) {
        productService.save(product);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand( product.getId() ).toUri();

        return ResponseEntity.created( location ).body( product );
    }

    @GetMapping("{id}") //http://localhost:8025/products/1
    public ResponseEntity<Product> findOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(productService.findOne(id));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }

    @GetMapping("page")
    // http://localhost:8025/products/page?page=0&size=5&order=name&asc=true
    public ResponseEntity<Page<Product>> findAllPaged(
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
        return ResponseEntity.ok(productService.findAll(pageRequest));
    }



}
