package com.edacy.edacyEvent.repository;


import com.edacy.edacyEvent.entity.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
    Optional<Event> findByNom(String name);
    Optional<Event> findById(Long id);

}
