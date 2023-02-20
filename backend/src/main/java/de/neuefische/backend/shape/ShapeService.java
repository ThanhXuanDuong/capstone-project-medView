package de.neuefische.backend.shape;

import de.neuefische.backend.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShapeService {
    private final ShapeRepository shapeRepository;

    public Shape add(Shape shape) {
        return shapeRepository.save(shape);
    }

    public List<Shape> getAllByImageId(String id) {
        return shapeRepository.getAllByImageId(id);
    }

    public void deleteById(String id) throws NotFoundException {
        if (shapeRepository.existsById(id)){
            shapeRepository.deleteById(id);
        }else{
            throw new NotFoundException();
        }
    }

    public void deleteAllByImageId(String id) {
        shapeRepository.deleteAllByImageId(id);
    }
}
