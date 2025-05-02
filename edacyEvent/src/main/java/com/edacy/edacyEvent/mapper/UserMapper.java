package com.edacy.edacyEvent.mapper;


import com.edacy.edacyEvent.dtos.UserDto;
import com.edacy.edacyEvent.entity.User;

public class UserMapper {

    public static UserDto entityToDto(User user) {
        if (user == null)
            return null;
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .adresse(user.getAdresse())
                .telephone(user.getTelephone())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .profile(user.getProfile())
               // .fk_store(StoreMapper.entityToDto(user.getFk_store()))
                .build();
    }

    public static User dtoToEntity(UserDto userDto) {
        if (userDto == null)
            return null;
        return User.builder()
                .id((int) userDto.getId())
                // .username(userDto.getUsername())
                .email(userDto.getEmail())
                .fullName(userDto.getFullName())
                .profile(userDto.getProfile())
                .adresse(userDto.getAdresse())
                .telephone(userDto.getTelephone())
                //.fk_store(StoreMapper.dtoToEntity(userDto.getFk_store()))
                .build();
    }

}