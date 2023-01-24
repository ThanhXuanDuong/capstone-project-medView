package de.neuefische.backend.patient;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;

    @PostMapping
    public Patient create(@RequestBody Patient patient){
        return patientService.create(patient);
    }

}
