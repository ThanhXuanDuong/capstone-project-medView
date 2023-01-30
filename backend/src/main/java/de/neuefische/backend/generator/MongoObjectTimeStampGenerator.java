package de.neuefische.backend.generator;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class MongoObjectTimeStampGenerator implements TimeStampGenerator {
    @Override
    public LocalDateTime generateTimeStamp() {
        return LocalDateTime.now(ZoneId.of("Europe/Berlin"));
    }
}
