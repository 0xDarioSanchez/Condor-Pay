use crate::storage::{storage::DataKey};
use crate::error::Error;
use soroban_sdk::{Env, contracttype};


#[derive(Clone)]
#[contracttype]
pub struct Pool {
    pub pool_id: u32,
    pub interest_rate: i128,        // Annual interest rate in basis points (e.g., 3000 for 30%)
    pub usdc_balance: i128,         // In XLM (was USDC)
    pub lp_total_balance: i128,     // Amount of current LP tokens (minted and not burned) for this pool
}

pub(crate) fn get_pool(env: &Env, pool_id: u32) -> Result<Pool, Error> {
    let key = DataKey::Pools(pool_id);

    env.storage()
        .instance()
        .get(&key)
        .ok_or(Error::PoolNotFound)
}

pub(crate) fn set_pool(env: &Env, pool_id: u32, pool: Pool) {
    let key = DataKey::Pools(pool_id);

    env.storage().persistent().set(&key, &pool)
}

