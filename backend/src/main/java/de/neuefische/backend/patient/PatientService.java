package de.neuefische.backend.patient;

import de.neuefische.backend.exception.PatientNotRegisteredException;
import de.neuefische.backend.generator.TimeStampGenerator;
import de.neuefische.backend.user.AppUser;
import de.neuefische.backend.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    private final TimeStampGenerator timeStampGenerator;
    private final AppUserService appUserService;
    public Patient add(Patient patient) {
        patient.setTimeStamp(timeStampGenerator.generateTimeStamp());
        patient.setCreatedBy(appUserService.getAuthenticatedUser().getUsername());
        return patientRepository.save(patient);
    }

    public List<Patient> getAll(){
        AppUser appUser =  appUserService.getAuthenticatedUser();
        return patientRepository.findAllByCreatedBy(appUser.getUsername());
    }

    public Patient getById(String id) throws PatientNotRegisteredException {
        return patientRepository
                .findById(id)
                .orElseThrow(PatientNotRegisteredException::new);
    }

    public void deleteById(String id) throws PatientNotRegisteredException {
        if (patientRepository.existsById(id)){
            patientRepository.deleteById(id);
        } else{
            throw new PatientNotRegisteredException();
        }

    }
}
