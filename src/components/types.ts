

export type CarResponse = {
    brand: string;
    model: string;
    color: string;
    registrationNumber: string;
    modelYear: number;
    price: number;
    _links: {
        self: {href: string;},
        car: {href: string;},
        owner: {href: string;}
    }
};

//create a type for the car object that doesn’t contain links, because the user doesn’t enter links in the form
export type Car = {
    brand: string;
    model: string;
    color: string;
    registrationNumber: string;
    modelYear: number;
    price: number;
}

export type CarEntry = {
    car: Car;
    url: string;
}


