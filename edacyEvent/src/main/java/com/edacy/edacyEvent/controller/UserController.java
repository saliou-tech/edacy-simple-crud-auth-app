package com.edacy.edacyEvent.controller;



import com.edacy.edacyEvent.dtos.UserDto;
import com.edacy.edacyEvent.entity.User;
import com.edacy.edacyEvent.mapper.UserMapper;
import com.edacy.edacyEvent.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/users")
@RestController
@CrossOrigin(origins = "http://localhost;4200")

public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();
      /*  if (currentUser.getFk_store() != null) {
            Hibernate.initialize(currentUser.getFk_store());
        }*/

        // Create a UserDTO
        UserMapper.entityToDto(currentUser);

        return ResponseEntity.ok(UserMapper.entityToDto(currentUser));
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<UserDto>> allUsers() {
        List <User> users = userService.allUsers();
        List <UserDto> usersDto = new ArrayList<>();
        users.forEach(user -> {
            UserDto dto = UserMapper.entityToDto(user);
            usersDto.add(dto);
        });
        return  ResponseEntity.status(HttpStatus.OK).body(usersDto);
    }


}