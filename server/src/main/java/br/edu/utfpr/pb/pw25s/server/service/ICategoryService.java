package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICategoryService {

    List<Category> findAll();

    Page<Category> findAll(Pageable pageable);

    Category save(Category category);

    Category findOne(Long id);

    boolean exists(Long id);

    void delete(Long id);
}
