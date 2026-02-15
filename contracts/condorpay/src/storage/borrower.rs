use super::{Invoice_status::InvoiceStatus, vote::Vote};
use crate::storage::{error::Error, storage::DataKey, vote::VoteData};
use soroban_sdk::{Address, BytesN, Env, String, Vec, contracttype};

#[derive(Clone)]
#[contracttype]
pub struct Borrower {
    pub address: Address,
    pub invoices: Vec<u32>,            // List of invoice IDs created by the borrower
    pub debt_amount: i128,             // In USDC
}

pub(crate) fn get_borrower(env: &Env, user: Address) -> Result<Borrower, Error> {
    let key = DataKey::Borrowers(user);

    env.storage()
        .instance()
        .get(&key)
        .ok_or(Error::BorrowerNotFound)
}

pub(crate) fn set_borrower(env: &Env, user: Address, borrower: Borrower) {
    let key = DataKey::Borrowers(user);

    env.storage().instance().set(&key, &borrower)
}

