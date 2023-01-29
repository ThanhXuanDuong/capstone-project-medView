package de.neuefische.backend.patient;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends MongoRepository<Patient,String> {
    List<Patient> findAllByCreatedBy(String createdBy);
}

