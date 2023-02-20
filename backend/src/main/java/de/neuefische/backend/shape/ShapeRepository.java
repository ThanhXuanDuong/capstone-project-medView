package de.neuefische.backend.shape;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShapeRepository extends MongoRepository<Shape,String> {
    List<Shape> getAllByImageId(String imageId);
    void deleteAllByImageId(String imageId);
}
