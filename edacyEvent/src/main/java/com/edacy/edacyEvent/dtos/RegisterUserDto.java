package com.edacy.edacyEvent.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class RegisterUserDto {
    private long id;
    private String username;
    private String email;

    private String password;

    private String fullName;

    private String adresse;

    private String telephone;

    private String profile;


}