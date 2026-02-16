use soroban_sdk::{Env, Address, panic_with_error};
use crate::storage::investor::{Investor, set_investor, get_investor};
use crate::error::Error;
use crate::methods::math::calculate_lp_tokens;
use crate::storage::storage::DataKey;
use crate::storage::pool::get_pool;

pub fn register_as_investor(env: Env, user: Address) -> Result<(), Error> {
    // Require authentication from the user
    user.require_auth();

    // Check if the user is already registered as an investor
    if get_investor(&env, user.clone()).is_ok() {
        return Err(Error::InvestorAlreadyRegistered);
    }

    let investor = Investor {
        address: user.clone(),    
    };

    set_investor(&env, user, investor);
    Ok(())
}

pub fn invest_in_pool(env: &Env, user: Address, pool_id: u32, amount: i128) -> Result<(), Error> {

    // Check if the investor is registered as an investor
    let _investor = match get_investor(&env, user.clone()) {
        Ok(investor) => investor,
        Err(_) => return Err(Error::InvestorNotFound),
    };

    // Business logic for investing in pool would go here
    // For now, just update LP balance as before
    let lp_tokens_received = calculate_lp_tokens(amount);
    let lp_balance_key = DataKey::LpBalance(pool_id, user.clone());
    let current_lp_balance: i128 = env.storage().persistent().get(&lp_balance_key).unwrap_or(0);
    env.storage().persistent().set(&lp_balance_key, &(current_lp_balance + lp_tokens_received));
    Ok(())
}

pub fn claim_reward(env: &Env, user: Address, pool_id: u32) {
    // Check if the investor is registered as an investor
    let _investor = match get_investor(&env, user.clone()) {
        Ok(investor) => investor,
        Err(_) => panic_with_error!(env, Error::InvestorNotFound),
    };

    // Check if the specified pool exists
    let pool = match get_pool(env, pool_id) {
        Ok(pool) => pool,
        Err(_) => panic_with_error!(env, Error::PoolNotFound),
    };

    // Calculate the total LP tokens for the investor in the specified pool
    let lp_balance_key = DataKey::LpBalance(pool_id, user.clone());
    let lp_balance: i128 = env.storage().persistent().get(&lp_balance_key).unwrap_or(0);

    // Use pool.usdc_balance as a placeholder for rewards (since reward_amount doesn't exist)
    // Use pool.lp_total_balance for total LP tokens
    if pool.lp_total_balance == 0 {
        panic_with_error!(env, Error::InsufficientPoolBalance);
    }
    let reward = (lp_balance as i128 * pool.usdc_balance as i128) / pool.lp_total_balance as i128;

    // Add reward to user's LP balance (or handle as needed)
    env.storage().persistent().set(&lp_balance_key, &(lp_balance + reward));

    // TODO: Emit an event for the claimed reward
}
