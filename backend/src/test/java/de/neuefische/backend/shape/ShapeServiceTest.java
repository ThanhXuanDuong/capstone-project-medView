package de.neuefische.backend.shape;

import de.neuefische.backend.exception.NotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.mockito.Mockito.*;

class ShapeServiceTest {

    @Test
    void add_addToRepoAndReturnAddedShape() {
        Shape shape = new Shape(
                "testId",
                "circle",
                new float[]{0.5f, 0.5f},
                new float[]{0.55f, 0.55f},
                "testImageId");
        ShapeRepository shapeRepository = mock(ShapeRepository.class);
        when(shapeRepository.save(shape)).thenReturn(shape);

        ShapeService shapeService = new ShapeService(shapeRepository);
        Shape actual = shapeService.add(shape);
        Assertions.assertEquals(shape,actual);
        verify(shapeRepository).save(shape);
    }

    @Test
    void getAllByImageId_returnShapesByImageId() {
        List<Shape> shapes = List.of(
                new Shape("testId",
                    "circle",
                        new float[]{0.5f, 0.5f},
                        new float[]{0.55f, 0.55f},
                "testImageId"),
                new Shape("testId2",
                        "circle",
                        new float[]{0.5f, 0.5f},
                        new float[]{0.55f, 0.55f},
                        "testImageId")
                );
        ShapeRepository shapeRepository = mock(ShapeRepository.class);
        when(shapeRepository.getAllByImageId("testImageId")).thenReturn(shapes);

        ShapeService shapeService = new ShapeService(shapeRepository);
        List<Shape> actual = shapeService.getAllByImageId("testImageId");
        Assertions.assertEquals(shapes,actual);
        verify(shapeRepository).getAllByImageId("testImageId");
    }

    @Test
    void deleteById_whenShapeNotExists_thenThrowException(){
        ShapeRepository shapeRepository = mock(ShapeRepository.class);
        when(shapeRepository.existsById("non existing Id")).thenReturn(false);

        ShapeService shapeService = new ShapeService(shapeRepository);

        Assertions.assertThrows(NotFoundException.class,
                ()-> shapeService.deleteById("non existing Id"));
    }

    @Test
    void deleteById_whenShapeExists_thenDeleteShape() throws NotFoundException {
        ShapeRepository shapeRepository = mock(ShapeRepository.class);
        when(shapeRepository.existsById("existing Id")).thenReturn(true);

        ShapeService shapeService = new ShapeService(shapeRepository);
        shapeService.deleteById("existing Id");

        verify(shapeRepository).deleteById("existing Id");
    }

    @Test
    void deleteAllByImageId_deleteAllShapesWithImageIdInRepo() {
        ShapeRepository shapeRepository = mock(ShapeRepository.class);

        ShapeService shapeService = new ShapeService(shapeRepository);
        shapeService.deleteAllByImageId("testId");

        verify(shapeRepository).deleteAllByImageId("testId");
    }
}