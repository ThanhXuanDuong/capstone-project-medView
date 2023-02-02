package de.neuefische.backend.note;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Note {
    @Id
    private String id;
    private String imageId;
    private String text;
}
