use soroban_sdk::{Env, Address};
use crate::storage::pool::{Pool, set_pool, get_pool};
use crate::storage::{storage::DataKey};
use crate::error::Error;


pub fn get_lp_balance( env: &Env, pool_id: u32, user: Address) -> i128 {
    env.storage()
        .persistent()
        .get(&DataKey::LpBalance(pool_id, user))
        .unwrap_or(0)
}

pub fn create_pool(env: &Env, yearly_interest_rate: i128) {
    // Create a new pool with the specified USDC amount and a default interest rate (e.g., 30% annual)  
    let pool_id = DataKey::PoolCounter;

    let current_pool_id = env
        .storage()
        .instance()
        .get::<_, u32>(&pool_id)
        .unwrap_or(0);
    let new_pool_id = current_pool_id + 1;
    env.storage()
        .instance().set(&pool_id, &new_pool_id);    

    let new_pool = Pool {
        pool_id: new_pool_id, //TODO: change to an auto-incremented ID if we want to have multiple pools
        interest_rate: yearly_interest_rate, // 30% annual interest rate in basis points
        usdc_balance: 0,
        lp_total_balance: 0,
    };

    set_pool(env, new_pool_id, new_pool);
}

pub fn modify_interest_rate(env: Env, pool_id: u32, new_rate: u32) -> Result<(), Error> {
    // This function is called inside the change_interest_rate function, so we are sure that only the admin can call it
 
    // Get the pool to be modified
    let mut pool = match get_pool(&env, pool_id) {
        Ok(pool) => pool,
        Err(_) => return Err(Error::PoolNotFound),
    };

    // Update the interest rate
    pool.interest_rate = new_rate as i128;

    // Save the updated pool back to storage
    set_pool(&env, pool_id, pool);

    Ok(())
}