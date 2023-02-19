package de.neuefische.backend.shape;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shape {
    @Id
    private String id;
    private String type;
    private float[] point1;
    private float[] point2;
    private String imageId;
}
