package com.edacy.edacyEvent.dtos;

import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDto {
    private Integer id;
    private String fullName;
    private String username;

    private String telephone;
    private String adresse;
    private String email;
    private Date createdAt;
    private Date updatedAt;
    private String profile;
    private String token;
    private String refreshToken;
    private boolean needsPasswordChange;



}
