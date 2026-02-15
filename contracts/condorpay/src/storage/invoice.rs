use super::{Invoice_status::InvoiceStatus, vote::Vote};
use crate::storage::{error::Error, storage::DataKey, vote::VoteData};
use soroban_sdk::{Address, BytesN, Env, String, Vec, contracttype};

#[derive(Clone)]
#[contracttype]
pub struct Invoice {
    pub invoice_id: u32,
    pub creator: Address,
    pub initial_timestamp: u64,
    pub approved_timestamp: u64,
    pub amount: i128,                   // In USDC
    pub invoice_status: InvoiceStatus,  
    pub invoice_info: String,           // Additional information submitted as a link
}

pub(crate) fn get_invoice(env: &Env, invoice_id: u32) -> Result<Invoice, Error> {
    let key = DataKey::Invoices(invoice_id);

    env.storage()
        .instance()
        .get(&key)
        .ok_or(Error::InvoiceNotFound)
}

pub(crate) fn set_invoice(env: &Env, invoice_id: u32, invoice: Invoice) {
    let key = DataKey::Invoices(invoice_id);

    env.storage().instance().set(&key, &Invoice)
}
