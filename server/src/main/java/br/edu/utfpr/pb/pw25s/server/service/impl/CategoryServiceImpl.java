package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.repository.CategoryRepository;
import br.edu.utfpr.pb.pw25s.server.service.ICategoryService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Page<Category> findAll(Pageable pageable) {
        return categoryRepository.findAll(pageable);
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category findOne(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public boolean exists(Long id) {
        return categoryRepository.existsById(id);
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
