use super::{Invoice_status::InvoiceStatus, vote::Vote};
use crate::storage::{error::Error, storage::DataKey, vote::VoteData};
use soroban_sdk::{Address, BytesN, Env, String, Vec, contracttype};

#[derive(Clone)]
#[contracttype]
pub struct Investor {
    pub address: Address,
    // pub invested_amount: i128,          // In USDC
    pub lp_tokens: i128,                // Amount of LP tokens received
}

pub(crate) fn get_investor(env: &Env, user: Address) -> Result<Investor, Error> {
    let key = DataKey::Investors(user);

    env.storage()
        .instance()
        .get(&key)
        .ok_or(Error::InvestorNotFound)
}

pub(crate) fn set_investor(env: &Env, user: Address, investor: Investor) {
    let key = DataKey::Investors(user);

    env.storage().instance().set(&key, &investor)
}

