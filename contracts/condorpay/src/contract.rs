use soroban_sdk::{Address, Env, String, contract, contractimpl};

use crate::storage::{
    invoice::{Invoice, get_invoice},
    // invoice_status::InvoiceStatus,
    borrower::{Borrower, get_borrower},
    investor::{Investor, get_investor},
    pool::{get_pool},
    storage::DataKey,
};

use crate::error::Error;

use crate::methods::{
    pool::{create_pool, modify_interest_rate},
    admin::{change_admin},
    borrower::{register_as_borrower, pay_debt},
    investor::{register_as_investor, invest_in_pool, claim_reward},
    invoice::{create_invoice, validate_invoice},
};



pub trait ContractTrait {

    // ######################## CONSTRUCTOR ########################

    fn __constructor(env: Env, admin: Address, token: Address) -> Result<(), Error> ;

    // ######################## ADMIN METHODS ########################

    // fn create_pool(env: &Env, address: Address, usdc_amount: i128) -> Result<(), Error>; // USDC
    fn create_pool(env: &Env, address: Address, xlm_amount: i128) -> Result<(), Error>; // XLM

    fn modify_interest_rate(env: Env, address: Address, pool_id: u32, new_rate: u32) -> Result<(), Error> ;

    fn change_admin(env: Env, address: Address, new_admin: Address) -> Result<(), Error> ;

    fn validate_invoice(env: &Env, address: Address, invoice_id: u32, validate: bool ) -> Result<(), Error> ;

    // ######################## BORROWER METHODS ########################

    fn register_as_borrower(
        env: Env,
        user: Address,
        personal_data: Option<String>,
    ) -> Result<(), Error>;

    fn create_invoice(
        env: &Env,
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

    // fn invest_in_pool(env: &Env, user: Address, pool_id: u32, usdc_amount: i128) -> Result<(), Error>; // USDC
    fn invest_in_pool(env: &Env, user: Address, pool_id: u32, xlm_amount: i128) -> Result<(), Error>; // XLM

    fn claim_reward(env: &Env, address: Address, pool_id: u32) -> Result<(), Error>;

    // ######################## GET METHODS ########################

    fn get_borrower(env: &Env, user: Address) -> Result<Borrower, Error>;

    fn get_investor(env: &Env, user: Address) -> Result<Investor, Error>;

    fn get_pool_balance(env: &Env, pool_id: u32) -> i128;

    fn get_invoice(env: &Env, invoice_id: u32) -> Result<Invoice, Error>;

}

#[contract]
pub struct Contract;

#[contractimpl]
impl ContractTrait for Contract {
    // ######################## CONSTRUCTOR ########################

    fn __constructor(env: Env, admin: Address, token: Address) -> Result<(), Error> {
        // Set the admin address
        env.storage().persistent().set(&DataKey::Admin, &admin);
        // Set the USDC token address
        env.storage().persistent().set(&DataKey::Token, &token);
        // Initialize the invoice counter
        env.storage().persistent().set(&DataKey::InvoiceCounter, &0u32);
        // Initialize the total USDC balance
        env.storage().persistent().set(&DataKey::USDCBalance, &0i128);

        Ok(())
    }

    // ######################## ADMIN METHODS ########################

    fn create_pool(env: &Env, address: Address, yearly_interest_rate: i128) -> Result<(), Error> {
        // Require authentication from the admin
        address.require_auth();
        // Check if the caller is the admin
        let admin = match env.storage().persistent().get::<_, Address>(&DataKey::Admin) {
            Some(admin) => admin,
            None => return Err(Error::AdminNotSet),
        };
        if address != admin {
            return Err(Error::Unauthorized);
        }

        create_pool(env, yearly_interest_rate);
        Ok(())
    }

    fn modify_interest_rate(env: Env, address: Address, pool_id: u32, new_rate: u32) -> Result<(), Error> {
        // Require authentication from the admin
        address.require_auth();
        // Check if the caller is the admin
        let admin = match env.storage().persistent().get::<_, Address>(&DataKey::Admin) {
            Some(admin) => admin,
            None => return Err(Error::AdminNotSet),
        };
        if address != admin {
            return Err(Error::Unauthorized);
        }

        modify_interest_rate(env, pool_id, new_rate)
    }

    fn change_admin(env: Env, address: Address, new_admin: Address) -> Result<(), Error> {
        // Require authentication from the current admin
        address.require_auth();
        // Check if the caller is the admin
        let admin = match env.storage().persistent().get::<_, Address>(&DataKey::Admin) {
            Some(admin) => admin,
            None => return Err(Error::AdminNotSet),
        };
        if address != admin {
            return Err(Error::Unauthorized);
        }

        change_admin(env, address, new_admin)
    }

    fn validate_invoice(env: &Env, address: Address, invoice_id: u32, validate: bool) -> Result<(), Error> {
        // Require authentication from the admin
        address.require_auth();
        // Check if the caller is the admin
        let admin = match env.storage().persistent().get::<_, Address>(&DataKey::Admin) {
            Some(admin) => admin,
            None => return Err(Error::AdminNotSet),
        };
        if address != admin {
            return Err(Error::Unauthorized);
        }

        validate_invoice(env, invoice_id, validate);
        Ok(())
    }

    // ######################## BORROWER METHODS ########################

    fn register_as_borrower(
        env: Env,
        user: Address,
        personal_data: Option<String>,
    ) -> Result<(), Error> {
        register_as_borrower(env, user, personal_data)
    }

    fn create_invoice(
        env: &Env,
        creator: Address,
        amount: i128,
        invoice_info: String,
        pool_id: u32,
    ) -> Result<Invoice, Error> {
        create_invoice(env, creator, amount, 30, invoice_info, pool_id) //TODO: change duration to the one specified by the borrower when creating the invoice
    }

    // fn pay_debt(env: &Env, invoice_id: u32) -> Result<i128, Error> {
    //     pay_debt(env, invoice_id)
    // }

    // ######################## INVESTOR METHODS ########################

    fn register_as_investor(
        env: Env,
        user: Address,
    ) -> Result<(), Error> {
        register_as_investor(env, user)
    }

    // fn invest_in_pool(env: &Env, user: Address, pool_id: u32, usdc_amount: i128) -> Result<(), Error> { // USDC
    //     invest_in_pool(env, user, pool_id, usdc_amount)
    // }
    fn invest_in_pool(env: &Env, user: Address, pool_id: u32, xlm_amount: i128) -> Result<(), Error> { // XLM
        invest_in_pool(env, user, pool_id, xlm_amount)
    }
    
    fn pay_debt(env: &Env, invoice_id: u32) -> Result<i128, Error> {
        pay_debt(env, invoice_id)
    }

    fn claim_reward(env: &Env, user: Address, pool_id: u32) -> Result<(), Error> {
        // Require authentication from the investor
        user.require_auth();
        
        claim_reward(env, user, pool_id);
        Ok(())
    }

    // ######################## GET METHODS ########################

    fn get_borrower(env: &Env, user: Address) -> Result<Borrower, Error> {
        get_borrower(env, user)
    }

    fn get_investor(env: &Env, user: Address) -> Result<Investor, Error> {
        get_investor(env, user)
    }

    fn get_pool_balance(env: &Env, pool_id: u32) -> i128 {
        match get_pool(env, pool_id) {
            // Ok(pool) => pool.usdc_balance, // USDC
            Ok(pool) => pool.usdc_balance, // XLM
            Err(_) => 0,
        }
    }

    fn get_invoice(env: &Env, invoice_id: u32) -> Result<Invoice, Error> {
        get_invoice(env, invoice_id)
    }
}
