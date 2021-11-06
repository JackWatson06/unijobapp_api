/**
 * Original Author: Jack Watson
 * Created Date: 11/4/2021
 * Purpose: The payment plan represents the plan that we have to pay out affiliates as well as our plan to pay employers.
 */

export default class PaymentPlan
{
    static readonly AMOUNT: number = 100;
    static readonly CURRENCY: string = "USD";

    // This will dcrease per the affilaite that we have.
    // First index represents the first affiliate. Second one the second nested affilaite.
    // Could have done this with percents but decided not to.
    static readonly AFFILIATE_PAYOUTS = [ 15.91, 6.91 ];
    static readonly CHARITY_PAYOUTS =   [     1, 0.4];
}