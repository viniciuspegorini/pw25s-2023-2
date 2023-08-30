package br.edu.utfpr.pb.pw25s.server.validator;

import br.edu.utfpr.pb.pw25s.server.annotation.UniqueUsername;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        if (userRepository.findUserByUsername(username) == null){
            return true;
        }
        return false;
    }

}
