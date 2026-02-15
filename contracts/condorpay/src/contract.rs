use soroban_sdk::{Address, Bytes, BytesN, Env, String, Vec, contract, contractimpl};

use crate::storage::{
    invoice::{Invoice, get_invoice, set_invoice},
    invoice_status::InvoiceStatus,
    borrower::{Borrower, get_borrower, set_borrower},
    investor::{Investor, get_investor, set_investor},
    pool::{Pool, get_pool, set_pool},
    storage::DataKey,
    error::Error,
};

use crate::methods::{
    admin::*,
    borrower::{register_as_borrower, create_invoice, pay_debt},
    investor::{register_as_investor, invest_in_pool, claim_reward},
    invoice::{create_invoice},
};



pub trait ContractTrait {

    // ######################## CONSTRUCTOR ########################

    fn __constructor(env: Env, admin: Address, token: Address) -> Result<(), Error> {
        // Set the admin address
        env.storage().instance().set(&DataKey::Admin, &admin);
        // Set the USDC token address
        env.storage().instance().set(&DataKey::Token, &token);
        // Initialize the invoice counter
        env.storage().instance().set(&DataKey::InvoiceCounter, &0u32);
        // Initialize the total USDC balance
        env.storage().instance().set(&DataKey::USDCBalance, &0i128);

        Ok(())
    }

    // ######################## ADMIN METHODS ########################

    fn create_pool(env: &Env, address: Address, usdc_amount: i128) -> Result<(), Error> {
        // Require authentication from the admin
        address.require_auth();
        create_pool(env, user, usdc_amount)
    }

    fn modify_interest_rate(env: Env, address: Address, pool_id: u32, new_rate: u32) -> Result<(), Error> {
        // Require authentication from the admin
        address.require_auth();
        modify_interest_rate(env, address, pool_id, new_rate)
    }

    fn change_admin(env: Env, address: Address, new_admin: Address) -> Result<(), Error> {
        // Require authentication from the current admin
        address.require_auth();
        change_admin(env, address, new_admin)
    }

    fn validate_invoice(env: &Env, address: Address, invoice_id: u32, ) -> Result<(), Error> {
        // Require authentication from the admin
        address.require_auth();
        validate_invoice(env, invoice_id)
    }

    // ######################## BORROWER METHODS ########################

    fn register_as_borrower(
        env: Env,
        user: Address,
        personal_data: Option<String>,
    ) -> Result<(), Error>;

    fn create_invoice(
        env: &Env,
        invoice_id: u32,
        creator: Address,
        amount: i128,
        invoice_info: String,
        pool_id: u32,
    ) -> Result<Invoice, Error>;

    fn pay_debt(env: &Env, invoice_id: u32) -> Result<i128, Error>;

    // ######################## INVESTOR METHODS ########################

    fn register_as_investor(
        env: Env,
        user: Address,
    ) -> Result<(), Error>;

    fn invest_in_pool(env: &Env, pool_id: u32, usdc_amount: i128) -> Result<(), Error>;

    fn claim_reward(env: Env, pool_id: u32) -> Result<(), Error>;

    // ######################## GET METHODS ########################

    fn get_borrower(env: Env, user: Address) -> Result<Borrower, Error>;

    fn get_investor(env: Env, user: Address) -> Result<Investor, Error>;

    fn get_pool_balance(env: &Env, pool_id: u32) -> i128;

    fn get_invoice(env: Env, invoice_id: u32) -> Result<Invoice, Error>;

}

#[contract]
pub struct Contract;

#[contractimpl]
impl ContractTrait for Contract {
    // ######################## CONSTRUCTOR ########################

    fn __constructor(env: Env, admin: Address, token: Address) -> Result<(), Error>;

    // ######################## ADMIN METHODS ########################

    fn create_pool(env: &Env, user: Address, usdc_amount: i128) -> Result<(), Error>;

    fn modify_interest_rate(env: Env, admin: Address, pool_id: u32, new_rate: u32) -> Result<(), Error>;

    fn change_admin(env: Env, current_admin: Address, new_admin: Address) -> Result<(), Error>;

    fn validate_invoice(env: &Env, invoice_id: u32, ) -> Result<(), Error>;

    // ######################## BORROWER METHODS ########################

    fn register_as_borrower(
        env: Env,
        user: Address,
        personal_data: Option<String>,
    ) -> Result<(), Error>;

    fn create_invoice(
        env: &Env,
        invoice_id: u32,
        creator: Address,
        amount: i128,
        invoice_info: String,
        pool_id: u32,
    ) -> Result<Invoice, Error>;

    fn pay_debt(env: &Env, invoice_id: u32) -> Result<i128, Error>;

    // ######################## INVESTOR METHODS ########################

    fn register_as_investor(
        env: Env,
        user: Address,
    ) -> Result<(), Error>;

    fn invest_in_pool(env: &Env, pool_id: u32, usdc_amount: i128) -> Result<(), Error>;

    fn claim_reward(env: Env, pool_id: u32) -> Result<(), Error>;

    // ######################## GET METHODS ########################

    fn get_borrower(env: Env, user: Address) -> Result<Borrower, Error>;

    fn get_investor(env: Env, user: Address) -> Result<Investor, Error>;

    fn get_pool_balance(env: &Env, pool_id: u32) -> i128;

    fn get_invoice(env: Env, invoice_id: u32) -> Result<Invoice, Error>;
}
