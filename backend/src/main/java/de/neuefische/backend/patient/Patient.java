package de.neuefische.backend.patient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
    private String id;
    private String lastname;
    private String firstname;
    private Gender gender;
    /*
    private LocalDate birthday;
    private String address;
    private String telephone;
    private List<String> imageIds;
    private LocalDateTime timeStamp;
     */
}
