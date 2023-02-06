package de.neuefische.backend.patient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
    @Id
    private String id;
    @NotBlank
    private String lastname;
    @NotBlank
    private String firstname;
    private Gender gender;
    @NotBlank
    private String birthday;
    private String address;
    private String telephone;
    @NotEmpty
    private List<@NotNull @Size(min = 1) String> imageIds;

    private LocalDateTime timeStamp;

    private String createdBy;

    public Patient(String id,
                   String lastname,
                   String firstname,
                   Gender gender,
                   String birthday,
                   String address,
                   String telephone,
                   List<String> imageIds
    ) {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.gender = gender;
        this.birthday = birthday;
        this.address = address;
        this.telephone = telephone;
        this.imageIds = imageIds;
    }

}
