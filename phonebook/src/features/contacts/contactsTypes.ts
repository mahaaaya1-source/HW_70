export interface Contact {
    name: string;
    phone: string;
    email: string;
    photo: string;
  }
  
  export interface ContactWithId extends Contact {
    id: string;
  }
  