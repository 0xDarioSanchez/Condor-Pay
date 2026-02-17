use crate::storage::{storage::DataKey};
use crate::error::Error;
use soroban_sdk::{Address, Env, Vec, contracttype, String};

#[derive(Clone)]
#[contracttype]
pub struct Borrower {
    pub address: Address,
    pub invoices: Vec<u32>,            // List of invoice IDs created by the borrower
    pub debt_amount: i128,             // In XLM (was USDC)
    pub balance: i128,                 // In XLM (was USDC)
    pub personal_data: Option<String>, // Optional personal data for KYC
}

pub(crate) fn get_borrower(env: &Env, user: Address) -> Result<Borrower, Error> {
    let key = DataKey::Borrowers(user);

    env.storage()
        .persistent()
        .get(&key)
        .ok_or(Error::BorrowerNotFound)
}

pub(crate) fn set_borrower(env: &Env, user: Address, borrower: Borrower) {
    let key = DataKey::Borrowers(user);

    env.storage().persistent().set(&key, &borrower)
}

