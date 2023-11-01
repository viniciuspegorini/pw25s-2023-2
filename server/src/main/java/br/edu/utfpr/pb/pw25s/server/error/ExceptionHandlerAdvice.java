package br.edu.utfpr.pb.pw25s.server.error;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

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

    @ExceptionHandler({Exception.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handlerValidationException(
            Exception exception,
            HttpServletRequest request
    ) {

        return new ApiError(400, "Ocorreu um erro!",
                request.getServletPath(),
                null);
    }

}
