use soroban_sdk::{Address, Env, String, Vec};

use crate::storage::borrower::{Borrower};
use crate::storage::{storage::DataKey};
use crate::error::Error;
use crate::storage::borrower::{get_borrower, set_borrower};


pub fn update_borrower(env: &Env, user: Address, borrower: Borrower) {
    let key = DataKey::Borrowers(user);

    env.storage().persistent().set(&key, &borrower)
}

pub fn register_as_borrower(
    env: Env,
    user: Address,
    personal_data: Option<String>,
) -> Result<(), Error> {
    // Require authentication from the user
    user.require_auth();

    // Check if the user is already registered as a borrower
    if get_borrower(&env, user.clone()).is_ok() {
        return Err(Error::BorrowerAlreadyRegistered);
    }

    let borrower = Borrower {
        address: user.clone(),
        invoices: Vec::new(&env),
        debt_amount: 0,
        balance: 0,
        personal_data,
    };

    set_borrower(&env, user, borrower);
    Ok(())
}

// Pay the debt for a specific invoice. For simplicity, this function just reduces the total debt amount.
use crate::storage::invoice::{get_invoice, set_invoice};
use crate::storage::invoice_status::InvoiceStatus;

pub fn pay_debt(env: &Env, invoice_id: u32) -> Result<i128, Error> {
    // Get the invoice
    let mut invoice = get_invoice(env, invoice_id)?;
    // Only allow paying if invoice is not already paid
    if invoice.invoice_status == InvoiceStatus::REFUNDED {
        return Err(Error::InvalidInvoiceStatus);
    }
    let amount = invoice.amount;
    // Get the borrower
    let mut borrower = get_borrower(env, invoice.creator.clone())?;
    // Subtract the invoice amount from borrower's debt
    if borrower.debt_amount < amount {
        return Err(Error::NoBalanceToTransfer);
    }
    borrower.debt_amount -= amount;
    set_borrower(env, invoice.creator.clone(), borrower);
    // Mark invoice as paid
    invoice.invoice_status = InvoiceStatus::REFUNDED;
    set_invoice(env, invoice_id, invoice);
    Ok(amount)
}