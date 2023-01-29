package de.neuefische.backend.patient;

import de.neuefische.backend.exception.PatientNotRegisteredException;
import de.neuefische.backend.generator.TimeStampGenerator;
import de.neuefische.backend.user.AppUser;
import de.neuefische.backend.user.AppUserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

class PatientServiceTest {

    private Patient createOnePatient(String testId){
        return  new Patient(
                testId,
                "Mustermann",
                "Max",
                Gender.MALE,
                "2000-10-20",
                "test address",
                "test email",
                List.of("1", "2"),
                LocalDateTime.of(2023, 1, 1, 0, 0),
                "user1"
        );
    }

    @Test
    void add_addPatientToRepoAndReturnPatient() {
        //given
        AppUser appUser =new AppUser("test-id","test-user","pw");
        Patient newPatient = new Patient(
                "test id",
                "Mustermann",
                "Max",
                Gender.MALE,
                "2000-10-20",
                "test address",
                "test email",
                List.of("1", "2"));

        PatientRepository patientRepository = mock(PatientRepository.class);
        when(patientRepository.save(newPatient))
                              .thenReturn(newPatient);

        TimeStampGenerator timeStampGenerator = mock(TimeStampGenerator.class);

        AppUserService appUserService = mock (AppUserService.class);
        when(appUserService.getAuthenticatedUser()).thenReturn(appUser);

        //when
        PatientService patientService = new PatientService(
                patientRepository,
                timeStampGenerator,
                appUserService
        );
        Patient actual = patientService.add(newPatient);

        // then
        Assertions.assertEquals(newPatient, actual);
        verify(patientRepository).save(newPatient);
    }

    @Test
    void getAll_whenAuthenticated_returnAllPatients(){
        //given
        AppUser appUser =new AppUser("test-id","test-user","pw");
        List<Patient> expected = List.of(
                createOnePatient("1"),
                createOnePatient("2")
        );

        PatientRepository patientRepository = mock(PatientRepository.class);
        when(patientRepository.findAllByCreatedBy(appUser.getUsername())).thenReturn(expected);

        TimeStampGenerator timeStampGenerator = mock(TimeStampGenerator.class);

        AppUserService appUserService = mock (AppUserService.class);
        when(appUserService.getAuthenticatedUser()).thenReturn(appUser);

        //when
        PatientService patientService = new PatientService(
                patientRepository,
                timeStampGenerator,
                appUserService
        );
        List<Patient> actual = patientService.getAll();

        // then
        Assertions.assertEquals(expected, actual);
        verify(patientRepository).findAllByCreatedBy(appUser.getUsername());
        verify(appUserService).getAuthenticatedUser();
    }

    @Test
    void getById_returnPatientCorrectly_whenPatientRegistered() throws Exception {
        //given
        Patient expected = createOnePatient("1");

        PatientRepository patientRepository = mock(PatientRepository.class);
        when(patientRepository.findById("1"))
                .thenReturn(Optional.of(expected));

        TimeStampGenerator timeStampGenerator = mock(TimeStampGenerator.class);
        AppUserService appUserService = mock (AppUserService.class);

        //when
        PatientService patientService = new PatientService(
                patientRepository,
                timeStampGenerator,
                appUserService
        );
        Patient actual = patientService.getById("1");

        // then
        Assertions.assertEquals(expected, actual);
        verify(patientRepository).findById("1");
    }

    @Test
    void getById_throwException_whenPatientNotRegistered(){
        //given
        PatientRepository patientRepository = mock(PatientRepository.class);
        when(patientRepository.findById("1"))
                .thenReturn(Optional.ofNullable(null));

        TimeStampGenerator timeStampGenerator = mock(TimeStampGenerator.class);
        AppUserService appUserService = mock (AppUserService.class);

        //when
        PatientService patientService = new PatientService(
                patientRepository,
                timeStampGenerator,
                appUserService
        );

        // then
        Assertions.assertThrows(PatientNotRegisteredException.class,
                () -> patientService.getById("1"));
    }
}