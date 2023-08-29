package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.error.ApiError;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.service.UserService;
import br.edu.utfpr.pb.pw25s.server.shared.GenericResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        GenericResponse genericResponse = new GenericResponse();
        genericResponse.setMessage("User saved");
        return genericResponse;
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handlerValidationException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request
    ) {
        BindingResult result = exception.getBindingResult();
        Map<String, String> validationErrors = new HashMap<>();
        for (FieldError error: result.getFieldErrors()) {
            validationErrors.put(error.getField(), error.getDefaultMessage());
        }
        return new ApiError(400, "Validation error",
                request.getServletPath(),
                validationErrors);
    }
}
