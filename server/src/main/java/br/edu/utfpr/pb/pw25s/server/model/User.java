package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.annotation.UniqueUsername;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "tb_user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "{br.edu.utfpr.pb.pw25s.server.model.User.NotNull.message}")
    @Size(min = 4, max = 255, message = "{br.edu.utfpr.pb.pw25s.server.model.User.Size.message}")
    @UniqueUsername
    private String username;

    @NotNull
    @Size(min = 4, max = 255)
    private String displayName;

    @NotNull
    @Size(min = 6)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
    message = "{br.edu.utfpr.pb.pw25s.server.model.User.Password.Pattern.message}")
    private String password;
}
