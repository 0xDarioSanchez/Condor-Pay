#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env};

#[contract]
pub struct MockTokenContract;

#[contractimpl]
impl MockTokenContract {
    pub fn __constructor(env: Env, admin: Address, initial_supply: i128) {
        env.storage().persistent().set(&admin.clone(), &initial_supply);
        env.storage().persistent().set(&"admin", &admin);
    }

    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) {
        from.require_auth();
        let from_bal = env
            .storage()
            .persistent()
            .get::<_, i128>(&from)
            .unwrap_or(0_i128);
        if from_bal < amount {
            panic!("insufficient balance")
        }
        env.storage().persistent().set(&from, &(from_bal - amount));
        let to_bal = env
            .storage()
            .persistent()
            .get::<_, i128>(&to)
            .unwrap_or(0_i128);
        env.storage().persistent().set(&to, &(to_bal + amount));
    }

    pub fn balance(env: Env, who: Address) -> i128 {
        env.storage().persistent().get::<_, i128>(&who).unwrap_or(0_i128)
    }

    pub fn mint(env: Env, caller: Address, to: Address, amount: i128) {
        caller.require_auth();
        let admin = env.storage().persistent().get::<_, Address>(&"admin").unwrap();
        if caller != admin {
            panic!("unauthorized")
        }
        let bal = env.storage().persistent().get::<_, i128>(&to).unwrap_or(0_i128);
        env.storage().persistent().set(&to, &(bal + amount));
    }

    pub fn approve(env: Env, owner: Address, spender: Address, amount: i128) {
        owner.require_auth();
        env.storage()
            .persistent()
            .set(&(&owner, &spender), &amount);
    }

    pub fn allowance(env: Env, owner: Address, spender: Address) -> i128 {
        env.storage()
            .persistent()
            .get::<_, i128>(&(&owner, &spender))
            .unwrap_or(0_i128)
    }

    pub fn transfer_from(env: Env, spender: Address, from: Address, to: Address, amount: i128) {
        spender.require_auth();
        let mut allowed = env
            .storage()
            .persistent()
            .get::<_, i128>(&(&from, &spender))
            .unwrap_or(0_i128);
        if allowed < amount {
            panic!("allowance exceeded")
        }
        let from_bal = env
            .storage()
            .persistent()
            .get::<_, i128>(&from)
            .unwrap_or(0_i128);
        if from_bal < amount {
            panic!("insufficient balance")
        }
        env.storage().persistent().set(&from, &(from_bal - amount));
        let to_bal = env
            .storage()
            .persistent()
            .get::<_, i128>(&to)
            .unwrap_or(0_i128);
        env.storage().persistent().set(&to, &(to_bal + amount));
        allowed -= amount;
        env.storage().persistent().set(&(&from, &spender), &allowed);
    }
}

