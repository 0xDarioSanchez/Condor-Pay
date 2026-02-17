use crate::storage::{storage::DataKey,
        invoice_status::InvoiceStatus,};
use crate::error::Error;
use soroban_sdk::{Address, Env, String, contracttype};


#[derive(Clone)]
#[contracttype]
pub struct Invoice {
    pub invoice_id: u32,
    pub creator: Address,
    pub initial_timestamp: u64,
    pub approved_timestamp: u64,
    pub amount: i128,                   // In XLM (was USDC)
    pub duration: u32,                  // Duration of the invoice in days
    pub invoice_status: InvoiceStatus,  
    pub invoice_info: String,           // Additional information submitted as a link
}

pub(crate) fn get_invoice(env: &Env, invoice_id: u32) -> Result<Invoice, Error> {
    let key = DataKey::Invoices(invoice_id);

    env.storage()
        .persistent()
        .get(&key)
        .ok_or(Error::InvoiceNotFound)
}

pub(crate) fn set_invoice(env: &Env, invoice_id: u32, invoice: Invoice) {
    let key = DataKey::Invoices(invoice_id);

    env.storage().persistent().set(&key, &invoice)
}
