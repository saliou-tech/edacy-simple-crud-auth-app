package com.edacy.edacyEvent.service;


import com.edacy.edacyEvent.dtos.EventDto;
import com.edacy.edacyEvent.entity.Event;
import com.edacy.edacyEvent.mapper.EventMapper;
import com.edacy.edacyEvent.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<EventDto> allEvents() {
        List<EventDto> Events = new ArrayList<>();
        eventRepository.findAll().forEach(Event -> {
            EventDto dto = EventMapper.entityToDto(Event);
            Events.add(dto);
        });

        return Events;
    }

    public EventDto addEvent(EventDto cdto){
        //Modification
        if(cdto.getId()!=null){
            Optional<Event> event=eventRepository.findById(cdto.getId());
            if(event!=null){
                event.get().setDescription(cdto.getDescription());
                event.get().setDescription(cdto.getDescription());
                event.get().setNom(cdto.getNom());
                event.get().setLieu(cdto.getLieu());
                event.get().setNombrePlace(cdto.getNombrePlace());


               return  EventMapper.entityToDto(eventRepository.save( event.get()));
            }
        }else{
            Optional<Event> event = eventRepository.findByNom(cdto.getNom());
            if(!event.isPresent()){
                Event  Eventtosaved=EventMapper.DtoToEntity(cdto);
                Event cdtoSaved = eventRepository.save(Eventtosaved);
                return EventMapper.entityToDto(cdtoSaved);
            }
        }

 return null;
    }

    public String deleteEvent(EventDto EventDto) {
        if (EventDto != null) {
            Event EventEntity = EventMapper.DtoToEntity(EventDto);
            Optional<Event> Event = eventRepository.findById(EventEntity.getId());

            if (Event.isPresent()) {
                eventRepository.delete(Event.get());
                return "Event Supprimé avec succes";
            } else {
                return "Event not found";
            }
        }
        return "Invalid request";
    }





}
