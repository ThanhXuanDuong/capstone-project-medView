import usePatient from "../hooks/usePatient";
import ImageCard from "../components/ImageCard";

export default function DetailPage(){

    const patient = usePatient();

    return(
        <>
            <h2>
                {patient.lastname}
            </h2>
            <h3>
                {patient.id}
            </h3>
            {patient.imageIds.map(id => <ImageCard id={id}/>)}
        </>
    );
}