use crate::methods::invoice::{claim_reward, execute, proof};
use crate::methods::{
    admin::anonymous_voting_setup,
    balance::{get_balance, redeem},
    invoice::{create_invoice, create_invoice_demo},
    initialize::initialize,
    vote::{build_commitments_from_votes, commit_vote, register_to_vote, reveal_votes, vote},
};
use crate::storage::invoice::get_invoice;
use crate::storage::invoice_status::InvoiceStatus;
use crate::storage::vote::{
    AnonymousVoteConfig, VoteAnon, get_anonymous_voting_config as get_anon_config,
};
use crate::storage::voter::{get_voter, set_voter};
use crate::storage::{Invoice, Voter, error::Error};
use soroban_sdk::{Address, Bytes, BytesN, Env, String, Vec, contract, contractimpl};

pub trait ProtocolContractTrait {
    fn __constructor(env: Env, admin: Address, token: Address) -> Result<(), Error>;

    fn new_voter(
        env: Env,
        user: Address,
        // personal_data: Option<String>,
    ) -> Result<(), Error>;

    fn get_user(env: Env, user: Address) -> Result<Voter, Error>;

    fn get_invoice(env: Env, invoice_id: u32) -> Result<Invoice, Error>;

    fn anonymous_voting_setup(env: Env, maintainer: Address, project_id: u32, public_key: String);

    fn get_anonymous_voting_config(env: Env, project_id: u32) -> AnonymousVoteConfig;

    fn build_commitments_from_votes(
        env: Env,
        project_id: u32,
        votes: Vec<u128>,
        seeds: Vec<u128>,
    ) -> Vec<BytesN<96>>;

    fn create_invoice(
        env: &Env,
        project_id: u32,
        creator: Address,
        counterpart: Address,
        proof: String,
        voting_ends_at: u64,
        called_contract: Address,
        // amount: i128,
    ) -> Result<Invoice, Error>;

    fn create_invoice_demo(
        env: &Env,
        project_id: u32,
        creator: Address,
        counterpart: Address,
        proof: String,
        voting_ends_at: u64,
        called_contract: Address,
    ) -> Result<Invoice, Error>;

    fn get_balance(env: &Env, employee: Address) -> i128;

    fn redeem(env: &Env, employee: Address) -> Result<i128, Error>;

    fn register_to_vote(env: &Env, creator: Address, invoice_id: u32) -> Result<Invoice, Error>;

    fn commit_vote(
        env: &Env,
        voter: Address,
        invoice_id: u32,
        commit_hash: BytesN<32>,
    ) -> Result<Invoice, Error>;

    fn reveal_votes(
        env: &Env,
        creator: Address,
        invoice_id: u32,
        votes: Vec<bool>,
        secrets: Vec<Bytes>,
    ) -> Result<Invoice, Error>;

    fn vote(env: Env, voter: Address, invoice_id: u32, vote_data: VoteAnon);

    fn execute(
        env: Env,
        maintainer: Address,
        invoice_id: u32,
        tallies: Option<Vec<u128>>,
        seeds: Option<Vec<u128>>,
    ) -> InvoiceStatus;

    fn claim_reward(env: Env, voter: Address, invoice_id: u32) -> Result<(), Error>;

    fn proof(env: Env, invoice_id: u32, tallies: Vec<u128>, seeds: Vec<u128>) -> bool;
}

#[contract]
pub struct ProtocolContract;

#[contractimpl]
impl ProtocolContractTrait for ProtocolContract {
    fn __constructor(env: Env, admin: Address, token: Address) -> Result<(), Error> {
        initialize(&env, admin, token)
    }

    fn anonymous_voting_setup(env: Env, judge: Address, project_id: u32, public_key: String) {
        anonymous_voting_setup(env, judge, project_id, public_key)
    }

    fn get_anonymous_voting_config(env: Env, project_id: u32) -> AnonymousVoteConfig {
        get_anon_config(&env, project_id)
    }

    fn build_commitments_from_votes(
        env: Env,
        invoice_id: u32,
        votes: Vec<u128>,
        seeds: Vec<u128>,
    ) -> Vec<BytesN<96>> {
        build_commitments_from_votes(env, invoice_id, votes, seeds)
    }

    fn new_voter(
        env: Env,
        user: Address,
        // personal_data: Option<String>,
    ) -> Result<(), Error> {
        set_voter(&env, user);
        Ok(())
    }

    fn get_user(env: Env, user: Address) -> Result<Voter, Error> {
        get_voter(&env, user)
    }

    fn get_invoice(env: Env, invoice_id: u32) -> Result<Invoice, Error> {
        get_invoice(&env, invoice_id)
    }

    fn get_balance(env: &Env, employee: Address) -> i128 {
        get_balance(env, &employee)
    }

    fn create_invoice(
        env: &Env,
        project_id: u32,
        creator: Address,
        counterpart: Address,
        proof: String,
        voting_ends_at: u64,
        called_contract: Address,
        // amount: i128,
    ) -> Result<Invoice, Error> {
        create_invoice(
            env,
            project_id,
            creator,
            counterpart,
            proof,
            voting_ends_at,
            called_contract,
            // amount,
        )
    }

    fn create_invoice_demo(
        env: &Env,
        project_id: u32,
        creator: Address,
        counterpart: Address,
        proof: String,
        voting_ends_at: u64,
        called_contract: Address,
    ) -> Result<Invoice, Error> {
        create_invoice_demo(
            env,
            project_id,
            creator,
            counterpart,
            proof,
            voting_ends_at,
            called_contract,
        )
    }

    fn redeem(env: &Env, employee: Address) -> Result<i128, Error> {
        redeem(env, employee)
    }

    fn register_to_vote(env: &Env, creator: Address, invoice_id: u32) -> Result<Invoice, Error> {
        register_to_vote(env, creator, invoice_id)
    }

    fn commit_vote(
        env: &Env,
        voter: Address,
        invoice_id: u32,
        commit_hash: BytesN<32>,
    ) -> Result<Invoice, Error> {
        commit_vote(env, voter, invoice_id, commit_hash)
    }

    fn reveal_votes(
        env: &Env,
        creator: Address,
        invoice_id: u32,
        votes: Vec<bool>,
        secrets: Vec<Bytes>,
    ) -> Result<Invoice, Error> {
        reveal_votes(env, creator, invoice_id, votes, secrets)
    }

    fn vote(env: Env, voter: Address, invoice_id: u32, vote_data: VoteAnon) {
        vote(env, voter, invoice_id, vote_data);
    }

    fn execute(
        env: Env,
        maintainer: Address,
        invoice_id: u32,
        tallies: Option<Vec<u128>>,
        seeds: Option<Vec<u128>>,
    ) -> InvoiceStatus {
        execute(env, maintainer, invoice_id, tallies, seeds)
    }

    fn claim_reward(env: Env, voter: Address, invoice_id: u32) -> Result<(), Error> {
        claim_reward(env, voter, invoice_id)
    }

    fn proof(env: Env, invoice_id: u32, tallies: Vec<u128>, seeds: Vec<u128>) -> bool {
        let invoice = get_invoice(&env, invoice_id).unwrap();
        proof(env, invoice, tallies, seeds)
    }
}
