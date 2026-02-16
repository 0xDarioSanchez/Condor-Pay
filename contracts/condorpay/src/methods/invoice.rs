use crate::events::event;
use crate::methods::invoice;
use crate::methods::borrower::update_borrower;
use crate::storage::investor::{get_investor};
use crate::storage::borrower::{get_borrower};
use crate::storage::pool;
use crate::storage::{
    invoice::{Invoice, set_invoice, get_invoice},
    invoice_status::InvoiceStatus,
    storage::DataKey,
};
use crate::error::Error;
use soroban_sdk::{Address, Env, String, panic_with_error};
use stellar_access::access_control::get_admin;

/// Create a new invoice.
/// 
pub fn create_invoice(
    env: &Env,
    creator: Address,
    amount: i128,
    duration: u32,
    invoice_info: String,
    pool_id: u32,           //Pool from which the invoice will be funded
) -> Result<Invoice, Error> {
    // Require authentication from the invoice creator
    creator.require_auth();

    // Check if the borrower is registered as a borrower
    let borrower = match get_borrower(env, creator.clone()) {
        Ok(borrower) => borrower,
        Err(_) => return Err(Error::BorrowerNotFound),
    };

    // Check if the specified pool exists
    let pool = match pool::get_pool(env, pool_id) {
        Ok(pool) => pool,
        Err(_) => return Err(Error::PoolNotFound),
    };

    let current_id = env
        .storage()
        .instance()
        .get::<_, u32>(&DataKey::InvoiceCounter)
        .unwrap_or(0);
    let new_invoice_id = current_id + 1;
    env.storage()
        .instance()
        .set(&DataKey::InvoiceCounter, &new_invoice_id);

    let invoice = Invoice {
        invoice_id: new_invoice_id,
        creator: creator.clone(),
        initial_timestamp: env.ledger().timestamp(),
        approved_timestamp: 0,
        amount,
        duration,
        invoice_status: InvoiceStatus::CREATED,
        invoice_info,
    };

    set_invoice(env, new_invoice_id, invoice.clone());

    // Emit event for invoice creation
    event::NewInvoice {
        invoice_id: new_invoice_id,
        creator: creator.clone(),
    }
    .publish(&env);

    Ok(invoice)
}


pub fn validate_invoice(
    env: &Env,
    invoice_id: u32,
    validate: bool
) -> InvoiceStatus {
    // Get Admin
    let admin = get_admin(env).unwrap();
    // Only Admin can validate the invoice
    admin.require_auth();

    // Get the invoice if exists
    let mut invoice = match get_invoice(env, invoice_id) {
        Ok(invoice) => invoice,
        Err(_) => panic_with_error!(env, Error::InvoiceNotFound),
    };

    // Check if the invoice is in CREATED status
    if invoice.invoice_status != InvoiceStatus::CREATED {
        panic_with_error!(env, Error::InvalidInvoiceStatus);
    }

    if validate {
        invoice.invoice_status = InvoiceStatus::APPROVED;
        let usdc_amount = invoice.amount;

        // The USDC amount is sended to the borrower at the same moment of the validation
        fund_invoice(env, usdc_amount, invoice.creator.clone());

        // Increment the borrower's debt amount        
        let mut borrower = match get_borrower(env, invoice.creator.clone()) {
        Ok(borrower) => borrower,
        Err(_) => panic_with_error!(env, Error::BorrowerNotFound),
        };
        borrower.debt_amount += usdc_amount;
        update_borrower(env, invoice.creator.clone(), borrower);    

    } else {
        invoice.invoice_status = InvoiceStatus::REJECTED;
    };

    return invoice.invoice_status;
}

pub fn fund_invoice(
    env: &Env,
    invoice_usdc_amount: i128,
    borrower_address: Address,
) {
    // This function is called inside the validate_invoice function, so we are sure that only the admin can call it and that the invoice is in the correct status

    // Get the pool from which the invoice will be funded
    let mut pool = match pool::get_pool(env, 1) { //TODO: change to the pool specified by the borrower when creating the invoice
        Ok(pool) => pool,
        Err(_) => panic_with_error!(env, Error::PoolNotFound),
    };

    // Check if the pool has enough USDC balance to fund the invoice
    if pool.usdc_balance < invoice_usdc_amount {
        panic_with_error!(env, Error::InsufficientPoolBalance);
    }

    // Update pool balance
    pool.usdc_balance -= invoice_usdc_amount;
    pool::set_pool(env, 1, pool); //TODO: change to the pool specified by the borrower when creating the invoice

    // Update borrower balance
    let mut borrower = match get_borrower(env, borrower_address.clone()) {
        Ok(borrower) => borrower,
        Err(_) => panic_with_error!(env, Error::BorrowerNotFound),
    };
    borrower.balance += invoice_usdc_amount;
    update_borrower(env, borrower_address, borrower);  

}