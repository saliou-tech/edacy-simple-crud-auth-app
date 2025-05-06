package com.edacy.edacyEvent.dtos;



import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class EventDto {

    private Long id;

    private String nom;

    private String description;
    private String lieu;
    private Integer nombrePlace;


}
