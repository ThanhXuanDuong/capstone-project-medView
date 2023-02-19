package de.neuefische.backend.shape;

import de.neuefische.backend.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shapes")
@RequiredArgsConstructor
public class ShapeController {
    private final ShapeService shapeService;

    @PostMapping
    public Shape add(@RequestBody Shape shape){
        return shapeService.add(shape);
    }

    @GetMapping("image/{id}")
    public List<Shape> getAllByImageId(@PathVariable String id){
        return shapeService.getAllByImageId(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) throws NotFoundException {
        shapeService.deleteById(id);
    }

    @DeleteMapping("image/{id}")
    public void deleteAllByImageId(@PathVariable String id){
        shapeService.deleteAllByImageId(id);
    }

}
