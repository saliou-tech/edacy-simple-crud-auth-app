package com.edacy.edacyEvent.controller;


import com.edacy.edacyEvent.dtos.EventDto;
import com.edacy.edacyEvent.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/event")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

    private final EventService eventService;

/*
    private final StoreService storeService;
*/



    public EventController(EventService eventService) {
        this.eventService = eventService;
      // this.storeService=storeService;

    }
    @PostMapping("/save")
    public ResponseEntity<EventDto> saveEvent(@RequestBody EventDto eventDto) {
        if(eventDto!=null){
            return  ResponseEntity.status(HttpStatus.CREATED).body(eventService.addEvent(eventDto));
    }
        return null;

}

    @GetMapping("/all")
    public ResponseEntity<List<EventDto>> fetchEvent() {

        return  ResponseEntity.status(HttpStatus.OK).body(eventService.allEvents());

    }

    @PostMapping("/delete")
    public ResponseEntity<Object> deleteEvent(@RequestBody EventDto eventDto) {
        String result = eventService.deleteEvent(eventDto);
        if (result.equals("Event Supprimé avec succes")) {
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }


}
