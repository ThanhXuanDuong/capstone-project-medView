package de.neuefische.backend.note;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends MongoRepository<Note,String> {
    List<Note> findAllByImageId(String imageId);
    void deleteAllByImageId(String imageId);
}
