
/**
 * Original Author: Jack Watson
 * Created Date: 10/21/2021
 * Purpose: We need to be able to create new employees. We just need to make sure there email is verified before we put
 * them into the mix of potential candidates. We also may want to do stuff here if we start having problems with spam. 
 * Inside the controller we can split off the 'data' into specific value objects that would allow us to do reasoning validation.
 * "Reasoning Validation" is a word I came up for in order to validate the input meets expected values. Reduces spam.
 */

import { NewEmployer } from "../validators/NewEmployerValidator";
import { email } from "services/Notify";

import Email from "./Email";

export default class Employer
{
    // The new employee data.
    private data: NewEmployer;

    // Email verification data.
    private email: Email;

    // Email verification data.
    private verified_at: number;

    constructor(data: NewEmployer, email: Email)
    {
        this.data  = data;
        this.email = email;
    }

    /**
     * Verify the affiliate is who they say they are.
     * true = Was able to send out the email
     * false = Was not able to send out the email
     */
    public async verify() : Promise<boolean>
    {

        if( Date.now() < this.email.getExpiredDate() )
        {
            await email(this.email.getEmail(), "Please Verify Your Account!", "verification", {
                name: this.data.fname + " " + this.data.lname,
                token: this.email.getToken()
            });

            return true;
        }

        return false;
    }

    public authorize()
    {
        if( Date.now() < this.email.getExpiredDate() )
        {   
            this.verified_at = Date.now();
            return true;
        }

        return false;
    }

    /**
     * Return the date that we were verified at.
     */
    public getVerifiedAt() : number
    {
        return this.verified_at;
    }

    /**
     * Get the employees email.
     */
    public getEmail() : Email
    {
        return this.email;
    }

    /**
     * Get the employers data.
     */
    public getData(): NewEmployer
    {
        return this.data;
    }
}
