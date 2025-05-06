package com.edacy.edacyEvent.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "EDACITY_EVENTS")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NOM_EVENEMENT", nullable = false, unique = true)
    private String nom;

    @Lob
    @Column(name = "NOM_DESCRIPTION")
    private String description;
    @Lob
    @Column(name = "LIEU")
    private String lieu;

    @Column(name = "NU_PLACE")

    private Integer nombrePlace;


}
