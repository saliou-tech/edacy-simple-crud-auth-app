package com.edacy.edacyEvent.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoginResponse {
    private long id;
     private String fullName;
     private String email;
     private  String username;
    private  String telephone;
    private  String adresse;


    private String token;
    private String profile;
    private String refreshToken;
    private boolean needsPasswordChange;


    private long expiresIn;



}