package com.edacy.edacyEvent.mapper;


import com.edacy.edacyEvent.dtos.EventDto;
import com.edacy.edacyEvent.entity.Event;

public class EventMapper {

    public static EventDto entityToDto(Event event){
        if(event==null)
            return null;
        EventDto cdto= new EventDto();
        cdto.setId(event.getId());
        cdto.setDate(event.getDate());
        cdto.setDescription(event.getDescription());
        cdto.setNom(event.getNom());
        cdto.setLieu(event.getLieu());
        cdto.setNombrePlace(event.getNombrePlace());

        return  cdto;
    }

    public static Event DtoToEntity(EventDto cdto){
        if(cdto==null)
            return null;
        Event event=new Event();
        event.setId(cdto.getId());
        event.setDate(cdto.getDate());
        event.setDescription(cdto.getDescription());
        event.setNom(cdto.getNom());
        event.setLieu(cdto.getLieu());
        event.setNombrePlace(cdto.getNombrePlace());
        return  event;
    }

}
