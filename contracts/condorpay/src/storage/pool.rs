use super::{Invoice_status::InvoiceStatus, vote::Vote};
use crate::storage::{error::Error, storage::DataKey, vote::VoteData};
use soroban_sdk::{Address, BytesN, Env, String, Vec, contracttype};

#[derive(Clone)]
#[contracttype]
pub struct Pool {
    pub pool_id: u32,
    pub interest_rate: u32,          // Annual interest rate in basis points (e.g., 500 for 5%)
    pub usdc_balance: i128,          // In USDC
    pub lp_balance: i128,            // Amount of LP tokens received
}

pub(crate) fn get_pool(env: &Env, user: Address) -> Result<Pool, Error> {
    let key = DataKey::Pools(user);

    env.storage()
        .instance()
        .get(&key)
        .ok_or(Error::PoolNotFound)
}

pub(crate) fn set_pool(env: &Env, user: Address, pool: Pool) {
    let key = DataKey::Pools(user);

    env.storage().instance().set(&key, &Pool)
}

