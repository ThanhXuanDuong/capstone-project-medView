package de.neuefische.backend.patient;

import de.neuefische.backend.exception.PatientNotRegisteredException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;
    @PostMapping
    public Patient add(@RequestBody Patient patient){
        return patientService.add(patient);
    }

    @GetMapping
    public List<Patient> getAll(){
        return patientService.getAll();
    }

    @GetMapping("/{id}")
    public Patient getById(@PathVariable String id) throws PatientNotRegisteredException {
        return patientService.getById(id);
    }

    @PutMapping("/{id}")
    public Patient updateById(@PathVariable String id, @RequestBody Patient patient) throws PatientNotRegisteredException {
        return patientService.updateById(id,patient);
    }

    @DeleteMapping("/{id}")
    public  void deleteById(@PathVariable String id) throws PatientNotRegisteredException {
        patientService.deleteById(id);
    }
}
