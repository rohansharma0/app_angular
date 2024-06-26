export class User {
    if!:number;
    firstName!: string;
    lastName!: string;
    username!: string;
    password!: string;
    email!:string;
    createDt!:string;
    updatedDt!:string;
    role!:string;
    enabled!:boolean;
    credentialsNonExpired!:boolean;
    accountNonExpired!:boolean;
    authorities!:any;
    accountNonLocked!:boolean;
}
