type Patient={
    id?: string,
    firstname: string,
    lastname: string,
    gender: string,
    address: string,
    birthday: string,
    telephone: string,
    imageIds: string[],
    createdBy?: string,
    timeStamp:string
};

export default Patient;