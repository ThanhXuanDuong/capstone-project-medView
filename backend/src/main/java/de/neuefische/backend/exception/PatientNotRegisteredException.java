package de.neuefische.backend.exception;

public class PatientNotRegisteredException extends CustomException{
    public PatientNotRegisteredException() {
        super("Patient not registered");
    }
}
