use crate::storage::{storage::DataKey};
use crate::error::Error;
use soroban_sdk::{Address, Env, contracttype};


#[derive(Clone)]
#[contracttype]
pub struct Investor {
    pub address: Address,
    // pub invested_amount: i128,          // In USDC
    // pub lp_tokens: i128,                *Stored in DataKey
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

    env.storage().persistent().set(&key, &investor)
}

