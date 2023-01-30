package de.neuefische.backend.patient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
    @Id
    private String id;
    private String lastname;
    private String firstname;
    private Gender gender;
    private String birthday;
    private String address;
    private String telephone;
    private List<String> imageIds;

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
