package de.neuefische.backend.note;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Note {
    @Id
    private String id;
    @NotBlank
    private String imageId;
    @NotBlank
    private String text;
}
